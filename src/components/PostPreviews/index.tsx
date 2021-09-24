import React from 'react'
import { PostPreview } from '../post'

import './styles.scss'

const PostPreviews = ({ posts }) => {
  return (
    <div className="postPreviews">
      <ul>
        {posts.map(post => (
          <li key={post.id}>
            <PostPreview post={post} />
          </li>
        ))}
      </ul>
    </div>
  )
}

export default PostPreviews
