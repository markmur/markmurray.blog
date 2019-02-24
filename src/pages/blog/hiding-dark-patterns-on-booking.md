---
templateKey: blog-post
title: Killing UX dark patterns with chrome extensions
date: 2019-02-23
description: Writing a Chrome extension to remove dark patterns from booking.com
tags:
  - Chrome extensions
---

[View source code](https://github.com/markmur/booking.calm)

Anxiety-inducing dark patterns used by companies to increase conversion rates
are wrong. Relax your browsing experience by eliminating them with some simple
JavaScript - which can be packaged into a chrome extension.

First thing we'll want to do is identify the problematic elements using "Inspect
element" in the browser.

```js
const classNames = [
  'sr--x-times-last-time',
  'in-high-demand-not-scarce',
  'only_x_left',
  'js_sr_persuation_msg',
  'urgency_message_red',
  'urgency_message_x_people',
  '-scarcity_indicator-pss_scarcity_1_left',
  'hp-rt-just-booked',
  'js--hp-rt-just-booked',
  'sr--justBooked',
  'hotel_overlay_urgency',
  'fe_banner__red',
  'hp-rt-recently-booked',
  'js--hp-rt-recently-booked',
]
```

Next, we'll write a few lines of code to find all elements on the page which
contain these classnames and remove them.

```js
const classNamesSelector = classNames.map(x => `.${x}`).join(', ')

// Get DOM nodes from class names
const getDOMNodes = () => [...document.querySelectorAll(classNamesSelector)]

// Remove each DOM element
const removeNodes = nodes => nodes.forEach(node => node.remove())
```

This works, but as we navigate around the site, we might notice that new
elements are rendered. In order to eliminate all of these elements, regardless
of when they're rendered, we'll use the native `MutationObserver` API to observe
the `<body>` element for changes and re-run the script when observes changes.

```js
// Create an observer instance linked to the callback function
const observer = new MutationObserver(() => removeNodes(getDOMNodes()))

const retry = () => setTimeout(init, 5)

const init = () => {
  // If the page is not ready yet, set a timeout and check again in 5 ms
  if (!document.body) {
    return retry()
  }

  // Start observing the target node for mutations
  observer.observe(document.body, {
    attributes: false,
    childList: true,
    subtree: false,
  })
}

init()
```
