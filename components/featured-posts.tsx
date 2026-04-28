import { blogPosts } from "@/lib/blog-data"
import { Button } from "@/components/ui/button"
import { ArrowRight, Calendar, Clock } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export function FeaturedPosts() {
  const recentPosts = blogPosts.slice(0, 3)

  return (
    <section className="py-24 bg-muted/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
          <div>
            <span className="text-primary font-medium text-sm uppercase tracking-wider">Blog</span>
            <h2 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl font-bold mt-2 text-balance">
              Latest Articles
            </h2>
          </div>
          <Button variant="ghost" className="font-medium w-fit" asChild>
            <Link href="/blog">
              View All Posts
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recentPosts.map((post) => (
            <article
              key={post.id}
              className="group bg-card rounded-xl overflow-hidden border border-border hover:border-primary/50 transition-all duration-300"
            >
              {/* Post Image */}
              <div className="aspect-[16/10] bg-muted relative overflow-hidden">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-foreground/5 group-hover:bg-foreground/0 transition-colors" />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 text-xs font-medium bg-primary text-primary-foreground rounded-full">
                    {post.category}
                  </span>
                </div>
              </div>

              {/* Post Info */}
              <div className="p-6">
                <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5" />
                    {new Date(post.date).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric"
                    })}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" />
                    {post.readTime}
                  </span>
                </div>

                <Link href={`/blog/${post.id}`}>
                  <h3 className="font-[family-name:var(--font-display)] text-lg font-semibold group-hover:text-primary transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                </Link>

                <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                  {post.excerpt}
                </p>

                <Link
                  href={`/blog/${post.id}`}
                  className="mt-4 inline-flex items-center text-sm font-medium text-primary hover:underline"
                >
                  Read More
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
