"use client"

import { Slider } from "../components/ui/Slider"
import { Label } from "../components/ui/Label"
import { Separator } from "../components/ui/Separator"
import { Badge } from "../components/ui/Badge"
import { Maximize2, Wand2, Sliders } from "lucide-react"

// Define prop types for clarity
interface Settings {
  width: number
  height: number
  steps: number
  guidance: number
  seed: number
  enhancePrompt: boolean
  model: string
  style: string
}

interface SettingsPanelProps {
  settings: Settings
  setSettings: (settings: Settings) => void
}

export default function SettingsPanel({ settings, setSettings }: SettingsPanelProps) {
  const handleSliderChange = (name: string, value: number[]) => {
    setSettings({ ...settings, [name]: value[0] })
  }

  return (
    <div className="space-y-6">
      {/* Dimensions Section */}
      <div className="glass rounded-xl p-4">
        <div className="flex items-center gap-2 mb-4">
          <Maximize2 className="h-4 w-4 text-cyan-400" />
          <h3 className="font-medium text-sm">Dimensions</h3>
        </div>
        <div className="space-y-5">
          <div>
            <div className="flex justify-between mb-3">
              <Label className="text-white/70 text-sm">Width</Label>
              <Badge variant="outline" className="bg-cyan-500/10 text-cyan-400 border-cyan-500/30">
                {settings.width}px
              </Badge>
            </div>
            <Slider
              value={[settings.width]}
              min={256}
              max={1024}
              step={64}
              onValueChange={(value) => handleSliderChange("width", value)}
              className="my-1"
            />
          </div>
          <div>
            <div className="flex justify-between mb-3">
              <Label className="text-white/70 text-sm">Height</Label>
              <Badge variant="outline" className="bg-cyan-500/10 text-cyan-400 border-cyan-500/30">
                {settings.height}px
              </Badge>
            </div>
            <Slider
              value={[settings.height]}
              min={256}
              max={1024}
              step={64}
              onValueChange={(value) => handleSliderChange("height", value)}
              className="my-1"
            />
          </div>
        </div>
      </div>

      {/* Generation Parameters */}
      <div className="glass rounded-xl p-4">
        <div className="flex items-center gap-2 mb-4">
          <Sliders className="h-4 w-4 text-purple-400" />
          <h3 className="font-medium text-sm">Parameters</h3>
        </div>
        <div className="space-y-5">
          <div>
            <div className="flex justify-between mb-3">
              <Label className="text-white/70 text-sm">Steps</Label>
              <Badge variant="outline" className="bg-purple-500/10 text-purple-400 border-purple-500/30">
                {settings.steps}
              </Badge>
            </div>
            <Slider
              value={[settings.steps]}
              min={10}
              max={50}
              step={1}
              onValueChange={(value) => handleSliderChange("steps", value)}
              className="my-1"
            />
          </div>
          <div>
            <div className="flex justify-between mb-3">
              <Label className="text-white/70 text-sm">Guidance</Label>
              <Badge variant="outline" className="bg-purple-500/10 text-purple-400 border-purple-500/30">
                {settings.guidance}
              </Badge>
            </div>
            <Slider
              value={[settings.guidance]}
              min={1}
              max={20}
              step={0.5}
              onValueChange={(value) => handleSliderChange("guidance", value)}
              className="my-1"
            />
          </div>
          <div>
            <div className="flex justify-between mb-3">
              <Label className="text-white/70 text-sm">Seed</Label>
              <Badge variant="outline" className="bg-purple-500/10 text-purple-400 border-purple-500/30">
                {settings.seed === -1 ? "Random" : settings.seed}
              </Badge>
            </div>
            <Slider
              value={[settings.seed === -1 ? 0 : settings.seed]}
              min={0}
              max={1000000}
              step={1}
              onValueChange={(value) => handleSliderChange("seed", value[0] === 0 ? [-1] : value)}
              className="my-1"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
