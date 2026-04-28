import { projects } from "@/lib/blog-data"
import { ArrowUpRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export function ProjectsSection() {
  return (
    <section id="projects" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
          <div>
            <span className="text-primary font-medium text-sm uppercase tracking-wider">Portfolio</span>
            <h2 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl font-bold mt-2 text-balance">
              Selected Projects
            </h2>
          </div>
          <p className="text-muted-foreground max-w-md">
            A showcase of my recent work, from web applications to creative experiments.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <Link
              key={project.id}
              href={project.link || "#"}
              className="group relative bg-card rounded-xl overflow-hidden border border-border hover:border-primary/50 transition-all duration-300"
            >
              {/* Project Image */}
              <div className="aspect-[4/3] bg-muted relative overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-foreground/10 group-hover:bg-foreground/0 transition-colors" />
              </div>

              {/* Project Info */}
              <div className="p-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-[family-name:var(--font-display)] text-lg font-semibold group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                    <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                      {project.description}
                    </p>
                  </div>
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-muted flex items-center justify-center group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <ArrowUpRight className="h-5 w-5" />
                  </div>
                </div>

                {/* Tags */}
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 text-xs font-medium bg-muted rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
