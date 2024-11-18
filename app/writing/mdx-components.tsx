import { MDXImage } from 'app/components/mdx-image'
import type { MDXComponents as MDXComponentsType } from '@mdx-js/react'

export function useMDXComponents(components: MDXComponentsType): MDXComponentsType {
  return {
    ...components,
    img: MDXImage,
  }
}
