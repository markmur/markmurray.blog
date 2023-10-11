import React from 'react';
import { DiscussionEmbed } from 'disqus-react';
import { kebabCase } from 'lodash';
import Helmet from 'react-helmet';
import { graphql } from 'gatsby';

import Layout from '../components/Layout';
import { HTMLContent } from '../components/Content';
import {
  Flex,
  Box,
  Bullet,
  Comments,
  Container,
  Content,
  Description,
  LineBreak,
  PostTitle,
  Tag,
  Timestamp,
  Avatar,
} from '../styles';

const Tags = ({ tags }) =>
  tags && tags.length > 0 ? (
    <Flex>
      {tags.map((tag) => (
        <Tag key={tag} to={`/tags/${kebabCase(tag)}/`}>
          {tag}
        </Tag>
      ))}
    </Flex>
  ) : null;

export const BlogPostTemplate = ({
  id,
  title,
  description,
  content,
  tags,
  date,
  readingTime,
  postContent = HTMLContent,
  showComments = true,
}) => {
  const PostContent = postContent;
  return (
    <Content pt={[4, 5]} pb={4}>
      <Container narrow>
        <Box mt={4}>
          <PostTitle dangerouslySetInnerHTML={{ __html: title }} />
          <Description>{description}</Description>
        </Box>

        <Flex alignItems="center" mb={4}>
          <Avatar
            src="https://firebasestorage.googleapis.com/v0/b/project-4767000521921178323.appspot.com/o/images%2Fresized%2Fmark_600x750?alt=media&token=ff0e3bd6-5225-41bf-b96b-f8e166ed92d9"
            width="40"
            height="40"
          />
          <Timestamp>
            by <a href="https://twitter.com/mrkmur">Mark Murray</a>
            <Bullet />
            {date}
            <Bullet />
            {readingTime}
          </Timestamp>
        </Flex>

        <Tags tags={tags} />

        <LineBreak mt="4em" mb="3em" />

        <PostContent content={content} />

        {showComments && (
          <Comments>
            <DiscussionEmbed
              shortname="mark-murray"
              config={{
                identifier: id,
                title,
              }}
            />
          </Comments>
        )}
      </Container>
    </Content>
  );
};

const BlogPost = ({ data }) => {
  const { markdownRemark: post } = data;
  const domain = data.site.siteMetadata.url;

  const { slug } = post.fields;
  const { title, description, tags, date, image } = post.frontmatter;
  const url = `${domain}${slug}`;

  return (
    <Layout>
      <Helmet titleTemplate="%s">
        <title>{title}</title>
        <meta name="description" content={description} />

        <meta property="og:type" content="website" />
        <meta property="og:url" content={url} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />

        {image && <meta property="og:image" content={image} />}
        {image && <meta property="twitter:image" content={image} />}
        {image && <meta property="image" content={image} />}

        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={url} />
        <meta property="twitter:title" content={title} />
        <meta property="twitter:description" content={description} />
      </Helmet>

      <BlogPostTemplate
        id={post.id}
        title={title}
        description={description}
        content={post.html}
        tags={tags}
        date={date}
        readingTime={post.fields.readingTime.text}
      />
    </Layout>
  );
};

export default BlogPost;

export const pageQuery = graphql`
  query BlogPostByID($id: String!) {
    site {
      siteMetadata {
        url
      }
    }
    markdownRemark(id: { eq: $id }) {
      id
      html
      fields {
        slug
        readingTime {
          text
        }
      }
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        title
        description
        tags
        pinned
        image
      }
    }
  }
`;
