import React from 'react';
import { cache } from 'react';

interface OGData {
  title: string;
  description: string;
  image: string;
  url: string;
}

const getOGData = cache(async (url: string): Promise<OGData> => {
  try {
    const response = await fetch(url);
    const html = await response.text();
    
    // Basic OG tag parsing
    const getMetaContent = (property: string) => {
      const match = html.match(new RegExp(`<meta[^>]*property=["']${property}["'][^>]*content=["']([^"']*)["']`, 'i')) ||
                   html.match(new RegExp(`<meta[^>]*content=["']([^"']*)["'][^>]*property=["']${property}["']`, 'i')) ||
                   html.match(new RegExp(`<meta[^>]*name=["']${property}["'][^>]*content=["']([^"']*)["']`, 'i')) ||
                   html.match(new RegExp(`<meta[^>]*content=["']([^"']*)["'][^>]*name=["']${property}["']`, 'i'));
      return match ? match[1] : '';
    };

    const title = getMetaContent('og:title') || getMetaContent('title') || '';
    const description = getMetaContent('og:description') || getMetaContent('description') || '';
    const image = getMetaContent('og:image') || '';

    return {
      title,
      description,
      image,
      url
    };
  } catch (error) {
    console.error('Error fetching OG data:', error);
    return {
      title: new URL(url).hostname,
      description: 'No description available',
      image: '',
      url
    };
  }
});

interface LinkPreviewProps {
  url: string;
  variant?: 'default' | 'tinkering';
}

export async function LinkPreview({ url, variant = 'default' }: LinkPreviewProps) {
  const ogData = await getOGData(url);
  const hostname = new URL(url).hostname;

  const heightClass = variant === 'tinkering' ? 'h-[400px]' : 'h-[200px]';
  const imageAspectClass = variant === 'tinkering' ? 'aspect-[2/1.5]' : 'aspect-[2/1]';
  const paddingClass = variant === 'tinkering' ? 'p-6' : 'p-3';
  const titleClass = variant === 'tinkering' ? 'text-xl' : 'text-sm';
  const descriptionClass = variant === 'tinkering' ? 'text-base line-clamp-4' : 'text-xs line-clamp-2';

  return (
    <div className={`group relative overflow-hidden border border-neutral-200 dark:border-neutral-700 rounded-lg transition-colors hover:bg-neutral-100 dark:hover:bg-neutral-800 ${heightClass} flex flex-col`}>
      {ogData.image && (
        <div className={`${imageAspectClass} w-full relative overflow-hidden bg-neutral-100 dark:bg-neutral-900 flex-shrink-0`}>
          <img
            src={ogData.image}
            alt={ogData.title || 'Link preview'}
            className="object-cover w-full h-full transform transition-transform group-hover:scale-105"
          />
        </div>
      )}
      <div className={`${paddingClass} flex-1 flex flex-col`}>
        <div className="flex items-center text-xs text-neutral-600 dark:text-neutral-400 mb-1">
          <span>{hostname}</span>
        </div>
        <h2 className={`font-medium ${titleClass} mb-2 group-hover:text-neutral-800 dark:group-hover:text-neutral-100 line-clamp-1`}>
          {ogData.title}
        </h2>
        <p className={`${descriptionClass} text-neutral-600 dark:text-neutral-400 flex-1`}>
          {ogData.description}
        </p>
      </div>
    </div>
  );
}
