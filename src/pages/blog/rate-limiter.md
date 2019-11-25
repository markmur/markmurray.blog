---
private: true
templateKey: blog-post
pinned: true
title: Building a rate limiter with Express
description:
  The various ways to build a rate limiter and the pros and cons of each
date: 2019-06-08T00:00:00.000Z
tags:
  - NodeJS
  - Express
  - System Design
---

### What's a rate limiter?

### Why would you use a rate limiter?

### Identifying users

In order to count the number of requests from a client, we will need some way of
identifying unique users.

A simple but naïve approach is to identify users based on their IP address.
However, this will cause problems for multiple users who share the same IP
address. One bad actor can starve the others by sending too many requests.

If a user is logged in, we could use their unique user ID to limit requests. If
a user is NOT logged in,

### Algorithms: Fixed window

A fixed window algorithm resets the count of each connection after x amount of
time. For example, if your rate limit is set to 10 requests per second, every
client's limit would be reset every second at a single point in time.

```js
const defaults = {
  // Number of milliseconds before resetting
  interval: 1000,

  // The total number of requests allowed within our interval
  max: 10,

  // A function to identify the user based on the request
  getUniqueKey: (request, response) => request.ip,

  // The message to respond with when the limit has been reached
  errorMessage: 'Too many requests. Please try again later',

  // Whether to send the response as JSON or not, true by default
  json: true,
}
```

```js
const app = express()

/**
 * Get the epoch for when the connections map will be reset
 * This will be returned in the "X-RateLimit-Reset" response header
 */
const getResetTime = (interval = 0) => {
  const date = new Date()

  return date.setMilliseconds(date.getMilliseconds() + interval)
}

/**
 * Our rate limit middleware
 */
const rateLimiter = options => {
  const { interval, max, getUniqueKey, errorMessage, json } = Object.assign(
    {},
    defaults,
    options,
  )

  let connections = {}
  let resetTime = getResetTime(interval)

  // Increment the key if it exists, otherwise
  const increment = key => {
    const currentValue = connections[key] || 0
    const nextValue = currentValue + 1

    connections[key] = nextValue

    debug(`Increment connection (${key})`, nextValue)

    return nextValue
  }

  // Reset the connections
  const resetConnections = () => {
    debug('Resetting connections')
    connections = {}
    resetTime = getResetTime(interval)
  }

  // Reject the request, setting a 429 status code and returning our error message
  const rejectRequest = res => {
    res.status(429)
    res.setHeader('X-RateLimit-Reset', Math.ceil(resetTime.getTime() / 1000))

    if (json) {
      return res.json({ message: errorMessage })
    }

    return res.send(errorMessage)
  }

  // Reset the connections map every second
  setInterval(resetConnections, interval)

  return (req, res, next) => {
    const key = getUniqueKey(req, res)

    const currentCount = connections[key] || 0

    if (currentCount >= max) {
      res.setHeader('X-RateLimit-Limit', max)
      res.setHeader('X-RateLimit-Remaining', 0)
      return rejectRequest(res)
    }

    const count = increment(key)

    res.setHeader('X-RateLimit-Limit', max)
    res.setHeader('X-RateLimit-Remaining', max - count)

    next()
  }
}
```

Using our rate limiter on selected routes:

```js
app.use('/protected', rateLimiter(), (req, res) =>
  res.send('Request succeeded'),
)
```

So now if we run our server and hit a couple of times we can see that the
connections map is counting the requests for each IP address:

```sh
curl http://localhost:8000/protected // 200
curl http://localhost:8000/protected // 200
...
curl http://localhost:8000/protected // 429
```

### Problems

This solution works but there are several problems with it - the most important
being that it will not scale passed a single server.

Let's say our server is receiving a high number of requests per second. We may
want to scale our service horizontally by adding more servers and putting a load
balancer in place to distribute the requests. If we create a new instance of the
rate limiter and hold the connections in memory for each server, we will run
into a problem where one client can be limited by one server but not another.
This means that client could technically double or triple their limit,
depdending on the number of servers.

So how could we solve this?

We _could_ set up our load balancer in a way that clients are always routed to
the same server, meaning we could keep multiple cache stores.

The proper solution here would be to extract the storage from our servers and
share a single cache amongst them all. Ideally, we would want to use a key:value
database such as Redis or Memcache to store the counts.
