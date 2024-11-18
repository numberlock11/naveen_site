import { MDXImage } from 'app/components/mdx-image'
import type { ComponentType } from 'react'

interface MDXComponentsType {
  [key: string]: ComponentType<any>
}

export function useMDXComponents(components: MDXComponentsType): MDXComponentsType {
  return {
    ...components,
    img: MDXImage,
  }
}
