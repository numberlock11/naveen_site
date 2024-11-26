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

export async function LinkPreview({ url }: { url: string }) {
  const ogData = await getOGData(url);
  const hostname = new URL(url).hostname;

  return (
    <div className="group relative overflow-hidden border border-neutral-200 dark:border-neutral-700 rounded-lg transition-colors hover:bg-neutral-100 dark:hover:bg-neutral-800">
      {ogData.image && (
        <div className="aspect-[1.91/1] w-full relative overflow-hidden bg-neutral-100 dark:bg-neutral-900">
          <img
            src={ogData.image}
            alt={ogData.title || 'Link preview'}
            className="object-cover w-full h-full transform transition-transform group-hover:scale-105"
          />
        </div>
      )}
      <div className="p-6">
        <div className="flex items-center text-sm text-neutral-600 dark:text-neutral-400 mb-2">
          <span>{hostname}</span>
        </div>
        <h2 className="font-medium text-xl mb-2 group-hover:text-neutral-800 dark:group-hover:text-neutral-100">
          {ogData.title}
        </h2>
        <p className="text-neutral-600 dark:text-neutral-400 line-clamp-2">
          {ogData.description}
        </p>
      </div>
    </div>
  );
}
