import {
  Box,
  Bullet,
  Button,
  Container,
  Flex,
  HideOnDesktop,
  LineBreak,
  LineClamp,
  Paragraph,
  Pinned,
  Post as StyledPost,
  PostPreview as StyledPostPreview,
  Tag,
  Timestamp,
  Title,
} from '../styles';

import { Link } from 'gatsby';
import React from 'react';
import { kebabCase } from 'lodash';

const Tags = ({ tags, ...props }) =>
  tags &&
  tags.length > 0 && (
    <Flex flexWrap="wrap" {...props}>
      {tags.map((tag) => (
        <Tag key={tag} to={`/tags/${kebabCase(tag)}/`}>
          {tag}
        </Tag>
      ))}
    </Flex>
  );

const Post = ({ post, ...props }) => (
  <StyledPost {...props}>
    <Container>
      {post.frontmatter.pinned && <Pinned />}

      <Link to={post.fields.slug}>
        <Title dangerouslySetInnerHTML={{ __html: post.frontmatter.title }} />
      </Link>

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
    boxShadow="0 12px 20px 0 rgb(44 62 80 / 5%)"
    {...props}
  >
    <Flex height="100%" flexDirection="column" justifyContent="space-between">
      <div>
        <LineClamp value={3}>
          <Title mb={2} fontSize="1.25rem">
            <Link to={post.fields.slug}>
              <span
                dangerouslySetInnerHTML={{ __html: post.frontmatter.title }}
              />
            </Link>
          </Title>
        </LineClamp>

        <Timestamp>
          {post.frontmatter.date}
          <Bullet />
          {post.fields.readingTime.text}
        </Timestamp>

        <LineBreak mb={3} />
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
