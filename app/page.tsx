import { BlogPosts } from "app/components/posts";

export default function Page() {
  return (
    <section>
      <h1 className="mb-8 text-2xl font-semibold tracking-tighter">
        Hi. I'm Naveen Pitchandi.
      </h1>
      <p className="mb-4">
        <p className="mb-4">
          {`I build software products that people need and love for a living, occasionally wield the camera for fun, promised myself to write more this year than year before, wanderlust wife’s travel companion, part-time instagram father, full-time baby sleep trainer.`}
        </p>
        {`
        Regret to inform, we've been reverse sleep trained by our 3 year old - Zian. He has now converted our bed to his crib. It's collectively a family crib now. I've stopped cribbing about it.`}
      </p>
      <div className="my-8">
        <BlogPosts />
      </div>
    </section>
  );
}
