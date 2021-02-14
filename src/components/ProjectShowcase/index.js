import React from 'react'
import { EntypoGithub as GithubIcon } from 'react-entypo'
import Button from '../Button'

import './styles.scss'

const ProjectShowcase = ({ project }) => {
  const cta = project.cta || 'View Project'
  return (
    <div className="ProjectShowcase">
      {project.image_url && (
        <a rel="noopener noreferer" href={project.url}>
          <img
            alt={project.title}
            src={project.image_url}
            className="ProjectShowcase--image"
          />
        </a>
      )}
      <div className="content">
        <div className="ProjectShowcase--info">
          <h2>{project.title}</h2>
          <p>{project.description}</p>
        </div>

        {project.image_url && (
          <a rel="noopener noreferer" href={project.url}>
            <img
              alt={project.title}
              className="xs-device-image"
              src={project.image_url}
              style={{
                marginTop: '1em',
                marginBottom: '1em',
                borderRadius: '4px',
              }}
            />
          </a>
        )}

        <div className="margin-top-auto">
          {project.github_url && (
            <a
              className="link"
              rel="noopener noreferer"
              href={project.github_url}
            >
              <GithubIcon style={{ marginRight: 5, marginTop: 2 }} /> View on
              GitHub
            </a>
          )}

          {project.url && <Button href={project.url}>{cta}</Button>}
        </div>
      </div>
    </div>
  )
}

export default ProjectShowcase
