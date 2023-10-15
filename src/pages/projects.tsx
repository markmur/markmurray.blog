import { Container, Content } from '../styles';

import BackgroundLines from '../components/BackgroundLines';
import Layout from '../components/Layout';
import ProjectShowcase from '../components/ProjectShowcase';
import Projects from '../components/Projects';
import React from 'react';
import { graphql } from 'gatsby';

const getNodes = (entity) => {
  return entity.edges.map(({ node }) => node);
};

export default class ProjectsPage extends React.Component {
  render() {
    const { data } = this.props;

    const projects = getNodes(data.projects);

    return (
      <Layout wide displayTagline={false}>
        <BackgroundLines />
        <Content>
          <Container style={{ marginTop: 80 }}>
            <Projects
              projects={projects}
              renderProject={(project, key) => (
                <ProjectShowcase key={key} project={project} />
              )}
            />
          </Container>
        </Content>
      </Layout>
    );
  }
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
