import React from 'react'
import CMS from 'netlify-cms'
import { StyleSheetManager } from 'styled-components'
import BlogPostPreview from './preview-templates/BlogPostPreview'

CMS.registerPreviewTemplate('blog', props => {
  const iframe = document.getElementsByTagName('iframe')[0]
  const iframeHead = iframe.contentDocument.head

  return (
    <StyleSheetManager target={iframeHead}>
      <BlogPostPreview {...props} />
    </StyleSheetManager>
  )
})
