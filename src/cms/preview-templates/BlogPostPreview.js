import React from 'react'
import { format } from 'date-fns'
import { ThemeProvider } from 'styled-components'
import { BlogPostTemplate } from '../../templates/blog-post'
import { Content, BlogPost, GlobalStyles } from '../../styles'
import { themes } from '../../hooks/theme'

import '../../themes/prism.css'

const DATE_FORMAT = 'MMMM DD, YYYY'

const BlogPostPreview = ({ entry, widgetFor }) => {
  console.log(entry.toJS())
  return (
    <ThemeProvider theme={themes.minimal}>
      <div>
        <GlobalStyles />
        <BlogPostTemplate
          date={format(entry.getIn(['data', 'date']), DATE_FORMAT)}
          title={entry.getIn(['data', 'title'])}
          description={entry.getIn(['data', 'description'])}
          content={widgetFor('body')}
          tags={entry.getIn(['data', 'tags'])}
          showComments={false}
          postContent={({ content }) => (
            <Content>
              <BlogPost>{content}</BlogPost>
            </Content>
          )}
        />
      </div>
    </ThemeProvider>
  )
}

export default BlogPostPreview
