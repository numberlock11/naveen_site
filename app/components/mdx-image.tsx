'use client'

import Image from 'next/image'

interface MDXImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  className?: string
}

export function MDXImage({ src, alt, width = 800, height = 400, className = '' }: MDXImageProps) {
  return (
    <div className={`my-6 ${className}`}>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className="rounded-lg"
        quality={100}
      />
    </div>
  )
}
