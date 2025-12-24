"use client"

import Image from "next/image"
import { ImageIcon } from "lucide-react"

interface HistoryImage {
  id: string
  url: string
  prompt: string
}

interface ImageHistoryProps {
  images: HistoryImage[]
  onSelect: (image: HistoryImage) => void
}

export default function ImageHistory({ images, onSelect }: ImageHistoryProps) {
  if (images.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="w-20 h-20 rounded-2xl bg-white/5 flex items-center justify-center mb-4">
          <ImageIcon className="w-10 h-10 text-white/20" />
        </div>
        <h3 className="text-lg font-medium text-white/70 mb-2">No images yet</h3>
        <p className="text-sm text-white/40">Your generated artworks will appear here</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {images.map((image, index) => (
        <div
          key={image.id}
          className="group relative cursor-pointer rounded-xl overflow-hidden glass hover:border-purple-500/50 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-purple-500/10"
          onClick={() => onSelect(image)}
          style={{ animationDelay: `${index * 50}ms` }}
        >
          <div className="aspect-square relative">
            <Image
              src={image.url || "/placeholder.svg"}
              alt={image.prompt}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
              sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300" />
            
            {/* Prompt Text */}
            <div className="absolute inset-x-0 bottom-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
              <p className="text-xs text-white line-clamp-2">{image.prompt}</p>
            </div>
            
            {/* Hover Border Effect */}
            <div className="absolute inset-0 rounded-xl ring-2 ring-purple-500/0 group-hover:ring-purple-500/50 transition-all duration-300" />
          </div>
        </div>
      ))}
    </div>
  )
}
