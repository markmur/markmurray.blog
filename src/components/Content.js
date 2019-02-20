import React from 'react'
import PropTypes from 'prop-types'
import { BlogPost } from '../styles'

export const HTMLContent = ({ content, className }) => (
  <BlogPost
    className={className}
    dangerouslySetInnerHTML={{ __html: content }}
  />
)

const Content = ({ content, className }) => (
  <div className={className}>{content}</div>
)

Content.propTypes = {
  content: PropTypes.node,
  className: PropTypes.string,
}

HTMLContent.propTypes = Content.propTypes

export default Content
