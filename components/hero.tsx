import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-foreground text-background">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-primary blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-primary blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-background/10 text-sm font-medium mb-8">
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          Available for projects
        </div>

        <h1 className="font-[family-name:var(--font-display)] text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight text-balance max-w-4xl mx-auto">
          Creative Developer Building{" "}
          <span className="text-primary">Bold</span> Digital Experiences
        </h1>

        <p className="mt-6 text-lg sm:text-xl text-background/70 max-w-2xl mx-auto text-pretty">
          I design and build modern web applications that combine beautiful aesthetics 
          with powerful functionality. Let&apos;s create something extraordinary together.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button size="lg" className="font-medium px-8" asChild>
            <Link href="#projects">
              View Projects
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button size="lg" variant="outline" className="font-medium px-8 bg-transparent border-background/30 text-background hover:bg-background/10" asChild>
            <Link href="/blog">
              Read Blog
            </Link>
          </Button>
        </div>

        {/* Stats */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { value: "5+", label: "Years Experience" },
            { value: "50+", label: "Projects Completed" },
            { value: "30+", label: "Happy Clients" },
            { value: "15+", label: "Blog Articles" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl font-bold text-primary">
                {stat.value}
              </div>
              <div className="mt-1 text-sm text-background/60">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-background/30 flex items-start justify-center p-1.5">
          <div className="w-1.5 h-3 rounded-full bg-background/50" />
        </div>
      </div>
    </section>
  )
}
