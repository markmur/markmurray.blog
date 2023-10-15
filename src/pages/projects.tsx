import { Container, Content } from '../styles';
import { PageProps, graphql } from 'gatsby';

import BackgroundLines from '../components/BackgroundLines';
import Layout from '../components/Layout';
import ProjectShowcase from '../components/ProjectShowcase';
import Projects from '../components/Projects';
import React from 'react';

const getNodes = (entity) => {
  return entity.edges.map(({ node }) => node);
};

export default function ProjectsPage(
  props: PageProps<Queries.ProjectsPageQuery>,
) {
  const { projects } = props.data;

  return (
    <Layout wide displayTagline={false}>
      <BackgroundLines />
      <Content>
        <Container style={{ marginTop: 80 }}>
          <Projects
            projects={getNodes(projects)}
            renderProject={(project, key) => (
              <ProjectShowcase key={key} project={project} />
            )}
          />
        </Container>
      </Content>
    </Layout>
  );
}

export const pageQuery = graphql`
  query ProjectsPage {
    projects: allMarkdownRemark(
      filter: {
        frontmatter: { templateKey: { eq: "project" }, hidden: { ne: true } }
      }
      sort: { frontmatter: { order: ASC } }
    ) {
      edges {
        node {
          id
          fields {
            slug
          }
          frontmatter {
            title
            tags
            templateKey
            description
            image_url
            url
            cta
            github_url
            date(formatString: "MMMM DD, YYYY")
          }
        }
      }
    }
  }
`;
