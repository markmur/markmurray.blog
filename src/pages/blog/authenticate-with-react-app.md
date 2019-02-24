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
```
