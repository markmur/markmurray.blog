import React from 'react';
import { CarouselItem } from '../../styles';
import { PostPreview } from '../post';

import './styles.scss';

const PostPreviews = ({ posts, forwardedRef, observe }) => {
  return (
    <div className="postPreviews">
      <ul ref={forwardedRef}>
        {posts.map(post => (
          <CarouselItem key={post.id} ref={observe}>
            <PostPreview post={post} mr={[2, 4]} />
          </CarouselItem>
        ))}
      </ul>
    </div>
  );
};

export default PostPreviews;
