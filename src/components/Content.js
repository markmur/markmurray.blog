import React from 'react';
import { BlogPost } from '../styles';

export const HTMLContent = ({ content, className = '' }) => (
  <BlogPost
    className={className}
    dangerouslySetInnerHTML={{ __html: content }}
  />
);

const Content = ({ content, className }) => (
  <div style={{ padding: '2em' }} className={className}>
    {content}
  </div>
);

export default Content;
