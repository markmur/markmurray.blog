---
templateKey: blog-post
title: The easiest way to create a new React application
description: Ditching create-react-app in favour of Parcel
date: 2019-02-24T00:00:00.000Z
tags:
  - React
  - Parcel
---

`create-react-app` is still a great choice for many applications and getting
started is very easy. However, I would argue that using Parcel is even easier to
manage.

A beginner guide to creating a React app would be incomplete without mentioning
[Create React App](https://github.com/facebook/create-react-app) - which is
still a great choice for many applications. However, over time as your app gets
more complex, you might find yourself needing to `eject` from
[Create React App](https://github.com/facebook/create-react-app) and might find
yourself having to manage a relatively large build config on your own.

With [Parcel](https://parceljs.org/), there's no configuration needed - which
greatly reduces the learning curve and removes the headaches often associated
with managing [Webpack](https://webpack.js.org) configs.

If you have [Node](https://nodejs.org) installed already, you'll also have
[NPM](http://npmjs.com) installed by default. This guide uses
[Yarn](https://yarnpkg.com) - an alternative to [NPM](http://npmjs.com), which
is widely used amongst the React community. All of the `yarn` commands in this
guide can be replaced with `npm` - it's simply a matter of personal preference.

```sh
# Install Yarn globally
npm install --global yarn
```

Once you've installed [Yarn](https://yarnpkg.com), create a new directory for
your project and initialise a new node project.

```sh
# Create a directory for your project
mkdir my-project

# Move into the directory
cd my-project

# Create a new node project
yarn init
```

The next thing you'll want to do is to install [React](http://reactjs.org/) and
`react-dom`.

```sh
yarn add react react-dom
```

Once you have those dependencies installed, it's time to install
[Parcel](https://parceljs.org/). [Parcel](https://parceljs.org/) is an
alternative to [Webpack](https://webpack.js.org) (which `create-react-app` uses
under the hood but abstracts from users), which is used to build your
application - and by "build", it means:

1. Package your application code into 1 or many `.js` files.
2. Extract any css your application might be using.
3. "Tree-shake" unused code

```sh
yarn add --dev parcel-bundler
```

> Note: the `--dev` flag in our command above means the dependency will be
> installed as a development dependency, indicating that this dependency is only
> need to run/build the project in development mode.

Once you have [Parcel](https://parceljs.org/) installed, it's time to create
your app. You will need two files to get started - an `index.html` file and an
`index.js`

```sh
# Create root html file
touch index.html

# Create root js file
touch index.js
```

Add the following to your `index.html` file:

```html
<html>
  <head>
    <title>My Project</title>
  </head>
  <body>
    <div id="root"></div>
    <script src="./index.js"></script>
  </body>
</html>
```

Add the following to your `index.js` file:

```js
import React from 'react'
import ReactDOM from 'react-dom'

class App extends React.Component {
  render() {
    return <div>Simple React App!</div>
  }
}

ReactDOM.render(<App />, document.querySelector('#root'))
```

Add `start` and `build` scripts to your `package.json` file:

```json
{
  "name": "my-project",
  "version": "1.0.0",
  "main": "index.js",
  "license": "MIT",
  // highlight-start
  "scripts": {
    "start": "parcel index.html",
    "build": "parcel build index.html"
  },
  // highlight-end
  "dependencies": {
    "react": "^16.8.3",
    "react-dom": "^16.8.3"
  },
  "devDependencies": {
    "parcel-bundler": "^1.11.0"
  }
}
```

Start the app in development mode:

```sh
yarn start
```

The app should then be available at
[http://localhost:1234](http://localhost:1234).

To deploy a production-ready version of your app, run `yarn build` - one of the
scripts we listed in the `package.json` file above. Once complete, you should
see a directory at the root of your project called `static`. This will contain
all of the relevant files to run your front end app in a browser. To view the
production build, open the `index.html` file:

```sh
open static/index.html
```
