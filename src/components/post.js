import React from 'react'
import { Link } from 'gatsby'
import { kebabCase } from 'lodash'
import {
  Flex,
  Bullet,
  Post as StyledPost,
  Title,
  Timestamp,
  Paragraph,
  Pinned,
  Container,
  LineBreak,
  Tag,
  PostPreview as StyledPostPreview,
} from '../styles'

const Tags = ({ tags }) =>
  tags &&
  tags.length > 0 && (
    <Flex wrap>
      {tags.map(tag => (
        <Tag key={tag} to={`/tags/${kebabCase(tag)}/`}>
          {tag}
        </Tag>
      ))}
    </Flex>
  )

const Post = ({ post }) => (
  <StyledPost>
    <Container wide>
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

export const PostPreview = ({ post }) => (
  <StyledPostPreview>
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
  </StyledPostPreview>
)

export default Post
