---
templateKey: blog-post
title: Authentication with NextJS
description:
  Implementing Spotify Social Authentication with NextJS Cloud Functions
date: 2021-10-20T00:00:00.000Z
tags:
  - JavaScript
  - NextJS
  - Authentication
---

Let's just dive straight into it. You're building an app and you're using
NextJS. Nice choice!

After setting up social authentication for a recent project
[Spotify Tracklist](https://spotify-tracklist.vercel.app), I figured I should
share my learnings to help those looking to do the same.

> Note: this post describes how to set up authentication for _**Spotify**_
> specifically, but you can swap out the integration for any other provider as
> the flow will be the same.

## Setting up a new Next project

If you already have a project using NextJS, you can skip this part.

```sh
# Ensure you have vercel install globally on your machine
npm i -g vercel

# Create a new NextJS project
next init

# Choose "NextJS" from the options given

cd nextjs

# Install dependencies
yarn

# Start your app
yarn dev
```

## Set up a new application in your chosen authentication provider

In this case, we're using Spotify so go to
https://developer.spotify.com/dashboard/login, sign in and create a new
application.

Once complete, you should have valid `client_id` and `client_secret` credentials
ready for use in your app. Add these to your `.env` file like so:

```
CLIENT_ID="your_spotify_client_id"
CLIENT_SECRET="your_spotify_client_secret"
REDIRECT_URI="http://localhost:3000/api/auth/callback"
SESSION_SECRET="thecatisoutofthebag"
```

Before continuing, please ensure your `.env` file has been added to the
`.gitignore` file so that it's not committed to version history.

> Note: in this case, we've set the `REDIRECT_URI` value to a local URL. We'll
> want to change this to a production route before we deploy. Also note that
> we've set a `SESSION_SECRET` variable. We'll use this as a password to
> encrypt/decrypt user sessions.

## Creating API routes

Our authentication flow will look like so:

1. Application send authorization request to our authenciation provider
   (Spotify)
1. Spotify requests the user to log in and grant access to our application
1. User grants access and Spotify redirects the user to our `REDIRECT_URI` URL
   (specified in `.env`)
1. Our application handles the redirect request under the `/api/auth/callback`
   URL
1. We send an authencation request to Spotify, including a `code` query
   parameter that was sent to us via the `/api/auth/callback` endpoint.
1. We fetch the user profile from Spotify
1. We create a session containing token and profile information and return it to
   the user in the form of a a cookie. At this stage the user is logged in.

### Authorization route

(This post assumes you only want to set up authentication for a single
provider - Spotify. You should change your route names accordingly if you want
to use multiple providers)

First you'll want to create an `/api/auth/login` route. This route will act as
the authorization endpoint for the authentication flow.

Create a new route by creating a `/api/auth/login.ts` file:

```tsx
// pages/api/auth/login.ts
import { NextApiRequest, NextApiResponse } from 'next';

// These are the application scopes you will be request from each user logging in
const scopes = [
  'streaming',
  'user-read-playback-state',
  'user-read-email',
  'user-read-private',
  'playlist-read-private',
  'playlist-modify-private',
  'playlist-modify-public',
];

// Pull the values defined in your .env file
const { CLIENT_ID, REDIRECT_URI } = process.env;

const buildURL = (scopes: string[], callback: string) => {
  return (
    'https://accounts.spotify.com/authorize?response_type=code' +
    `&client_id=${CLIENT_ID}` +
    `&scope=${encodeURIComponent(scopes.join(' '))}` +
    `&redirect_uri=${encodeURIComponent(callback)}`
  );
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  // Redirect all requests to Spotify auth
  return res.redirect(buildURL(scopes, REDIRECT_URI));
};
```

### Setup the Spotify SDK

We'll be using the Spotify web SDK to fetch data from Spotify, the user profile
for example, so next let's set up an instance of the Spotify SDK that we can
reuse:

```tsx
// utils/spotify.ts
import Spotify from 'spotify-web-api-node';

// Create a new instance of the Spotify API
const createSpotifyApi = (token: string) => {
  const spotify = new Spotify({
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    redirectUri: process.env.REDIRECT_URI,
  });

  spotify.setAccessToken(token);

  return spotify;
};

export default createSpotifyApi;
```

### Authentication route

Now that we have our authorization route in place, we need a route in place to
handle redirects from Spotify back to our application - via an
`/api/auth/callback` route.

```tsx
// pages/api/auth/callback.ts

import axios from 'axios';
import querystring from 'querystring';
import { NextApiRequest, NextApiResponse } from 'next';

import createSpotifyApi from '../../../utils/spotify';

// We'll describe this function in the next section
import { setAuthCookie } from '../../../utils/cookies';

const { CLIENT_ID, CLIENT_SECRET, REDIRECT_URI } = process.env;

const sendRefreshRedirect = (res: NextApiResponse, path = '/') => {
  res.status(200);
  // Send a 200 response and refresh the page
  return res.send(
    `<html><head><meta http-equiv="refresh" content=1;url="${path}"></head></html>`,
  );
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { code } = req.query;

  try {
    const { data } = await axios.post(
      'https://accounts.spotify.com/api/token',
      querystring.stringify({
        grant_type: 'authorization_code',
        code,
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        redirect_uri: REDIRECT_URI,
      }),
    );

    const spotify = createSpotifyApi(data.access_token);

    const profile = await spotify.getMe();

    const session = {
      user: profile,
      token: data,
    };

    // Send the session information to our user in the form of a cookie header.
    // We'll describe this function in the next step
    await setAuthCookie(res, session, {
      maxAge: data.expires_in * 1000,
    });

    // Send 200 response to set cookies and refresh the page
    return sendRefreshRedirect(res);
  } catch (error) {
    // You might want to log the error here
    res.status(500).json({
      statusCode: 500,
      message: 'Something went wrong',
    });
  }
};
```

Now when Spotify returns users to our site, we'll authenticate them and fetch
their profile information. We'll store both their user data and token
information in a session.

This session will be persisted in the form of a cookie that will be sent back to
the browser.

```ts
// utils/cookies.ts

export interface UserSession {
  user: {
    id: string;
    display_name: string;
    email: string;
    images: {
      width: number;
      height: number;
      url: string;
    }[];
  };
  token: {
    access_token: string;
    token_type: string;
    expires_in: number;
    refresh_token: string;
    scope: string;
  };
}

export const setAuthCookie = async (
  res: NextApiResponse,
  session: UserSession,
  options: CookieSerializeOptions = {},
) => {
  const defaults: CookieSerializeOptions = {
    maxAge: 3600 * 1000 * 5,
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
    path: '/',
  };
  const opts: CookieSerializeOptions = { ...defaults, ...options };

  try {
    // We're encrypting our session here using the SESSION_SECRET defined in our
    // .env file.
    const signedSession = await Iron.seal(
      session,
      SESSION_SECRET,
      Iron.defaults,
    );

    const stringValue =
      typeof signedSession === 'object'
        ? 'j:' + JSON.stringify(signedSession)
        : String(signedSession);

    if ('maxAge' in opts) {
      opts.expires = new Date(Date.now() + opts.maxAge);
      opts.maxAge /= 1000;
    }

    // Set the cookie in the header of the response
    res.setHeader('Set-Cookie', serialize('auth.session', stringValue, opts));
  } catch (error) {
    console.error('Failed to seal session object', error);
    return;
  }
};
```

## Update our render route to parse the auth cookie

Now that we can log users in and store the auth state in a cookie in the users
browser, we'll need a way to parse the session and check if the user is logged
in every time they use the site. To do so, we'll need to update our
`pages/index.tsx` file:

```tsx
import cookie from 'cookie';
import { GetServerSideProps } from 'next';

import App from '../src/App';
import { UserSession } from '../utils/cookies';

export const getSessionCookie = async (
  cookies: Record<string, string>,
): Promise<UserSession> => {
  const cookie = cookies['auth.session'];

  if (!cookie) {
    throw new Error('Auth session not found');
  }

  // Decrypt the auth cookie
  const decoded = await Iron.unseal(
    cookie,
    process.env.SESSION_SECRET,
    Iron.defaults,
  );

  return decoded;
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  try {
    const cookies = cookie.parse(req.headers.cookie || '');
    const session = await getSessionCookie(cookies);

    return {
      props: {
        user: session.user,
      },
    };
  } catch {
    return {
      props: {},
    };
  }
};

export default function IndexPage(props) {
  return <App user={props.user} />;
}
```

## Add login UI

Great, now it's just a matter of adding a "Login with Spotify" button to our
application to facilitate the login flow.

```tsx
import React from 'react';

const App = ({ user }) => {
  return (
    <div>
      {user ? (
        <div>{user.display_name} is currently logged in</div>
      ) : (
        <a href="/api/auth/login">Login with Spotify</a>
      )}
    </div>
  );
};

export default App;
```

and there we have it. Social authentication with NextJS.

---

Thanks for reading. Let me know in the comments below if it was helpful or not.
