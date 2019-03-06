---
templateKey: blog-post
title: >-
  Tracking Views and Impressions with the <strong>IntersectionObserver
  API</strong> in a React app
description: >-
  Leveraging the native IntersectionObserver API to track views and impressions
  in a react application.
date: 2019-02-26T00:00:00.000Z
tags:
  - React
  - IntersectionObserver
  - Tracking
---

## The Target Implementation

The target solution for our view/impression tracker should be an easy-to-use
React component that we can simply wrap around any other component to track.

```jsx
const App = () => (
  <Tracker
    onView={() => {
      /* Send tracking Event */
    }}
  >
    <MyComponent />
  </Tracker>
)
```

## What's the difference between a _View_ and an _Impression_?

In the context of this article, we'll refer to a `View` as an event that's ever
only triggered once per page. If a user scrolls a particular element, we'll fire
a tracking event for that element and _stop_ observing it.

We'll refer to an `Impression` as an event that is tracked _every time_ an
element becomes visible. So if a user scrolls down past an element and then
scrolls back up, the event is tracked twice and again each subsequent time the
element comes into view.

## What is the IntersectionObserver API?

According to the
[documentation on MDN](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API):

> The Intersection Observer API provides a way to asynchronously observe changes
> in the intersection of a target element with an ancestor element or with a
> top-level document's viewport.

In other words, it's a native API that enables you to observe elements on a page
and determine when their visible - and by how much.

It's usage is relatively straight forward. We create (1) a configuration object
for the observer instance, (2) a callback function that's called each time
there's a change on the page and (3) the instance of the observer itself with
the `callback` and `config` arguments.

```js
const options = {
  // The root is the scroll container. By setting this value to `null`,
  // we're saying that the scroll container is the viewport but we could use
  // a `document.querySelector` here if we wanted to target a specific smaller
  // container on the page
  root: null,
  rootMargin: '0px',
  threshold: 1.0,
}

const callback = (elements, instance) => {
  elements.forEach(element => {
    //   element.boundingClientRect
    //   element.intersectionRatio
    //   element.intersectionRect
    //   element.isIntersecting
    //   element.rootBounds
    //   element.target
    //   element.time
  })
}

const observer = new IntersectionObserver(callback, options)
```

## What we want to build

The following post documents how to build the following:

1. A vanilla JS **ViewObserver** class which tracks both `Views` and
   `Impressions`
