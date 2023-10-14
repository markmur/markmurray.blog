import React from 'react';
import Helmet from 'react-helmet';
import { graphql } from 'gatsby';

import Layout from '../components/Layout';
import { HTMLContent } from '../components/Content';
import {
  Box,
  Flex,
  Container,
  Content,
  Description,
  LineBreak,
  PostTitle,
  HideOnMobile,
  Text,
} from '../styles';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';

const About = ({ data }) => {
  const { markdownRemark: post, image } = data;
  const domain = data.site.siteMetadata.url;

  const { title, description, image_url } = post.frontmatter;

  const url = domain + '/about';

  return (
    <Layout>
      <Helmet titleTemplate="%s">
        <title>{title}</title>
        <meta name="description" content={description} />

        <meta property="og:type" content="website" />
        <meta property="og:url" content={url} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />

        {image_url && <meta property="og:image" content={image_url} />}
        {image_url && <meta property="twitter:image" content={image_url} />}
        {image_url && <meta property="image" content={image_url} />}

        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content={url} />
        <meta property="twitter:title" content={title} />
        <meta property="twitter:description" content={description} />
      </Helmet>

      <Content pt={[4, 5]} pb={4}>
        <Container>
          <Box mt={2}>
            <PostTitle dangerouslySetInnerHTML={{ __html: title }} />
            <Description>{description}</Description>
          </Box>

          <LineBreak mt="4em" mb="3em" />

          <Flex>
            <HideOnMobile flex={[1]} mr={[0, 5]}>
              <Flex
                flexWrap="wrap"
                alignItems="flex-start"
                position="sticky"
                top="2em"
                alignSelf="flex-start"
                width="100%"
              >
                <GatsbyImage alt="Profile photo" loading="eager" image={getImage(image.childImageSharp.gatsbyImageData)!} />
              </Flex>
            </HideOnMobile>

            <Box flex={`1 0 20%`} mt={-3}>
              <HTMLContent content={post.html} />
            </Box>
          </Flex>
        </Container>
      </Content>
    </Layout>
  );
};

export default About;

export const pageQuery = graphql`
  query AboutPage {
    site {
      siteMetadata {
        url
      }
    }
    image: file(name: {eq: "profile"}) {
      childImageSharp {
        id
        gatsbyImageData(width: 500, placeholder: BLURRED)
      }
    }
    markdownRemark(frontmatter: { templateKey: { eq: "about" } }) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        title
        description
        image_url
      }
    }
  }
`;
