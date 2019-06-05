import React from 'react'
import { Link } from 'gatsby'
import { Title, Paragraph } from '../styles'

const Project = ({ project }) => (
  <div>
    <img
      src={project.frontmatter.image_url}
      alt={project.frontmatter.title}
      width="300"
    />
    <Title>
      <Link to={project.fields.slug}>
        <span dangerouslySetInnerHTML={{ __html: project.frontmatter.title }} />
      </Link>
    </Title>
    <Paragraph mb={4}>{project.frontmatter.description}</Paragraph>
  </div>
)

export default Project
