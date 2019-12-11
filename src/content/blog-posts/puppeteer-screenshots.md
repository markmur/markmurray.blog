---
templateKey: blog-post
title:
  Using <strong>puppeteer</strong> to take screenshots for multiple viewports
description: Take screenshots of your site on any number of devices
date: 2019-04-28T00:00:00.000Z
pinned: true
tags:
  - Puppeteer
  - Node
---

```js
/**
 * Execute an array of async functions in series
 */
const sequential = async fns => {
  const AsyncFunction = (async () => {}).constructor

  if (!fns.every(fn => fn instanceof AsyncFunction)) {
    throw new TypeError('`fns` argument should be an array of Async functions')
  }

  const responses = []
  for (const fn of fns) {
    const response = await fn()
    responses.push(response)
  }

  return responses
}
```

```js
const path = require('path')
const chalk = require('chalk')
const fs = require('fs-extra')
const puppeteer = require('puppeteer')

// Heights are intentionally omitted to capture the full page
const DEFAULT_VIEWPORTS = [[1440], [768], [425], [375]]

const formatFilename = ({ outputDir, url, width, height }) => {
  const { hostname } = new URL(url)
  const pathname = getPathname(url) || 'home'

  return path.join(
    outputDir,
    path.join(
      `${hostname}-${pathname}-${width}`,
      height ? `x${height}` : '',
      '.png',
    ),
  )
}

/**
 * Format a url pathname to remove slashes
 */
const getPathname = url => {
  const { pathname } = new URL(url)
  return pathname.slice(pathname.indexOf('/') + 1).replace(/\//g, '-')
}

/**
 * Take a screenshot for a given url and dimensions
 */
const takeScreenshot = (chrome, filename, dimensions) => async () => {
  const { width, height = 0 } = dimensions
  await chrome.setViewport({ width, height })

  const file = filename.slice(filename.lastIndexOf('/'))

  console.log('Taking screenshot...', file)

  await chrome.screenshot({
    path: filename,
    fullPage: typeof height !== 'number' || height === 0,
  })

  const uri = await fs.readFile(filename, 'base64')

  return {
    uri,
    filename,
    createdAt: new Date().toISOString(),
  }
}

/**
 * Take multiple screenshots for a given url
 */
const takeScreenshotsForUrl = (
  chrome,
  { url, formatFilename, viewports, outputDir },
) => async () => {
  await chrome.goto(url, { waitUntil: 'networkidle0' })

  const screenshotRequests = viewports.map(([width, height]) => {
    const filename = formatFilename({ outputDir, url, width, height })
    return takeScreenshot(chrome, filename, { width, height })
  })

  const screenshots = await sequential(screenshotRequests)

  return screenshots
}

/**
 *  Main program
 */
const screenshots = async (options = {}) => {
  const { urls, viewports, loginUrl, username, password } = options

  const outputDir = path.resolve(process.cwd(), 'screenshots')

  if (!Array.isArray(urls) || !urls.every(url => typeof url === 'string')) {
    throw new TypeError('`urls` parameter should be an array of URLs')
  }

  // Make sure the screenshots directory exists
  await fs.ensureDir(outputDir)

  // Empty the contents of the directory
  await fs.emptyDir(outputDir)

  const browser = await puppeteer.launch({ headless: true })

  try {
    const chrome = await browser.newPage()

    // auth here

    const requests = urls.map(url =>
      takeScreenshotsForUrl(chrome, {
        url,
        viewports: DEFAULT_VIEWPORTS,
        outputDir,
        formatFilename,
      }),
    )

    return await sequential(requests)
  } catch (error) {
    console.log(chalk.red.bold(error))
  } finally {
    await browser.close()
  }
}

screenshots({
  urls: ['https://google.com'],
})
  .then(console.log)
  .catch(console.error)
```

## Handling authentication

```js
const handleAuthentication = async (
  chrome,
  { loginUrl, username, password, selectors },
) => {
  await chrome.goto(loginUrl)
  await chrome.waitFor(selectors.username)
  await chrome.waitFor(selectors.password)
  await chrome.type(selectors.username, username)
  await chrome.type(selectors.password, password)
  await chrome.click(selectors.submit)
  await chrome.waitForNavigation()
}
```

```js
const shouldAuthenticate = loginUrl || username || password

if (
  shouldAuthenticate &&
  ![loginUrl, username, password].every(x => x && typeof x !== 'undefined')
) {
  throw new TypeError(
    '`loginUrl`, `username` and `password` are all required to authenticate`',
  )
}

if (shouldAuthenticate) {
  await handleAuthentication(chrome, {
    loginUrl,
    username,
    password,
    selectors,
  })
}
```
