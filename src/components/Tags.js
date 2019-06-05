import React from 'react'
import { kebabCase } from 'lodash-es'
import { Flex, Tag } from '../styles'

const Tags = ({ tags, link }) =>
  tags &&
  tags.length > 0 && (
    <Flex wrap>
      {tags.map(tag => (
        <Tag key={tag} to={link && `/tags/${kebabCase(tag)}/`}>
          {tag}
        </Tag>
      ))}
    </Flex>
  )

export default Tags
