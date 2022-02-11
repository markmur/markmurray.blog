import React from 'react';
import { EntypoGithub as GithubIcon } from 'react-entypo';
import { Button, Flex, Box, Text, Image } from '../../styles';

import './styles.scss';

const ProjectShowcase = ({ project }) => {
  return (
    <Box className="ProjectShowcase" mb={5}>
      <Flex>
        <Box height={130}>
          <Text as="h2">{project.title}</Text>
          <p>{project.description}</p>
        </Box>

        {project.image_url && (
          <a rel="noopener noreferer" href={project.url}>
            <Image
              borderRadius={8}
              mb={4}
              width="640px"
              height="auto"
              aspectRatio={3.25 / 2}
              backgroundColor="#eee"
              alt={project.title}
              src={project.image_url}
              boxShadow="0 12px 36px 0 rgb(44 62 80 / 35%)"
            />
          </a>
        )}

        <Flex
          flexDirection={['column', 'row']}
          width="100%"
          mt="auto"
          alignItems="center"
          justifyContent="space-between"
        >
          {project.github_url && (
            <Button secondary mr={[0, 0, 3]} mb={[2, 2, 0]} flex={[0, 0, 1]}>
              <a
                className="link"
                rel="noopener noreferer"
                href={project.github_url}
              >
                <GithubIcon style={{ marginRight: 5, marginTop: 2 }} />
                <Box display={['none', 'none', 'inline-block']}>
                  View on GitHub
                </Box>
                <Box display={['inline-block', 'inline-block', 'none']}>
                  GitHub
                </Box>
              </a>
            </Button>
          )}

          {project.url && (
            <Button as="a" primary href={project.url} flex={[0, 0, 1]}>
              {project.cta || 'View Project'}
            </Button>
          )}

          {!project.url && !project.github_url && (
            <Button disabled secondary href={project.url}>
              No longer available :(
            </Button>
          )}
        </Flex>
      </Flex>
    </Box>
  );
};

export default ProjectShowcase;
