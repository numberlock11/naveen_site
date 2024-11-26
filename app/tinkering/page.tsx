import { getTinkeringProjects } from './utils'
import { LinkPreview } from '../components/link-preview'

export const metadata = {
  title: 'Tinkering',
  description: 'Projects and experiments I\'ve been working on.',
}

export default function Page() {
  const projects = getTinkeringProjects()

  return (
    <section>
      <h1 className="font-semibold text-4xl mb-8 tracking-tighter">tinkering</h1>
      <div className="grid grid-cols-1 gap-8">
        {projects.map((project) => (
          <a
            key={project.title}
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
          >
            <LinkPreview url={project.link} variant="tinkering" />
          </a>
        ))}
      </div>
    </section>
  )
}
