"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Wand2, Presentation, Layers } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { Card, CardContent, CardFooter, CardHeader } from "../components/ui/Card"
import { Input } from "@/components/ui/Input"
import { Label } from "@/components/ui/Label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/Select"

interface GeneratorFormProps {
  onSubmit: (topic: string, numSlides: number, style: string) => Promise<void>
}

export default function GeneratorForm({ onSubmit }: GeneratorFormProps) {
  const [topic, setTopic] = useState<string>("")
  const [numSlides, setNumSlides] = useState<number>(5)
  const [style, setStyle] = useState<string>("modern")
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    await onSubmit(topic, numSlides, style)
    setIsSubmitting(false)
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <Card className="border-slate-200 dark:border-slate-800  shadow-lg " >
        <CardHeader className="pb-4">
          <h2 className="text-2xl font-bold text-center">Create Your Presentation</h2>
          <p className="text-center text-slate-500 dark:text-slate-400">
            Describe your topic and we'll generate a professional presentation
          </p>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="topic" className="flex items-center">
                <Presentation className="h-4 w-4 mr-2 text-purple-500" />
                Presentation Topic
              </Label>
              <Input
                id="topic"
                placeholder="Enter your presentation topic or idea"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className=" border-slate-300 dark:border-slate-700 bg-white"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="numSlides" className="flex items-center">
                  <Layers className="h-4 w-4 mr-2 text-purple-500" />
                  Number of Slides (3-15)
                </Label>
                <input
                  id="numSlides"
                  type="number"
                  min={3}
                  max={15}
                  value={numSlides}
                  onChange={(e) => setNumSlides(Number.parseInt(e.target.value, 10) || 5)}
                  className="border-slate-300 text-black dark:border-slate-700 px-20 py-2 rounded-md"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="style" className="flex items-center">
                  <Wand2 className="h-4 w-4 mr-2 text-purple-500" />
                  Presentation Style
                </Label>
                <Select value={style} onValueChange={setStyle}>
                  <SelectTrigger id="style" className="border-slate-300 dark:border-slate-700 text-black bg-white">
                    <SelectValue placeholder="Select a style" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="modern">Modern</SelectItem>
                    <SelectItem value="minimalist">Minimalist</SelectItem>
                    <SelectItem value="corporate">Corporate</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <span className="flex items-center">
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Processing...
                </span>
              ) : (
                <span className="flex items-center">
                  <Wand2 className="mr-2 h-4 w-4" />
                  Generate Presentation
                </span>
              )}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </motion.div>
  )
}
