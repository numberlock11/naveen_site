import { MDXImage } from 'app/components/mdx-image'
import type { MDXComponents } from 'mdx/types'

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    img: MDXImage,
  }
}
