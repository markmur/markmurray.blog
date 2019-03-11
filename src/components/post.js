import React from 'react'
import { Link } from 'gatsby'
import { kebabCase } from 'lodash'
import {
  Bullet,
  Post as StyledPost,
  Title,
  Timestamp,
  Paragraph,
  Pinned,
  Container,
  LineBreak,
  Tag,
} from '../styles'

const Tags = ({ tags }) =>
  tags &&
  tags.length > 0 && (
    <div>
      {tags.map(tag => (
        <Tag key={tag} to={`/tags/${kebabCase(tag)}/`}>
          {tag}
        </Tag>
      ))}
    </div>
  )

const Post = ({ post }) => (
  <StyledPost>
    <Container>
      {post.frontmatter.pinned && <Pinned />}

      <Title>
        <Link to={post.fields.slug}>
          <span dangerouslySetInnerHTML={{ __html: post.frontmatter.title }} />
        </Link>
      </Title>

      <Timestamp>
        {post.frontmatter.date}
        <Bullet />
        {post.fields.readingTime.text}
      </Timestamp>

      <LineBreak />
      <Paragraph mb={4}>{post.frontmatter.description}</Paragraph>
      <Tags tags={post.frontmatter.tags} />
    </Container>
  </StyledPost>
)

export default Post
