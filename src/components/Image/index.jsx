import React from 'react'

const Image = ({
  src,
  alt,
  ...rest
}) => (
  <picture>
    <source srcSet={`${src}?format=webp`} type="image/webp" />
    <img src={src} alt={alt} {...rest} />
  </picture>
)

export default Image
