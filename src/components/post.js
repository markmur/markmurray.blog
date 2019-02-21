import React from 'react'
import { Link } from 'gatsby'
import {
  Post as StyledPost,
  Title,
  Timestamp,
  Paragraph,
  Container,
  LineBreak,
} from '../styles'

const Post = ({ post }) => (
  <StyledPost>
    <Container>
      <Title>
        <Link to={post.fields.slug}>{post.frontmatter.title}</Link>
      </Title>
      <Timestamp>{post.frontmatter.date}</Timestamp>
      <LineBreak />
      <Paragraph>{post.frontmatter.description}</Paragraph>
    </Container>
  </StyledPost>
)

export default Post
