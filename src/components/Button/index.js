import React from 'react'

import './styles.scss'

const Button = ({ href, children, ...props }) => (
  <a className="button" rel="noopener noreferrer" href={href} {...props}>
    {children}{' '}
    <svg
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      viewBox="0 0 32 32"
    >
      <path d="M27.728 16.024l-8.485 8.482-2.828-2.835 3.656-3.671h-14.071v-4h14.071l-3.657-3.644 2.828-2.816 8.486 8.484z" />
    </svg>
  </a>
)

export default Button
