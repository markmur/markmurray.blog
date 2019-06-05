import React from 'react'
import { DiscussionEmbed } from 'disqus-react'
import { kebabCase } from 'lodash'
import Helmet from 'react-helmet'
import { graphql } from 'gatsby'

import Layout from '../components/Layout'
import { HTMLContent } from '../components/Content'
import {
  Flex,
  Bullet,
  Comments,
  Container,
  Content,
  Description,
  LineBreak,
  PostTitle,
  Tag,
  Timestamp,
} from '../styles'

const Tags = ({ tags }) =>
  tags && tags.length > 0 ? (
    <Flex wrap>
      {tags.map(tag => (
        <Tag key={tag} to={`/tags/${kebabCase(tag)}/`}>
          {tag}
        </Tag>
      ))}
    </Flex>
  ) : null

export const ProjectTemplate = ({
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
  const PostContent = postContent
  return (
    <Content pb={4}>
      <Container>
        <PostTitle dangerouslySetInnerHTML={{ __html: title }} />
        <Description>{description}</Description>

        <Timestamp>
          {date}
          <Bullet />
          {readingTime}
        </Timestamp>

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
  )
}

const Project = ({ data }) => {
  const { markdownRemark: post } = data
  const { title, description, tags, date } = post.frontmatter

  return (
    <Layout>
      <Helmet titleTemplate="%s | Blog">
        <title>{`${title}`}</title>
        <meta name="description" content={`${description}`} />
      </Helmet>

      <ProjectTemplate
        id={post.id}
        title={title}
        description={description}
        content={post.html}
        tags={tags}
        date={date}
        readingTime={post.fields.readingTime.text}
      />
    </Layout>
  )
}

export default Project

export const pageQuery = graphql`
  query ProjectByID($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        title
        description
        tags
      }
    }
  }
`
