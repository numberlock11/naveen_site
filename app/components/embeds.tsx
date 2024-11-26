'use client'

import { Tweet } from 'react-tweet'
import Link from 'next/link'

interface TweetEmbedProps {
  id: string
}

interface URLPreviewProps {
  url: string
}

export function TweetEmbed({ id }: TweetEmbedProps) {
  return (
    <div className="flex justify-center my-6">
      <Tweet id={id} />
    </div>
  )
}

export function URLPreview({ url }: URLPreviewProps) {
  return (
    <Link 
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="block p-4 my-6 border rounded-lg hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors"
    >
      <div className="flex items-center space-x-2">
        <div className="w-4 h-4">
          <img 
            src={`https://www.google.com/s2/favicons?domain=${url}`}
            alt="Website favicon"
            className="w-full h-full"
          />
        </div>
        <span className="text-neutral-600 dark:text-neutral-400 truncate">
          {url}
        </span>
      </div>
    </Link>
  )
}
