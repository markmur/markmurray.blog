import React from 'react'
import { BlogPostTemplate } from '../../templates/blog-post'
import { Content } from '../../styles'

import '../../themes/prism.css'

const BlogPostPreview = ({ entry, widgetFor }) => (
  <BlogPostTemplate
    title={entry.getIn(['data', 'title'])}
    description={entry.getIn(['data', 'description'])}
    content={widgetFor('body')}
    tags={entry.getIn(['data', 'tags'])}
    showComments={false}
    postContent={({ content }) => <Content>{content}</Content>}
  />
)

export default BlogPostPreview
