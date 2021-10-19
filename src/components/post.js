import React from 'react';
import { Link } from 'gatsby';
import { kebabCase } from 'lodash';
import {
  Flex,
  Box,
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
  Button,
  HideOnDesktop,
} from '../styles';

const Tags = ({ tags, ...props }) =>
  tags &&
  tags.length > 0 && (
    <Flex wrap {...props}>
      {tags.map(tag => (
        <Tag key={tag} to={`/tags/${kebabCase(tag)}/`}>
          {tag}
        </Tag>
      ))}
    </Flex>
  );

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

      <HideOnDesktop>
        <Box mt={3}>
          <Link to={post.fields.slug}>
            <Button>View article</Button>
          </Link>
        </Box>
      </HideOnDesktop>
    </Container>
  </StyledPost>
);

export const PostPreview = ({ post, ...props }) => (
  <StyledPostPreview
    width={['70vw', '400px']}
    role="article"
    height="100%"
    py={[4, '45px']}
    px={[4, '45px']}
    border="1px solid #eaeaea"
    {...props}
  >
    <Flex height="100%" flexDirection="column" justifyContent="space-between">
      <div>
        <Title mb={0} fontSize="1.25rem">
          <Link to={post.fields.slug}>
            <span
              dangerouslySetInnerHTML={{ __html: post.frontmatter.title }}
            />
          </Link>
        </Title>

        <Timestamp>
          {post.frontmatter.date}
          <Bullet />
          {post.fields.readingTime.text}
        </Timestamp>

        <LineBreak mb={2} />
        <Paragraph mb={3}>{post.frontmatter.description}</Paragraph>
      </div>

      <Box mt="auto">
        <Link to={post.fields.slug}>
          <Button>View article</Button>
        </Link>
      </Box>
    </Flex>
  </StyledPostPreview>
);

export default Post;
