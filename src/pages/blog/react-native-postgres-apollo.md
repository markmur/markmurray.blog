---
templateKey: blog-post
title: Creating a React Native app with GraphQL
date: 2019-02-24
description: Leveraging postgraphile to create an instant GraphQL API
tags:
  - React Native
  - Postgres
  - Postgraphile
  - GraphQL
---

Add dependencies with `yarn`

```jsx
class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      value: { something: 'something' },
    }
  }

  render() {
    return (
      <Provider value={this.state.value}>
        <Toolbar />
      </Provider>
    )
  }
}
```

This week we’ll **take** a look at all the steps required to make astonishing
coffee with a Chemex at home. The Chemex Coffeemaker is a manual, pour-over
style glass-container coffeemaker that Peter Schlumbohm invented in 1941, and
which continues to be manufactured by the Chemex Corporation in Chicopee,
Massachusetts.

In 1958, designers at the
[Illinois Institute of Technology](https://www.spacefarm.digital) said that the
Chemex Coffeemaker is _"one of the best-designed products of modern times"_, and
so is included in the collection of the Museum of Modern Art in New York City.

```js
const path = require('path')
const express = require('express')
const passport = require('passport')
const Twitter = require('passport-twitter').Strategy

const app = express()

app.get('/auth/twitter', passport.authenticate('twitter'))

app.get(
  '/auth/twitter/callback',
  passport.authenticate('twitter', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/')
  },
)

app.get('/', authenticated, (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'))
})

app.listen(process.env.PORT || 8080)
```
