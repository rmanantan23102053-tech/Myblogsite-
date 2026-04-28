"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { blogPosts, categories } from "@/lib/blog-data"
import { Calendar, Clock } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { cn } from "@/lib/utils"

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState("All")

  const filteredPosts = activeCategory === "All"
    ? blogPosts
    : blogPosts.filter((post) => post.category === activeCategory)

  return (
    <main>
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-foreground text-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-[family-name:var(--font-display)] text-4xl sm:text-5xl font-bold tracking-tight">
            Blog & Insights
          </h1>
          <p className="mt-4 text-lg text-background/70 max-w-2xl mx-auto">
            Thoughts on design, development, and the creative process. 
            Sharing what I learn along the way.
          </p>
        </div>
      </section>

      {/* Categories Filter */}
      <section className="py-8 bg-background border-b border-border sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 -mb-2 scrollbar-hide">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors",
                  activeCategory === category
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                )}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Posts Grid - Pinterest Style */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredPosts.length > 0 ? (
            <div className="columns-1 sm:columns-2 lg:columns-3 gap-6">
              {filteredPosts.map((post, index) => {
                // Vary aspect ratios for Pinterest effect
                const aspectRatios = ["aspect-[3/4]", "aspect-[4/3]", "aspect-square", "aspect-[3/4]", "aspect-[4/5]", "aspect-[4/3]"]
                const aspectClass = aspectRatios[index % aspectRatios.length]
                
                return (
                  <article
                    key={post.id}
                    className="break-inside-avoid mb-6 group"
                  >
                    <Link href={`/blog/${post.id}`} className="block">
                      <div className="bg-card rounded-2xl overflow-hidden border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-xl">
                        {/* Post Image */}
                        <div className={cn(aspectClass, "bg-muted relative overflow-hidden")}>
                          <Image
                            src={post.image}
                            alt={post.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                          <div className="absolute top-4 left-4">
                            <span className="px-3 py-1.5 text-xs font-medium bg-white/90 text-foreground rounded-full backdrop-blur-sm">
                              {post.category}
                            </span>
                          </div>
                          {/* Title overlay on image */}
                          <div className="absolute bottom-0 left-0 right-0 p-5">
                            <h3 className="font-[family-name:var(--font-display)] text-lg font-semibold text-white line-clamp-2 text-balance">
                              {post.title}
                            </h3>
                            <div className="flex items-center gap-3 mt-2 text-xs text-white/80">
                              <span className="flex items-center gap-1">
                                <Calendar className="h-3.5 w-3.5" />
                                {new Date(post.date).toLocaleDateString("en-US", {
                                  month: "short",
                                  day: "numeric"
                                })}
                              </span>
                              <span className="flex items-center gap-1">
                                <Clock className="h-3.5 w-3.5" />
                                {post.readTime}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </article>
                )
              })}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-muted-foreground">No posts found in this category.</p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  )
}
