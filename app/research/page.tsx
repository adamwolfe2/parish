import Link from 'next/link';
import { PageFade } from '@/components/motion/PageFade';
import { readContent } from '@/lib/content';
import { getResearchPosts } from '@/sanity/lib/research';

const topics = [
  'corporate-governance',
  'pensions-retirement',
  'tax-policy',
  'mergers-acquisitions',
  'microsoft-tech',
  'politics-campaigns',
  'oregon-pers',
  'banking-finance',
  'energy-utilities',
];

export default async function ResearchPage() {
  const posts = await getResearchPosts();

  return (
    <PageFade>
      <main className="container page">
        <section className="section">
          <h1 className="h1">Research</h1>
          <p className="lead">{readContent('research-dek').trim()}</p>
        </section>

        <section className="section">
          <h2 className="h2">Topics</h2>
          <div className="wordmarks">
            {topics.map((topic) => (
              <Link key={topic} href={`/research/topic/${topic}`} className="wordmark-item">
                {topic.replaceAll('-', ' ')}
              </Link>
            ))}
          </div>
        </section>

        <section className="section">
          <h2 className="h2">Archive preview</h2>
          <div className="cards">
            {posts.map((post) => (
              <article className="card" key={post.slug}>
                <p className="meta">{post.publishedAt} · {post.estimatedReadMinutes} min read</p>
                <h3 className="h3"><Link href={`/research/${post.slug}`}>{post.title}</Link></h3>
                <p>{post.dek}</p>
              </article>
            ))}
          </div>
        </section>
      </main>
    </PageFade>
  );
}
