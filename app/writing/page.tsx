import { BlogPosts } from 'app/components/posts'

export const metadata = {
  title: 'Writing',
  description: 'Read my writing.',
}

export default function Page() {
  return (
    <section>
      <h1 className="font-semibold text-2xl mb-8 tracking-tighter">writing</h1>
      <BlogPosts />
    </section>
  )
}
