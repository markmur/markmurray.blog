---
templateKey: blog-post
title: Tree shaking CSS Modules
description:
  Eliminate collisions with CSS Modules and cut down bundle sizes by purging
  unused styles.
date: 2019-12-11T12:00:00.000Z
pinned: false
image: https://images.unsplash.com/photo-1523437113738-bbd3cc89fb19?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1351&q=80
tags:
  - Webpack
  - CSS Modules
  - Tree Shaking
---

Looking for a TL;DR? [Go to the solution](#solution)

Tree-shaking code as a front-end engineer is no trivial feat and, as a result,
web applications typically send way too much unused code to their clients. The
aim of this blog post is to show you how to eliminate collisions in your
stylesheets by using [CSS Modules](https://github.com/css-modules/css-modules)
and to purge unused styles from your stylesheets.

If you have a web app that bundles CSS files, your webpack might look something
like this:

```js
// webpack.config.js (production)
const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
  mode: 'production',

  entry: path.resolve('src/index.js'),

  output: {
    filename: '[name].js',
    path: path.resolve('dist'),
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      // highlight-start
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          // Extract the css to file
          MiniCssExtractPlugin.loader,
          // Handle import of `.css` files in your app
          'css-loader',
        ],
      },
      // highlight-end
    ],
  },
  plugins: [
    // Extract all css into a separate file
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
  ],
}
```

or if you use Sass/Less, your (s)css rule might look something like:

```js
{
  test: /\.s?css$/,
  exclude: /node_modules/,
  use: [
    // Extract the css to file
    MiniCssExtractPlugin.loader,
    // Run CSS loader on imported css files
    'css-loader',
    // highlight-start
    // Compile SASS before importing with css-loader
    'sass-loader'
    // highlight-end
  ],
},
```

This is great because it lets us write our stylesheets however we like and
import them in our JavaScript bundles.

```scss
// styles.scss
.margin {
  margin: 6px;
}

.padding {
  padding: 6px;
}
```

```jsx
// index.js
import React from 'react'

import styles from './styles.scss'

const App = ({ children }) => {
  return <div className={styles.margin}>{children}</div>
}
```

Following compilation, our bundle would look something like:

```js
// main.js
React.createElement('div', { className: 'margin' })
```

Which is what we wanted, except if we look at our CSS file, you will notice that
it will contain both `margin` and `padding` classes, despite the fact that we
only imported one.

```css
// main.css
.margin {
  margin: 6px;
}
.padding {
  padding: 6px;
}
```

In this scenario, you might say it's not a big deal because we're only importing
a single extraneous class. But in a real life scenario, your CSS files would
most likely be a lot bigger.

Let's say we're using SASS to generate margin class helpers for our app. The
helper file might look something like this:

```scss
@function capitalize($string) {
  @return to-upper-case(str-slice($string, 1, 1)) + str-slice($string, 2);
}

$sizes: (
  'none': none,
  'auto': auto,
  's': 12px,
  'm': 16px,
  'l': 24px,
);

$directions: left, right, top, bottom;

.margin {
  margin: 12px;
}

@each $key, $value in $sizes {
  .margin_#{$key} {
    margin: $value;
  }

  @each $direction in $directions {
    .margin#{capitalize($direction)}_#{$key} {
      margin-#{$direction}: $value;
    }
  }
}
```

which would generate all 25 possible classes for the specified `$sizes` and
`$directions` like `margin_s`, `marginRight_m`, `marginTop_l` etc.

If we were to now import a single class in our app, we would end up with all 25
classes included in the bundled output - meaning 96% of the file is unused in
our application and needlessly downloaded by the client - contributing to
increased load times.

## Collisions

On top of this, by _not_ using
[CSS Modules](https://github.com/css-modules/css-modules) here, all of our
classes will be loaded exactly as-is in the file.

```css
.margin_s {
}
.margin_m {
}
.margin_l {
}
```

If any external dependencies that are loaded in our app have the same class name
then our content could potentially be overidden and cause problems for our
layout.

## CSS Modules

In order to get around this, we can leverage
[CSS Modules](https://github.com/css-modules/css-modules) through the
`css-loader` in webpack by simply appending `?modules` to the `css-loader`.

```js
use: [
  // Extract the css to file
  MiniCssExtractPlugin.loader,
  // Run CSS loader on imported css files
  // highlight-next-line
  'css-loader?modules',
  // Compile SASS before importing with css-loader
  'sass-loader',
]
```

The CSS Modules feature is great because we can continue to import our styles
the exact same way but now the classes will be base64 hashed, significantly
reducing the chance of collisions. Instead of `.margin_s` in our CSS bundle, the
class would look something like `_2YXvmvhK1kiz8fYtvvwPOA` and our CSS bundle
would look like:

```css
._2YXvmvhK1kiz8fYtvvwPOA {
  margin: 12px;
}

._1NvNf_l7rh91Ii7UjIRjLb {
  margin: 14px;
}

...
```

...plus 23 other class names.

If we look at our JavaScript bundle now, we'll also find that a hashmap has been
added to the bundle which maps each class name to its respective hash:

```js
e.exports={
  margin_s:"_2YXvmvhK1kiz8fYtvvwPOA",
  margin_m:"_1NvNf_l7rh91Ii7UjIRjLb",
  // ...plus 23 more pairs
```

So while we've solved the problem of collisions for our styles, we still have an
excessive number of classes in our stylesheet _and_ we have an unnecessary map
of unused classes in our _JavaScript_ bundle.

We can cut down the overall size of the stylesheet slightly by reducing the
length of the hash for each class by controlling the size of the classname hash
in our webpack config:

```js
use: [
  // Extract the css to file
  MiniCssExtractPlugin.loader,
  // Run CSS loader on imported css files
  // highlight-start
  {
    loader: 'css-loader',
    options: {
      modules: {
        localIdentName: '[hash:base64:5]',
      },
    },
  },
  // highlight-end
  // Compile SASS before importing with css-loader
  'sass-loader',
]
```

But this doesn't actually solve the problem. We're just reducing the size of the
file slightly.

> Note: If you would like to use a combination of your class names with the
> auto-generated hash in production, you could modify the `localIdentName` to
> include the `[local]` class name: `"[local]_[hash:base64:5]"`

## Solution

You will first need to have the following modules installed (preferrably the
latest of each):

```sh
yarn add --dev \
    css-loader \
    cssnano \
    mini-css-extract-plugin \
    postcss-loader \
    style-loader \
    @fullhuman/postcss-purgecss \
    webpack \
    webpack-cli \
    postcss-scss \
    node-sass \
    sass-loader
```

You will then want to update your rules to run the `postcss-loader` with the
`postcss-purgecss` plugin to sift through JavaScript files and purge any of the
classNames that aren't found.

```js
{
  test: /\.s?css$/,
  exclude: /node_modules/,
  use: [
    // Extract the css to file
    MiniCssExtractPlugin.loader,
    {
      loader: require.resolve('css-loader'),
      options: {
        // Enable CSS modules
        modules: {
          // Specify format of class names
          localIdentName: '[local]_[hash:base64:5]'
        },
      }
    },
    // highlight-start
    {
      loader: require.resolve('postcss-loader'),
      options: {
        indent: 'postcss',
        syntax: 'postcss-scss',
        plugins: () => [
            // Purge unused CSS from .js and .jsx files
            require('@fullhuman/postcss-purgecss')({
            // You'll want to modify this glob if you're using TypeScript
            content: glob.sync('src/**/*.{js,jsx}', { nodir: true }),
            extractors: [
              {
                extractor: class {
                  static extract(content) {
                    // See a note on this in the #addenum section below
                    return content.match(/\w+/g) || [];
                  }
                },
                extensions: ['js', 'jsx' ]
              }
            ]
          }),
          require('cssnano')
        ]
      }
    },
    // highlight-end
    'sass-loader'
  ]
}
```

If we bundle our app again, we should now only see a single class in our
`main.css` file:

```css
._2YXvmvhK1kiz8fYtvvwPOA {
  margin: 12px;
}
```

and similarly, we should only see a single key-value pair in our bundle hashmap:

```js
e.exports = {
  margin: '_2YXvmvhK1kiz8fYtvvwPOA',
}
```

Happy days!

---

## Addenum

It should be noted here that while the extractor we're using in the
`postcss-purgecss` plugin above should work in most cases, there are scenarios
where it will not work as expected.

The RegEx `/w+/g` will run over each `.js(x)` file in the app as specified by
our glob, capturing every word each file and attempting to match each word
against the stylesheet classes. This means that if you were to have a JavaScript
file with a text node or variable with the same name as one of your classes then
the styles for that classes would be included in the bundle.

For example, let's say our stylesheet looks liks this:

```scss
// styles.scss
.main {
  margin: auto;
}

.textAlignLeft {
  text-align: left;
}
```

and we have a simple React component that imports one of the classes:

```jsx
import React from 'react'

import styles from './styles.scss'

const App = () => {
  return <div>This is the main component</div>
}
```

Because the extractor matches every word of the file, it will recognise
"**main**" in the text node of the component and subsequently load the `.main`
class of our `styles.scss` file, despite the fact that we never called
`styles.main` anywhere in our file.

Another scenario where you might see issues is if you use
[BEM](http://getbem.com/naming/) style class names with variable prefixes. For
example, let's say we want to scope our component styles to the name of our app
(this is not necessary since we're using CSS modules but let's explain for the
point of argument):

```scss
.app {
  background: blue;

  &__input {
    padding: 1em;
  }
}
```

and use variable prefixes to define the classes:

```jsx
import React from 'react'

import styles from './styles.scss'

const BASE_CLASS = 'app'

const App = () => {
  return (
    <div>
      <input className={styles[`${BASE_CLASS}__input`]} />
    </div>
  )
}
```

The extractor will match the `BASE_CLASS` "app" string, but won't match
`app__input`, and so our CSS file will contain the `.app {}` styles but _NOT_
the `.app__input {}` styles as the `purgecss` plugin will treat the styles as
unused.

The solution here is to ditch the prefixes and rely on the hashing of your class
names to scope your styles, importing them by name.

---

_Want to see the code in action? View the_
[example code here](https://github.com/markmur/webpack-css-tree-shaking-example)
