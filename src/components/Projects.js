import React from 'react'
import { get } from 'lodash-es'

const transformProject = project => {
  const id = get(project, 'id')
  const slug = get(project, 'fields.slug', '')
  const frontmatter = get(project, 'frontmatter', {})
  const cta = get(project, 'frontmatter.cta', 'View Project')

  return {
    id,
    slug,
    ...frontmatter,
    cta,
  }
}

const Projects = ({ projects, renderProject }) => (
  <div>
    {projects.map(project =>
      renderProject(transformProject(project), project.id),
    )}
  </div>
)

export default Projects
