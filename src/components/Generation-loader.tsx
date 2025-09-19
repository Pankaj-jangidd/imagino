"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

interface GenerationLoaderProps {
  topic: string
}

export default function GenerationLoader({ topic }: GenerationLoaderProps) {
  const [loadingText, setLoadingText] = useState("Analyzing your topic")

  const loadingSteps = [
    "Analyzing your topic",
    "Researching key points",
    "Structuring content",
    "Designing slides",
    "Finalizing presentation",
  ]

  useEffect(() => {
    let currentStep = 0

    const interval = setInterval(() => {
      currentStep = (currentStep + 1) % loadingSteps.length
      setLoadingText(loadingSteps[currentStep])
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="relative w-32 h-32 mb-8">
        <motion.div
          className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 opacity-30"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        />

        <motion.div
          className="absolute inset-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 opacity-50"
          animate={{ rotate: 360 }}
          transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        />

        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <svg className="w-16 h-16 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path d="M13 2v7h7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </motion.div>
      </div>

      <motion.div
        className="text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.h3
          className="text-xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600"
          key={loadingText}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
        >
          {loadingText}
        </motion.h3>
        <p className="text-slate-500 dark:text-slate-400">Creating your presentation. This may take a moment...</p>
      </motion.div>

      <motion.div
        className="mt-8 flex space-x-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-3 h-3 rounded-full bg-purple-500"
            animate={{ scale: [1, 1.5, 1] }}
            transition={{
              duration: 1,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "loop",
              delay: i * 0.2,
            }}
          />
        ))}
      </motion.div>
    </div>
  )
}
