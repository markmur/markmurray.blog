---
templateKey: blog-post
title: The easiest way to create a new React application
description: Ditching create-react-app in favour of Parcel
date: 2019-02-24T00:00:00.000Z
tags:
  - React
  - Parcel
---
`create-react-app` is still a great choice for many applications and getting started is very easy. However, I would argue that using Parcel is even easier to manage.

If you have `node` installed already, you'll also have `npm` installed by default. Get started by installing `yarn` - an alternative to `npm`. This step is not required but since `yarn` is widely used amongst the React community, do yourself a favour and install it.

```sh
npm install --global yarn
```

Once you've installed `yarn`, create a new directory for your project and initialise a new node project.

```sh
# Create a directory for your project
mkdir my-project

# Move into the directory
cd my-project

# Create a new node project
yarn init
```

The next thing you'll want to do is to install `react` and `react-dom`. `react-dom` is used to render your React application.

```sh
yarn add react react-dom
```

Once you have those dependencies installed, it's time to install `Parcel`. `Parcel` is an alternative to `Webpack`, which is used to build your application - and by "build", it means:

1. Package your application code into 1 or many `.js` files.
2. Extract any css your application might be using.
3. "Tree-shake" unused code

```sh
yarn add --dev parcel-bundler
```

> Note: the `--dev` flag in our command above means the dependency will be installed as a development dependency, indicating that this dependency is only need to run/build the project in development mode.

Once you have parcel installed, it's time to create your app. You will need two files to get started - an `index.html` file and an `index.js`

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
    "react": "^16.0.0",
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

The app should then be available at [http://localhost:1234](http://localhost:1234).

To deploy a production-ready version of your app, run `yarn build` - one of the scripts we listed in the `package.json` file above. Once complete, you should see a directory at the root of your project called `static`. This will contain all of the relevant files to run your front end app in a browser. To view the production build, open the `index.html` file:

```sh
open static/index.html
```
