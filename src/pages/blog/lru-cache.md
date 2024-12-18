---
templateKey: blog-post
title: Implementing an <strong>LRU cache</strong> in JavaScript
description: Leverage the power of JavaScript Map's for efficiency
date: 2020-02-05T00:00:00.000Z
tags:
  - JavaScript
  - Interview Question
---

An LRU or "Least Recently Used" cache is a data structure that is used for
storing a fixed size list of items ordered by the frequency at which they are
accessed.

This comes up quite often as an interview question, and though it's possible to
implement the solution using an `Array`, the interviewer will most likely ask
you to implement both `get` and `put` operations in such a way that the time
complexity is **constant time** - `O(1)`.

To solve this, we can use a `Map` as it offers us similar functionality to an
`Array`, but with some performance benefits.

## Difference between Map and Object

JavaScript Map's are similar to Objects, with a few exceptions:

- The keys of a `Map` are ordered by the order of insertion.
- Listing the keys of a map is an constant time operation, where
  `Object.keys(obj)` is an `O(n)` operation where **n** is the number of keys in
  the object.
- Getting the size of a `Map` is an `O(1)` operation (`map.size`), where
  `Object.keys(obj).length` is an `O(n)` operation.

---

## Implementing the cache

We'll begin by creating a new `LRUCache` class, with 2 static properties:

1. The capacity of the cache
2. The cache itself

```js
class LRUCache {
  constructor(capacity) {
    // Store the capacity size
    this.capacity = capacity;

    // Store the cache as a Map
    this.cache = new Map();
  }
}
```

Next we'll implement a `get` method on the class for retrieving a value in our
cache by a particular key. If the key is not present in our cache, we should
return -1.

```js
get(key) {
  // Key does not exist, return -1
  if (!this.cache.has(key)) {
    return -1
  }

  // Temporarily store the value
  const value = this.cache.get(key)

  // Delete the key
  this.cache.delete(key)

  // Reinsert the key,value
  this.cache.set(key, value)

  // Return the value
  return value
}
```

You might be wondering why we're deleting the key, every time we access it and
the reason for this is that, as mentioned previously, a `Map` stores elements by
the order at which they were inserted. So in this case, we can move our
key,value pair to the top of the cache by deleting it and reinserting it -
putting in the position of the most frequently accessed item.

```js
put(key, value) {
  // If the key already exists, delete it so that it will be added
  // to the top of the cache
  if (this.cache.has(key)) {
    this.cache.delete(key)
  }

  // Insert the key,value pair into cache
  this.cache.set(key, value)

  // If we've exceeded the cache capacity,
  // then delete the least recently accessed value,
  // which will be the item at the bottom of the cache
  // i.e the first position
  if (this.cache.size > this.capacity) {
    const firstKey = this.cache.keys().next().value

    this.cache.delete(firstKey)
  }
}
```

Note here that `map.keys()` is not the same as `Object.keys(obj)`. Where
`Object.keys(obj)` returns an array of keys, `map.keys()` is a generator
function which returns a `MapIterator`. For this reason, we need to access the
first value by calling `.next().value` to access the first value in the
`MapIterator` of keys.

## Using our class

```js
const cache = new LRUCache(3);

// Insert 3 items to our cache
cache.put(1, 10); // Map { 1 => 10 }
cache.put(2, 20); // Map { 1 => 10, 2 => 20 }
cache.put(3, 30); // Map { 1 => 10, 2 => 20, 3 => 30 }

// Fetch by key
cache.get(2); // Returns 20, Map { 1 => 10, 3 => 30, 2 => 20 }

// Insert another item
cache.put(4, 40); // Map { 3 => 30, 2 => 20, 4 => 40 }
// Notice how our "1" key has been evicted
```
