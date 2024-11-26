import { LinkPreview } from '../components/link-preview'

export const metadata = {
  title: 'Featuring',
  description: 'Featured websites and projects.',
}

// Organize sites into categories/rows
const getFeaturedSites = () => {
  return {
    'Conference Talks': [
      'https://www.youtube.com/watch?v=FqT3_oge3oQ',
      'https://www.youtube.com/watch?v=URN1BNhFqFY',
    ],
    'Podcasts': [
      'https://www.podbean.com/ep/dir-mhzqr-f2ffdc4',
      'https://open.spotify.com/episode/0GO7cTvv7E7vxusWLWzkYK',
      'https://9to5mac.com/2021/06/22/vmware-workspace-one-streamlines-macos-management-in-multi-platform-organizations/',
      'https://podcast.macadmins.org/2018/08/01/episode-89-naveen-john-talk-vmware/',
    ]
  }
}

export default function Page() {
  const siteCategories = getFeaturedSites()

  return (
    <section className="w-full">
      <h1 className="font-semibold text-4xl mb-8 tracking-tighter">featuring</h1>
      <div className="space-y-8">
        {Object.entries(siteCategories).map(([category, sites]) => (
          <div key={category} className="space-y-2">
            <h2 className="text-xl font-medium tracking-tight">{category}</h2>
            <div className="relative overflow-hidden">
              <div className="flex overflow-x-auto scrollbar-hide">
                <div className="carousel-track auto-scroll">
                  {/* Original items */}
                  {sites.map((site, index) => (
                    <div key={index} className="flex-none w-[250px]">
                      <a
                        href={site}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block transition-transform hover:scale-[1.02]"
                      >
                        <LinkPreview url={site} />
                      </a>
                    </div>
                  ))}
                  {/* Duplicated items for seamless loop */}
                  {sites.map((site, index) => (
                    <div key={`duplicate-${index}`} className="flex-none w-[250px]">
                      <a
                        href={site}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block transition-transform hover:scale-[1.02]"
                      >
                        <LinkPreview url={site} />
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
