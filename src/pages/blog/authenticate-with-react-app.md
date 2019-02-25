---
templateKey: blog-post
title: Implementing Social Authentication with a React app
date: 2019-02-20
description:
  Build a simple React application that authenticates with your social provider
  of choice
tags:
  - React
  - Authentication
---

## Client side

```js
import React from 'react'
import ReactDOM from 'react-dom'

const handleUnauthorized = response => {
  if (response.status === 401) {
    window.location.href = 'http://localhost:8080/auth/twitter'
  }

  return response
}

const parseJSON = response => response.json()

const getUserProfile = () => {
  return fetch('/profile')
    .then(handleUnauthorized)
    .then(parseJSON)
}

class App extends React.Component {
  state = {
    loading: true,
    user: {},
    error: '',
  }

  componentDidMount() {
    return getUserProfile()
      .then(user => this.setState({ user, loading: false }))
      .catch(error => {
        this.setState({
          loading: false,
          error: 'You are not logged in',
        })
      })
  }

  render() {
    const { user, loading, error } = this.state

    if (error) return <div>{error}</div>
    if (loading) return <div>Loading...</div>

    return (
      <div>
        <h1>Hello, {user.displayName}</h1>
      </div>
    )
  }
}

const rootElement = document.querySelector('#root')

ReactDOM.render(<App />, rootElement)
```

## Server side

Start by installing the required dependencies.

```sh
yarn add express passport body-parser express-session passport-twitter
```

Then create a simple Express server.

```js
const express = require('express')

const app = express()

app.use(express.static(path.join(__dirname, 'build')))

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'))
})

const { PORT = 8080 } = process.env

app.listen(PORT, error => {
  if (error) throw error

  console.log(`Listening on port ${PORT}`)
})
```

Next add `body-parser` to allow sending and receiving data in JSON form.

```js
const express = require('express')
// highlight-start
const bodyParser = require('body-parser')
// highlight-end

const app = express()

// highlight-start
app.use(bodyParser.json())
// highlight-end
```

Next add session support.

```js
const express = require('express')
const bodyParser = require('body-parser')
// highlight-start
const session = require('express-session')
// highlight-end

const app = express()

app.use(bodyParser.json())

// highlight-start
app.use(
  session({
    secret: 'you-should-probably-change-this',
    resave: false,
    saveUninitialized: true,
  }),
)
// highlight-end
```

And now lets integrate Passport.

```js
const express = require('express')
const bodyParser = require('body-parser')
const session = require('express-session')
// highlight-start
const passport = require('passport')
const TwitterStrategy = require('passport-twitter').Strategy
// highlight-end

// highlight-start
passport.use(
  new Twitter(
    {
      consumerKey: process.env.TWITTER_KEY,
      consumerSecret: process.env.TWITTER_SECRET,
      callbackURL: `http://localhost:${port}/auth/twitter/callback`,
    },
    (token, tokenSecret, profile, cb) => {
      return cb(null, profile)
    },
  ),
)
// highlight-end

// highlight-start
passport.serializeUser((user, done) => done(null, user))
passport.deserializeUser((user, done) => done(null, user))
// highlight-end

const app = express()

app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, 'build')))

// highlight-start
app.use(passport.initialize())
app.use(passport.session())
// highlight-end

// highlight-start
app.get('/auth/twitter', passport.authenticate('twitter'))

app.get(
  '/auth/twitter/callback',
  passport.authenticate('twitter', {
    failureRedirect: '/login-error',
  }),
  (req, res) => {
    const redirectTo = req.session.redirectTo || '/'
    req.session.redirectTo = null
    return res.redirect(redirectTo)
  },
)
// highlight-end

// highlight-start
app.get('/login-error', (req, res) => res.send('Failed to login'))
// highlight-end
```

Next, we'll want to protect our routes using an express middleware function.

```js
const authenticated = (req, res, next) => {
  if (typeof req.user !== 'object') {
    req.session.redirectTo = req.headers.referer
    return res.status(401).json({
      url: `http://localhost:${process.env.PORT}/auth/twitter`,
    })
  }

  return next()
}

// highlight-next-line
app.get('/', authenticated, (req, res) => {
  return res.sendFile(path.join(__dirname, 'build', 'index.html'))
})
```

We'll also create a route to fetch the user profile, so that we can display the
logged in user in our app.

```js
app.get('/profile', authenticated, (req, res) => res.json(req.user))
```

> Note that this route is also protected
