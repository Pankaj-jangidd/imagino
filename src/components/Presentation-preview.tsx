"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, Download, Presentation, Wand2 } from "lucide-react"
import { Button } from "@/components/ui/Button"
import type { SlideContent } from "@/types/presentation"

interface PresentationPreviewProps {
  slides: SlideContent[]
  onDownload: () => void
  onReset: () => void
}

export default function PresentationPreview({ slides, onDownload, onReset }: PresentationPreviewProps) {
  const [currentSlide, setCurrentSlide] = useState(0)

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1)
    }
  }

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1)
    }
  }

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex justify-between items-center"
      >
        <h2 className="text-2xl font-bold flex items-center">
          <Presentation className="h-5 w-5 mr-2 text-purple-500" />
          Presentation Preview
        </h2>
        <div className="flex space-x-3">
          <Button
            onClick={onReset}
            variant="outline"
            className="border-purple-200 hover:bg-purple-50 dark:border-purple-800 dark:hover:bg-purple-900/30"
          >
            <Wand2 className="mr-2 h-4 w-4" />
            Create New Presentation
          </Button>
          <Button
            onClick={onDownload}
            className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white"
          >
            <Download className="mr-2 h-4 w-4" />
            Download PowerPoint
          </Button>
        </div>
      </motion.div>

      <div className="relative overflow-hidden rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 shadow-lg aspect-[16/9]">
        <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-purple-500 to-pink-500 h-1" />

        <div className="absolute top-2 right-2 bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs px-2 py-1 rounded-full">
          {currentSlide + 1} / {slides.length}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.3 }}
            className="p-8 h-full flex flex-col"
          >
            <motion.h3
              className="text-2xl font-bold mb-6 text-center text-slate-800 dark:text-slate-100"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.3 }}
            >
              {slides[currentSlide].title}
            </motion.h3>

            <motion.ul
              className="list-disc pl-6 space-y-3 text-slate-700 dark:text-slate-300 flex-1 overflow-y-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.3 }}
            >
              {slides[currentSlide].content.map((item, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + i * 0.1, duration: 0.3 }}
                >
                  {item}
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        </AnimatePresence>

        <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
          {slides.map((_, index) => (
            <motion.button
              key={index}
              className={`w-2 h-2 rounded-full ${
                index === currentSlide ? "bg-purple-500" : "bg-slate-300 dark:bg-slate-700"
              }`}
              onClick={() => setCurrentSlide(index)}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            />
          ))}
        </div>

        <Button
          variant="ghost"
          size="icon"
          onClick={prevSlide}
          disabled={currentSlide === 0}
          className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 dark:bg-slate-900/80 hover:bg-white dark:hover:bg-slate-900 rounded-full"
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          onClick={nextSlide}
          disabled={currentSlide === slides.length - 1}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 dark:bg-slate-900/80 hover:bg-white dark:hover:bg-slate-900 rounded-full"
        >
          <ChevronRight className="h-5 w-5" />
        </Button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 mt-4">
        {slides.map((slide, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05, duration: 0.3 }}
            className={`cursor-pointer p-2 rounded-lg border ${
              index === currentSlide
                ? "border-purple-500 bg-purple-50 dark:bg-purple-900/20"
                : "border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900/50"
            }`}
            onClick={() => setCurrentSlide(index)}
          >
            <div className="aspect-[16/9] p-2 flex flex-col items-center justify-center text-center overflow-hidden">
              <p className="text-xs font-medium truncate w-full">{slide.title}</p>
              <p className="text-[8px] text-slate-500 dark:text-slate-400 mt-1">Slide {index + 1}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
