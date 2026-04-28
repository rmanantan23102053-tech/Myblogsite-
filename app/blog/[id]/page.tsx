import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { blogPosts } from "@/lib/blog-data"
import { Calendar, Clock, ArrowLeft, Share2 } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { notFound } from "next/navigation"

interface BlogPostPageProps {
  params: Promise<{ id: string }>
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    id: post.id,
  }))
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { id } = await params
  const post = blogPosts.find((p) => p.id === id)

  if (!post) {
    notFound()
  }

  const relatedPosts = blogPosts
    .filter((p) => p.id !== post.id && p.category === post.category)
    .slice(0, 2)

  return (
    <main>
      <Header />

      {/* Post Header */}
      <section className="pt-32 pb-16 bg-foreground text-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/blog"
            className="inline-flex items-center text-sm text-background/70 hover:text-background transition-colors mb-8"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Blog
          </Link>

          <span className="inline-block px-3 py-1 text-xs font-medium bg-primary text-primary-foreground rounded-full mb-4">
            {post.category}
          </span>

          <h1 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-balance">
            {post.title}
          </h1>

          <div className="mt-6 flex items-center gap-6 text-sm text-background/70">
            <span className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              {new Date(post.date).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric"
              })}
            </span>
            <span className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              {post.readTime}
            </span>
          </div>
        </div>
      </section>

      {/* Featured Image */}
      <section className="bg-background">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
          <div className="aspect-[21/9] bg-muted rounded-xl overflow-hidden relative">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Post Content */}
      <section className="py-16 bg-background">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <article className="prose prose-lg max-w-none">
            <p className="lead text-xl text-muted-foreground">
              {post.excerpt}
            </p>

            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod 
              tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, 
              quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>

            <h2 className="font-[family-name:var(--font-display)] text-2xl font-bold mt-12 mb-4">
              Getting Started
            </h2>

            <p>
              Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore 
              eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt 
              in culpa qui officia deserunt mollit anim id est laborum.
            </p>

            <p>
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium 
              doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore 
              veritatis et quasi architecto beatae vitae dicta sunt explicabo.
            </p>

            <h2 className="font-[family-name:var(--font-display)] text-2xl font-bold mt-12 mb-4">
              Key Takeaways
            </h2>

            <ul className="space-y-2">
              <li>Nemo enim ipsam voluptatem quia voluptas sit aspernatur</li>
              <li>Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet</li>
              <li>Ut enim ad minima veniam, quis nostrum exercitationem</li>
              <li>Quis autem vel eum iure reprehenderit qui in ea voluptate</li>
            </ul>

            <h2 className="font-[family-name:var(--font-display)] text-2xl font-bold mt-12 mb-4">
              Conclusion
            </h2>

            <p>
              At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis 
              praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias 
              excepturi sint occaecati cupiditate non provident.
            </p>
          </article>

          {/* Share */}
          <div className="mt-12 pt-8 border-t border-border flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Share this article</span>
            <Button variant="outline" size="sm">
              <Share2 className="mr-2 h-4 w-4" />
              Share
            </Button>
          </div>
        </div>
      </section>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="py-16 bg-muted/50">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-[family-name:var(--font-display)] text-2xl font-bold mb-8">
              Related Articles
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              {relatedPosts.map((related) => (
                <Link
                  key={related.id}
                  href={`/blog/${related.id}`}
                  className="group bg-card rounded-xl p-6 border border-border hover:border-primary/50 transition-all duration-300"
                >
                  <span className="text-xs font-medium text-primary">{related.category}</span>
                  <h3 className="font-[family-name:var(--font-display)] text-lg font-semibold mt-2 group-hover:text-primary transition-colors">
                    {related.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                    {related.excerpt}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </main>
  )
}
