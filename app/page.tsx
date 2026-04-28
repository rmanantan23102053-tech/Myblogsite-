import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { ProjectsSection } from "@/components/projects-section"
import { PinterestGallery } from "@/components/pinterest-gallery"
import { FeaturedPosts } from "@/components/featured-posts"
import { AboutSection } from "@/components/about-section"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <main>
      <Header />
      <Hero />
      <ProjectsSection />
      <PinterestGallery />
      <FeaturedPosts />
      <AboutSection />
      <Footer />
    </main>
  )
}
