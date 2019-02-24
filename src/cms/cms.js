import React from 'react'
import CMS from 'netlify-cms'
import { StyleSheetManager } from 'styled-components'
import BlogPostPreview from './preview-templates/BlogPostPreview'

CMS.registerPreviewTemplate('blog', props => {
  const iframe = document.getElementsByTagName('iframe')[0]
  const iframeHead = iframe.contentDocument.head

  const link = document.createElement('link')
  link.setAttribute(
    'href',
    'https://fonts.googleapis.com/css?family=Merriweather:400,700,900|Source+Code+Pro:400,500|PT+Serif:700',
  )
  link.setAttribute('rel', 'stylesheet')

  iframeHead.append(link)

  return (
    <StyleSheetManager target={iframeHead}>
      <BlogPostPreview {...props} />
    </StyleSheetManager>
  )
})
