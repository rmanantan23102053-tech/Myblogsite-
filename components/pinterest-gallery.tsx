"use client"

import Image from "next/image"
import { useState } from "react"
import { Heart, Bookmark, ExternalLink } from "lucide-react"
import { cn } from "@/lib/utils"

interface Pin {
  id: string
  image: string
  title: string
  category: string
  aspectRatio: "tall" | "medium" | "square"
}

const pins: Pin[] = [
  {
    id: "1",
    image: "/images/pin-1.jpg",
    title: "Modern Interior Design",
    category: "Design",
    aspectRatio: "tall"
  },
  {
    id: "2",
    image: "/images/pin-2.jpg",
    title: "Creative Workspace",
    category: "Lifestyle",
    aspectRatio: "medium"
  },
  {
    id: "3",
    image: "/images/pin-3.jpg",
    title: "3D Abstract Art",
    category: "Creative",
    aspectRatio: "square"
  },
  {
    id: "4",
    image: "/images/pin-4.jpg",
    title: "Mobile App Design",
    category: "Development",
    aspectRatio: "tall"
  },
  {
    id: "5",
    image: "/images/pin-5.jpg",
    title: "Editorial Photography",
    category: "Photography",
    aspectRatio: "medium"
  },
  {
    id: "6",
    image: "/images/pin-6.jpg",
    title: "Architecture Study",
    category: "Design",
    aspectRatio: "square"
  },
  {
    id: "7",
    image: "/images/pin-7.jpg",
    title: "Tech Lifestyle",
    category: "Technology",
    aspectRatio: "medium"
  },
  {
    id: "8",
    image: "/images/pin-8.jpg",
    title: "Botanical Art",
    category: "Illustration",
    aspectRatio: "tall"
  },
  {
    id: "9",
    image: "/images/project-1.jpg",
    title: "E-Commerce Platform",
    category: "Development",
    aspectRatio: "medium"
  },
  {
    id: "10",
    image: "/images/project-2.jpg",
    title: "Analytics Dashboard",
    category: "UI/UX",
    aspectRatio: "square"
  },
  {
    id: "11",
    image: "/images/blog-1.jpg",
    title: "Design Process",
    category: "Tutorial",
    aspectRatio: "medium"
  },
  {
    id: "12",
    image: "/images/blog-3.jpg",
    title: "Typography Art",
    category: "Creative",
    aspectRatio: "tall"
  }
]

function PinCard({ pin }: { pin: Pin }) {
  const [isHovered, setIsHovered] = useState(false)
  const [isLiked, setIsLiked] = useState(false)
  const [isSaved, setIsSaved] = useState(false)

  const aspectRatioClass = {
    tall: "aspect-[3/4]",
    medium: "aspect-[4/3]",
    square: "aspect-square"
  }

  return (
    <div
      className="break-inside-avoid mb-4 group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative rounded-2xl overflow-hidden bg-muted cursor-pointer">
        <div className={cn(aspectRatioClass[pin.aspectRatio], "relative")}>
          <Image
            src={pin.image}
            alt={pin.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>

        {/* Overlay */}
        <div
          className={cn(
            "absolute inset-0 bg-black/40 transition-opacity duration-300",
            isHovered ? "opacity-100" : "opacity-0"
          )}
        />

        {/* Actions */}
        <div
          className={cn(
            "absolute top-3 right-3 flex items-center gap-2 transition-all duration-300",
            isHovered ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"
          )}
        >
          <button
            onClick={(e) => {
              e.stopPropagation()
              setIsLiked(!isLiked)
            }}
            className={cn(
              "w-9 h-9 rounded-full flex items-center justify-center transition-colors",
              isLiked
                ? "bg-primary text-primary-foreground"
                : "bg-white/90 hover:bg-white text-foreground"
            )}
          >
            <Heart className={cn("h-4 w-4", isLiked && "fill-current")} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation()
              setIsSaved(!isSaved)
            }}
            className={cn(
              "w-9 h-9 rounded-full flex items-center justify-center transition-colors",
              isSaved
                ? "bg-primary text-primary-foreground"
                : "bg-white/90 hover:bg-white text-foreground"
            )}
          >
            <Bookmark className={cn("h-4 w-4", isSaved && "fill-current")} />
          </button>
        </div>

        {/* Category Badge */}
        <div
          className={cn(
            "absolute top-3 left-3 transition-all duration-300",
            isHovered ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"
          )}
        >
          <span className="px-3 py-1.5 text-xs font-medium bg-white/90 text-foreground rounded-full">
            {pin.category}
          </span>
        </div>

        {/* Title */}
        <div
          className={cn(
            "absolute bottom-0 left-0 right-0 p-4 transition-all duration-300",
            isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          )}
        >
          <h3 className="text-white font-semibold text-sm">{pin.title}</h3>
        </div>

        {/* Link Button */}
        <div
          className={cn(
            "absolute bottom-3 right-3 transition-all duration-300",
            isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
          )}
        >
          <button className="w-9 h-9 rounded-full bg-white/90 hover:bg-white flex items-center justify-center text-foreground">
            <ExternalLink className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  )
}

export function PinterestGallery() {
  return (
    <section className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-primary font-medium text-sm uppercase tracking-wider">
            Inspiration
          </span>
          <h2 className="font-[family-name:var(--font-display)] text-3xl sm:text-4xl font-bold mt-2 text-balance">
            Creative Gallery
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            A collection of inspiring work, ideas, and creative explorations.
          </p>
        </div>

        {/* Masonry Grid */}
        <div className="columns-2 md:columns-3 lg:columns-4 gap-4">
          {pins.map((pin) => (
            <PinCard key={pin.id} pin={pin} />
          ))}
        </div>
      </div>
    </section>
  )
}
