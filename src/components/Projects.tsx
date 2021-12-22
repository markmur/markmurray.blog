import React from 'react';
import { get } from 'lodash-es';
import { Flex, Box } from '../styles';

const transformProject = (project) => {
  const id = get(project, 'id');
  const slug = get(project, 'fields.slug', '');
  const frontmatter = get(project, 'frontmatter', {});
  const cta = get(project, 'frontmatter.cta', 'View Project');

  return {
    id,
    slug,
    ...frontmatter,
    cta,
  };
};

const Projects = ({ projects, renderProject }) => (
  <Flex mx={[-5, -4, -5]}>
    {projects.map((project) => (
      <Box flex={['1 1 100%', '0 0 calc(100%/2)']} px={[5, 3, 5]} mb={[5]}>
        {renderProject(transformProject(project), project.id)}
      </Box>
    ))}
  </Flex>
);

export default Projects;
