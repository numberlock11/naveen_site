import Link from 'next/link'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { highlight } from 'sugar-high'
import React from 'react'
import { MDXImage } from './mdx-image'
import { TweetEmbed, URLPreview } from './embeds'

function Table({ data }) {
  let headers = data.headers.map((header, index) => (
    <th key={index}>{header}</th>
  ))
  let rows = data.rows.map((row, index) => (
    <tr key={index}>
      {row.map((cell, cellIndex) => (
        <td key={cellIndex}>{cell}</td>
      ))}
    </tr>
  ))

  return (
    <table>
      <thead>
        <tr>{headers}</tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  )
}

function CustomLink(props) {
  let href = props.href

  if (href.startsWith('/')) {
    return (
      <Link href={href} {...props}>
        {props.children}
      </Link>
    )
  }

  if (href.startsWith('#')) {
    return <a {...props} />
  }

  return <a target="_blank" rel="noopener noreferrer" {...props} />
}

function Code({ children, ...props }) {
  let codeHTML = highlight(children)
  return <code dangerouslySetInnerHTML={{ __html: codeHTML }} {...props} />
}

function slugify(str) {
  return str
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/&/g, '-and-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
}

function createHeading(level) {
  return ({ children }) => {
    let slug = slugify(children)
    let className = ''
    
    if (level === 1) {
      className = 'text-3xl font-bold mb-8'
    } else if (level === 2) {
      className = 'text-2xl font-semibold tracking-tighter mt-8 mb-4'
    } else if (level === 3) {
      className = 'font-bold text-xl mt-6 mb-3'
    }
    
    return React.createElement(
      `h${level}`,
      { id: slug, className },
      [
        React.createElement('a', {
          href: `#${slug}`,
          key: `link-${slug}`,
          className: 'anchor',
        }),
      ],
      children
    )
  }
}

function Paragraph({ children }) {
  return <p className="leading-relaxed mb-6">{children}</p>
}

function Blockquote({ children }) {
  return (
    <blockquote className="border-l-4 border-gray-400 pl-4 my-6 italic text-gray-600">
      {children}
    </blockquote>
  )
}

let components = {
  h1: createHeading(1),
  h2: createHeading(2),
  h3: createHeading(3),
  h4: createHeading(4),
  h5: createHeading(5),
  h6: createHeading(6),
  a: CustomLink,
  p: Paragraph,
  blockquote: Blockquote,
  table: Table,
  Image: MDXImage,
  img: MDXImage,
  pre: ({ children }) => <div className="highlight">{children}</div>,
  code: Code,
  TweetEmbed,
  URLPreview
}

export function CustomMDX(props) {
  return (
    <div className="prose prose-lg leading-relaxed">
      <MDXRemote
        {...props}
        components={{ ...components, ...props.components }}
      />
    </div>
  )
}
