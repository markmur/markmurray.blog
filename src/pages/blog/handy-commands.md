---
templateKey: blog-post
title: Handy commands
description: Handy commands
date: 2019-04-20T17:59:27.640Z
pinned: false
---
## Docker

#### List all containers
```sh
docker ps --all

# Shorthand
docker ps -a
```


#### Remove all containers

`--quiet, -q` returns only the container ids

```sh
docker rm $(docker ps --all --quiet)

# Shorthand
docker rm $(docker ps -a -q)
```

#### Remove all images

```sh
docker rmi $(docker images -q)
```
