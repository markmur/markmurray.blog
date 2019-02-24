import React from 'react'
import { createGlobalStyle } from 'styled-components'
import { BlogPostTemplate } from '../../templates/blog-post'
import { Content, BlogPost } from '../../styles'

import '../../themes/prism.css'

const GlobalStyles = createGlobalStyle(`
code,
pre {
  color: white;
  text-shadow: 0 1px rgba(0, 0, 0, 0.3);
  background: #1c252bdb;
}
`)

const BlogPostPreview = ({ entry, widgetFor }) => (
  <>
    <GlobalStyles />
    <BlogPostTemplate
      title={entry.getIn(['data', 'title'])}
      description={entry.getIn(['data', 'description'])}
      content={widgetFor('body')}
      tags={entry.getIn(['data', 'tags'])}
      showComments={false}
      postContent={({ content, ...rest }) => (
        <Content>
          {console.log({ content, rest })}
          <BlogPost>{content}</BlogPost>
        </Content>
      )}
    />
  </>
)

export default BlogPostPreview
