export interface BlogPost {
  id: string
  title: string
  excerpt: string
  content: string
  category: string
  date: string
  readTime: string
  image: string
  featured?: boolean
}

export interface Project {
  id: string
  title: string
  description: string
  image: string
  tags: string[]
  link?: string
}

export const categories = [
  "All",
  "Design",
  "Development",
  "Creative",
  "Tutorial"
]

export const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "Building Modern Web Experiences with Next.js",
    excerpt: "Exploring the latest features in Next.js and how they can transform your web development workflow.",
    content: "Full article content here...",
    category: "Development",
    date: "2024-01-15",
    readTime: "5 min read",
    image: "/images/blog-2.jpg",
    featured: true
  },
  {
    id: "2",
    title: "The Art of Minimalist Design",
    excerpt: "How less can truly be more when it comes to creating impactful digital experiences.",
    content: "Full article content here...",
    category: "Design",
    date: "2024-01-10",
    readTime: "4 min read",
    image: "/images/blog-1.jpg"
  },
  {
    id: "3",
    title: "Creative Coding: Where Art Meets Technology",
    excerpt: "Discover how creative coding is pushing the boundaries of digital art and interactive experiences.",
    content: "Full article content here...",
    category: "Creative",
    date: "2024-01-05",
    readTime: "6 min read",
    image: "/images/blog-3.jpg"
  },
  {
    id: "4",
    title: "Getting Started with TypeScript in 2024",
    excerpt: "A comprehensive guide to TypeScript for JavaScript developers looking to level up.",
    content: "Full article content here...",
    category: "Tutorial",
    date: "2024-01-01",
    readTime: "8 min read",
    image: "/images/blog-4.jpg"
  },
  {
    id: "5",
    title: "Responsive Design Patterns That Work",
    excerpt: "Modern CSS techniques for building truly responsive and accessible websites.",
    content: "Full article content here...",
    category: "Design",
    date: "2023-12-28",
    readTime: "5 min read",
    image: "/images/blog-1.jpg"
  },
  {
    id: "6",
    title: "Animation Principles for the Web",
    excerpt: "Learn how to create smooth, performant animations that enhance user experience.",
    content: "Full article content here...",
    category: "Creative",
    date: "2023-12-20",
    readTime: "7 min read",
    image: "/images/blog-3.jpg"
  }
]

export const projects: Project[] = [
  {
    id: "1",
    title: "E-Commerce Platform",
    description: "A modern, full-stack e-commerce solution with seamless checkout experience.",
    image: "/images/project-1.jpg",
    tags: ["Next.js", "Stripe", "Tailwind"],
    link: "#"
  },
  {
    id: "2",
    title: "Analytics Dashboard",
    description: "A comprehensive dashboard for analytics and data visualization.",
    image: "/images/project-2.jpg",
    tags: ["React", "Charts", "Dark Mode"],
    link: "#"
  },
  {
    id: "3",
    title: "Brand Identity",
    description: "Complete brand identity design including logo, stationery, and guidelines.",
    image: "/images/project-3.jpg",
    tags: ["Branding", "Design", "Identity"],
    link: "#"
  }
]
