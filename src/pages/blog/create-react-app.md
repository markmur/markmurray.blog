---
templateKey: blog-post
title: The easiest way to create a new React application
date: 2019-02-24
description: Ditching create-react-app in favour of Parcel
tags:
  - React
  - Parcel
label:
  - Beginner friendly
---

- Use yarn for packages

```sh
npm install --global yarn
```

- Create folder

```sh
touch my-project
```

- Yarn init - new node project

```sh
yarn init
```

- Install react

```sh
yarn add react react-dom
```

- Install parcel as dev depedency

```sh
yarn add --dev parcel-bundler
```

- Create html file

```sh
# Create root html file
touch index.html

# Create root js file
touch index.js
```

Add the following:

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

The app should then be available at http://localhost:1234
