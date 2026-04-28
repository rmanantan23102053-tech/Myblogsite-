import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"
import Image from "next/image"

const skills = [
  "Next.js",
  "React",
  "TypeScript",
  "Tailwind CSS",
  "Node.js",
  "UI/UX Design",
  "Animation",
  "Performance"
]

export function AboutSection() {
  return (
    <section id="about" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image/Visual */}
          <div className="relative">
            <div className="aspect-square bg-muted rounded-2xl overflow-hidden relative">
              <Image
                src="/images/profile.jpg"
                alt="Profile photo"
                fill
                className="object-cover"
              />
            </div>
            {/* Decorative element */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-primary rounded-xl -z-10" />
          </div>

          {/* Content */}
          <div>
            <span className="text-primary font-medium text-sm uppercase tracking-wider">About Me</span>
            <h2 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl font-bold mt-2 text-balance">
              A Creative Developer with a Passion for Bold Design
            </h2>

            <div className="mt-6 space-y-4 text-muted-foreground">
              <p>
                I&apos;m a full-stack developer and designer who believes in the power of 
                creating digital experiences that make an impact. With over 5 years of 
                experience, I&apos;ve worked with startups and established brands to bring 
                their visions to life.
              </p>
              <p>
                My approach combines clean code with thoughtful design, ensuring every 
                project is not just functional but also beautiful and user-friendly. I 
                specialize in building modern web applications using the latest technologies.
              </p>
            </div>

            {/* Skills */}
            <div className="mt-8">
              <h3 className="font-semibold mb-4">Skills & Expertise</h3>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-4 py-2 bg-muted rounded-full text-sm font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <Button size="lg" className="mt-8 font-medium">
              <Download className="mr-2 h-4 w-4" />
              Download Resume
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
