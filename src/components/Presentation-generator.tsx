"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Sparkles } from "lucide-react"
import GeneratorForm from "@/components/Generator-form"
import PresentationPreview from "@/components/Presentation-preview"
import GenerationLoader from "@/components/Generation-loader"
import type { SlideContent } from "@/types/presentation"

export default function PresentationGenerator() {
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>("")
  const [result, setResult] = useState<SlideContent[] | null>(null)
  const [fileId, setFileId] = useState<string>("")

  // Handle form submission
  const handleSubmit = async (topic: string, numSlides: number, style: string) => {
    setLoading(true)
    setError("")
    setResult(null)

    try {
      const response = await fetch("http://localhost:8000/api/generate-presentation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          topic,
          num_slides: numSlides,
          style,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error("detail" in data ? data.detail : "Failed to generate presentation")
      }

      setResult(data.preview)

      // Extract file ID from file path
      const filePathParts = data.file_path.split(/[/\\]/)
      const fileName = filePathParts[filePathParts.length - 1]
      const extractedFileId = fileName.replace(".pptx", "")
      setFileId(extractedFileId)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unknown error occurred")
    } finally {
      setLoading(false)
    }
  }

  // Handle PowerPoint download
  const handleDownload = () => {
    if (fileId) {
      window.open(`http://localhost:8000/api/download/${fileId}`, "_blank")
    }
  }

  // Reset state to create a new presentation
  const resetPresentation = () => {
    setResult(null)
    setFileId("")
    setError("")
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <div className="inline-flex items-center justify-center mb-4">
          <Sparkles className="h-8 w-8 mr-2 text-purple-500" />
          <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
            SlideGenius
          </h1>
        </div>
        <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
          Transform your ideas into professional presentations in seconds with AI-powered slide generation
        </p>
      </motion.div>

      <AnimatePresence mode="wait">
        {!loading && !result && (
          <motion.div
            key="form"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <GeneratorForm onSubmit={handleSubmit} />
          </motion.div>
        )}

        {loading && (
          <motion.div
            key="loader"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="my-16"
          >
            <GenerationLoader topic={""} />
          </motion.div>
        )}

        {error && (
          <motion.div
            key="error"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 text-red-700 dark:text-red-300 p-4 mb-8 rounded"
          >
            <p>{error}</p>
          </motion.div>
        )}

        {result && !loading && (
          <motion.div
            key="result"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <PresentationPreview slides={result} onDownload={handleDownload} onReset={resetPresentation} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
