---
templateKey: blog-post
title: Deploying an Express / React app with Now
description:
  Use Parcel to build your React app, Express to serve it and Now to deploy
date: 2019-02-28T00:00:00.000Z
tags:
  - React
  - Express
  - Parcel
  - Now
---

([View the full source code here](https://github.com/markmur/express-parcel-react-now))

This post aims to show you how to deploy an [Express]() server, which serves a
[React]() frontend (built with parcel), with [Now](https://zeit.co/now).

## Create the project structure

Get started by creating the project directory, initialising a new Node project
and installing required dependencies.

```sh
# Create new directory
mkdir my-project
cd my-project

# Create new node project
yarn init

# Install dependencies
yarn add express react react-dom

# Install devDependencies
yarn add --dev parcel-bundler rimraf

# Install now-cli globally
yarn global add now
```

The intended project structure we're going to create looks like this:

```tree
my-project
├── server
│   ├── dev-server.js
│   └── index.js
├── src
│   ├── index.css
│   ├── index.html
│   └── index.js
├── now.json
├── package.json
├── README.md
└── yarn.lock
```

Use the following to create a standard `.gitignore` file for a node project and
create the directory structure.

```sh
# Add a gitignore to your project
npx gitignore node

# Create server directory
mkdir server
touch server/index.js
touch server/dev-server.js

# Create client directory
mkdir client
touch client/index.js
touch client/index.html
touch client/index.css
```

## Server-side

```js
// server/index.js
const fs = require('fs');
const path = require('path');
const express = require('express');

const app = express();

const entry = fs.readFileSync(
  path.resolve(__dirname, '..', 'dist/index.html'),
  'utf8',
);

app.get('/api/healthcheck', (req, res) => {
  return res.send('Healthy!');
});

app.use('/', (req, res) => res.send(entry));

module.exports = app;
```

```js
// dev-server.js
const path = require('path');
const Bundler = require('parcel-bundler');
const app = require('.');

const entry = path.resolve('src/index.html');
const bundle = new Bundler(entry);

app.use(bundle.middleware());

app.listen(process.env.NODE_ENV, (err) => {
  if (err) throw err;

  console.log(`Listening at http://localhost:${process.env.PORT}`);
});
```

## Client-side

`client/index.html`

```html
<!DOCTYPE html>
  <head>
    <title>Express with Parcel</title>
  </head>
  <body>
    <div id="root"></div>
    <script src="./index.js"></script>
  </body>
</html>
```

`client/index.js`

```js
import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';

const App = () => (
  <div className="app">
    <h1>Express / React / Parcel / Now</h1>
  </div>
);

ReactDOM.render(<App />, document.querySelector('#root'));
```

`client/index.css`

```css
html,
body {
  margin: 0;
  padding: 0;
  background: #1d1d35;
  color: white;
  display: flex;
  flex-direction: column;
  height: 100vh;
  text-align: center;
  justify-content: center;
  -webkit-font-smoothing: antialiased;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}
```

## Add scripts

Add `dev` script to run the app in `development` mode. We'll run it using
`yarn dev`.

```json
{
  "scripts": {
    "dev": "NODE_ENV=development PORT=8080 node server/dev-server.js"
  }
}
```

Next, we'll add a `start` script to run the app in `production` mode.

```json
{
  "scripts": {
    "dev": "NODE_ENV=development PORT=8080 node server/dev-server.js",
    // highlight-start
    "start": "NODE_ENV=production node server/index.js"
    // highlight-end
  }
}
```

And finally we'll add a build script to build a production version of our client
side code and output it to a `dist` folder. The production server will send the
`dist/index.html` file for all incoming requests, with the exception of API
requests.

```json
{
  "scripts": {
    // highlight-start
    "build": "rimraf dist && NODE_ENV=production parcel build src/index.html --public-url=/static",
    "now-build": "yarn build",
    // highlight-end
    "dev": "NODE_ENV=development PORT=8080 node server/dev-server.js",
    "start": "NODE_ENV=production node server/index.js"
  }
}
```

## Deploy your app

We're going to be using Now (2.0) by Vercel to deploy.

Create a `now.json` file at the root of your project and add the following:

```json
{
  "version": 2,
  "name": "my-project",
  "routes": [
    { "src": "/static/(.*)", "dest": "/dist/$1" },
    { "src": "/(.*)", "dest": "/server/index.js" }
  ],
  "builds": [
    { "src": "dist/*", "use": "@now/static" },
    { "src": "server/index.js", "use": "@now/node" }
  ]
}
```
