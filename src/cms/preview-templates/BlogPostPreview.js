import React from 'react'
import { BlogPostTemplate } from '../../templates/blog-post'

const BlogPostPreview = ({ entry, widgetFor }) => (
  <BlogPostTemplate
    title={entry.getIn(['data', 'title'])}
    description={entry.getIn(['data', 'description'])}
    content={widgetFor('body')}
    tags={entry.getIn(['data', 'tags'])}
  />
)

export default BlogPostPreview
