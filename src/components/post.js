import React from 'react'
import { Link } from 'gatsby'
import { Post as StyledPost, Title, Timestamp, Paragraph } from '../styles'

const Post = ({ post }) => (
  <StyledPost>
    <Title>
      <Link to={post.fields.slug}>{post.frontmatter.title}</Link>
    </Title>
    <Timestamp>{post.frontmatter.date}</Timestamp>
    <Paragraph>{post.frontmatter.description}</Paragraph>
  </StyledPost>
)

export default Post