2. A [React component wrapper](#creating-a-react-component-wrapper) to track
   child components

---

## Building the ViewObserver

As of February 2019,
[browser support is still quite limited](https://caniuse.com/#search=IntersectionObserver)
for the **IntersectionObserver API**, so we'll need to install and import the
[intersection-polyfill](https://www.npmjs.com/package/intersection-observer).

### Rules for tracking

To provide more meaningful tracking analysis, we'll want to put some rules in
place to ensure we're not firing events at the wrong times. For an element to be
considered "seen", we'll say it must be 100% in the viewport (or almost 100% if
the element width/height is simliar to the viewport) for at least 250ms. This
will cut down on falsly reported views by quickly scrolling the page.

For an impression to be counted _every time_ it comes into view, we'll add some
additional event listeners to capture `orientationchange` - which will fire when
a device changes it's orientation - and `focus` - which will fire when a user
switches between tabs or applications.

### Considerations

1. Using multiple instances of the `IntersectionObserver` could be problematic
   in terms of performance - as you could have multiple instances each watching
   multple elements and checking their visibility state on every pixel scrolled
   (depending on the `threshold` of the `IntersectionObserver` config - which
   we'll cover later). For this reason, we're going to create a singleton
   whereby if an instance exists already, we'll use that to watch our new
   elements and if no instance exists yet we'll create one.

1. If an element height is similar to the container height (i.e `100vh`), it can
   be very difficult to catch an impression in `250ms`. The user would have to
   scroll the page to the exact pixel where the top position of the element is
   `0px` and the bottom position is equal to the container height and wait a
   minimum of 250ms. By default, the `intersectionRatio` of an element should be
   `1` to be considered "visible" and so for tall/wide elements we'll reduce the
   max `intersectionRatio` by this value.

> **From the
> [API documentation on MDN](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API):**
> A threshold of 1.0 means that when 100% of the target is visible within the
> element specified by the root option, the callback is invoked.

```js
// ViewObserver uses IntersectionObserver API which requires polyfill
// see https://caniuse.com/#search=IntersectionObserver
if (typeof window !== 'undefined') require('intersection-observer')

/**
 * Build an array of threshold values ranging from 0 to 1
 * @param {Number} steps - number of steps between 0 and 1.0
 * @returns {Number[]} returns array of floats
 */
const buildThreshold = (steps = THRESHOLD_STEPS) => {
  const threshold = Array.from({ length: steps }, (x, i) => i / steps)

  // Returns an array like [0, ...n, 1]
  return [...threshold, 1]
}

export const DEFAULT_OPTIONS = {
  // If an element height is similar to the container height,
  // it's very difficult to catch an impression in 250ms.
  // By default the intersectionRatio of an element should be
  // 1 to be considered seen and so for tall elements we reduce the
  // max intersectionRatio by this value
  errorMargin: 0.05, // 5%

  // The container height range at which to compensate with
  // an error margin
  percentCompensation: 0.2, // 20%

  // Element must be visible for >= 250ms
  minTimeVisible: 250,

  // The ViewObserver config
  config: {
    root: null,
    rootMargin: '0px',
    threshold: buildThreshold(100),
  },
}

let instance = null

export default class ViewObserver {
  /**
   * Return the single instance of the IntersectionObserver if one exists already,
   * otherwise create an instance
   * @param {Object} options - ViewObserver instantiation options
   * @return {ViewObserver} return instance of the class
   */
  static get(options = {}) {
    // If an instance of the observer already exists, return the singleton
    // otherwise instantiate a new one
    if (instance && instance instanceof ViewObserver) return instance

    instance = new ViewObserver(options)
    return instance
  }

  constructor(options = {}) {
    this.options = Object.assign({}, DEFAULT_OPTIONS, options)

    if (isNaN(this.options.minTimeVisible) || this.options.minTimeVisible < 0) {
      this.options.minTimeVisible = DEFAULT_OPTIONS.minTimeVisible
    }

    this.elements = new Map()
    this.timeouts = new Map()

    this.observer = new IntersectionObserver(
      this.watchElements,
      this.options.config,
    )

    // Handle browser tab changes
    window.addEventListener('focus', this.reportVisibilityStates)

    // Handle device orientation changes
    window.addEventListener('orientationchange', this.reportVisibilityStates)
  }

  /**
   * Remove window event listeners to avoid memory leaks
   */
  removeEventListeners() {
    window.removeEventListener('focus', this.reportVisibilityStates)
    window.removeEventListener('orientationchange', this.reportVisibilityStates)
  }

  /**
   * Detroy all Maps and event listeners.
   * @returns {void} returns instance
   */
  destroy() {
    // Clear all elements
    this.elements.clear()

    // Clear all lingering timeouts
    this.timeouts.clear()

    // Disconnect the observer, if available
    if (this.observer && typeof this.observer.disconnect === 'function') {
      this.observer.disconnect()
    }

    // Remove all event listeners
    this.removeEventListeners()

    instance = null

    return instance
  }

  /**
   * Fire onChange event listeners for all visible elements
   */
  reportVisibilityStates = () => {
    this.elements.forEach(({ visible }, element) => {
      if (visible) this.onVisibilityChange(element, visible)
    })
  }

  /**
   * Loop through all of the observed elements and check if visible
   * @param  {Array} [entries=this.elements] array of [IntersectionObserverEntry],
   * defaults to this.elements Map
   */
  watchElements = (entries = this.elements) => {
    // If rootBounds does not exist, it will default to the height and width
    // of the viewport
    const containerHeight =
      window.innerHeight || document.documentElement.clientHeight

    entries
      .filter(entry => entry.isIntersecting)
      .forEach(entry => {
        const node = entry.target || entry.entry
        const element = this.elements.get(node)

        // We wrap the child in a container, so we need to ensure we're looking at
        // the bounds of the child and not the wrapper
        const bounds = entry.boundingClientRect || node.getBoundingClientRect()

        const elementHeight = bounds.height

        // If the element height is within x% (this.options.percentCompensation)
        // of the container height, use the errorMargin option (this.options.errorMargin).
        // Otherwise default to 0.025. The max intersectionRatio for a regular element
        // should be 0.975 as being _too_ strict can result in missed events.
        const errorMargin = this.isElementHeightSimilarToContainer(
          elementHeight,
          containerHeight,
        )
          ? this.options.errorMargin
          : 0.025

        const maxIntersectionRatio =
          containerHeight / elementHeight > 1
            ? 1 - errorMargin
            : containerHeight / elementHeight - errorMargin

        const isVisible = entry.intersectionRatio >= maxIntersectionRatio

        // Element is still visible since last check
        if (isVisible && element.timeoutSet) {
          return
        }

        // If the element is visible
        if (isVisible) {
          // Set the visibility state to true but wait until the timeout finishes
          // to fire the event
          element.timeoutSet = true

          // Start timer
          this.timeouts.set(
            node,
            setTimeout(() => {
              // Fire the event
              this.onVisibilityChange(node, true)
            }, this.options.minTimeVisible),
          )
        } else {
          const timeout = this.timeouts.get(node)
          // Fire event
          this.onVisibilityChange(node, false)
          // Element is no longer visible, delete timeout
          clearTimeout(timeout)
          this.timeouts.delete(node)
          element.timeoutSet = false
        }
      })
  }

  isElementHeightSimilarToContainer(elementHeight, containerHeight) {
    return (
      elementHeight >=
        containerHeight - containerHeight * this.options.percentCompensation &&
      elementHeight <=
        containerHeight + containerHeight * this.options.percentCompensation
    )
  }

  /**
   * Observe an IntersectionObserver entry
   * @param  {IntersectionObserverEntry} element the element to watch
   * @param  {Function} callback the element callback event
   */
  observe = (element, callback) => {
    if (!element || !callback) return

    this.elements.set(element, {
      callback,
      visible: false,
      entry: element,
    })

    this.observer.observe(element)
  }

  /**
   * Unobserve an IntersectionObserver entry
   * @param  {HTMLElement} element the element to unobserve
   */
  unobserve = element => {
    if (!element) return
    if (!this.elements.get(element)) return

    if (this.observer) this.observer.unobserve(element)

    this.elements.delete(element)

    // If we're not watching any elements, destroy the ViewObserver.
    // If more trackers are mounted, a new instance of the ViewObserver
    // will be created
    if (this.elements.size === 0) {
      this.destroy()
    }
  }

  /**
   * Handle DOM element visibility state change
   * @param  {HTMLElement} element - the DOM node
   * @param  {Boolean} visible - the visibility state of the entry
   */
  onVisibilityChange(element, visible) {
    if (!element) return

    const entry = this.elements.get(element)

    if (!entry) return

    // Set the new visibility state
    entry.visible = visible

    const { callback } = entry

    if (typeof callback === 'function') callback(visible)
  }
}
```

## Creating a React component wrapper

Now that we have our `ViewObserver` in place, we'll create a React component to
track any element we choose to wrap.

We can choose to track either **Views** or **Impressions** by using a `once`
prop - which will indicate whether an element should be tracked strictly once,
or every time it comes into view.

```js
import React, { Component } from 'react'
import { findDOMNode } from 'react-dom'
import PropTypes from 'prop-types'
import ViewObserver from './view-observer'

class ViewTracker extends Component {
  static defaultProps = {
    once: true,
    children: null,
    options: {},
    onView() {},
    onHide() {},
    onChange() {},
  }

  /**
   * Create the event listener on mount
   */
  componentDidMount() {
    this.observer = ViewObserver.get(this.props.options)

    this.container = findDOMNode(this)

    if (typeof this.container !== 'undefined') {
      // Observe the container and track all child nodes
      this.observer.observe(this.container, this.trackEvent)
    }
  }

  unobserve() {
    if (typeof this.container !== 'undefined' && this.observer) {
      // Remove the observation listener
      this.observer.unobserve(this.container)
    }

    this.observer = null
  }

  /**
   * Remove the observe listener on unmount
   */
  componentWillUnmount() {
    this.unobserve()
  }

  /**
   * Send the tracking event callback
   * @param  {Boolean} visible - the visibility state of the element
   */
  trackEvent = visible => {
    this.props.onChange(visible)

    if (visible) {
      this.props.onView(visible)

      // Unobserve the element after firing
      if (this.props.once) this.unobserve()
    } else {
      this.props.onHide(visible)
    }
  }

  render() {
    // Use React.Children.only to indicate that their
    // should only be a single child component
    return React.Children.only(this.props.children)
  }
}

ViewTracker.propTypes = {
  children: PropTypes.node,
  once: PropTypes.bool,
  options: PropTypes.shape({
    minTimeVisible: PropTypes.number,
    errorMargin: PropTypes.number,
  }),
  onChange: PropTypes.func,
  onHide: PropTypes.func,
  onView: PropTypes.func,
}

export default ViewTracker
```

## Usage

Now that we have our `ViewObserver` and React `ViewTracker`, we can track
elements in our app by simply wrapping them with the `ViewTracker` component and
adding `onView` / `onHide` callback functions to _do something_ when the element
(dis)appears - in this case we'll fire a tracking event.

```js
import React from 'react'
import ReactDOM from 'react-dom'
import ViewTracker from './view-tracker'

const sendTrackingEvent = () => {
  // Send tracking event
}

const App = () => (
  <div>
    <ViewTracker key="some-unique-key" onView={sendTrackingEvent}>
      <SomeComponent />
    </ViewTracker>
  </div>
)

ReactDOM.render(<App />, document.querySelector('#root'))
```
