"use client";

import { X} from "lucide-react";
import SettingsPanel from "./Setting-panel";

interface Settings {
  width: number;
  height: number;
  steps: number;
  guidance: number;
  seed: number;
  enhancePrompt: boolean;
  model: string;
  style: string;
}

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: Settings;
  setSettings: (settings: Settings) => void;
}

export default function SettingsModal({ isOpen, onClose, settings, setSettings }: SettingsModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      ></div>
      
      {/* Modal */}
      <div className="relative z-10 w-full max-w-md mx-4 bg-[#0f2223] border border-white/10 rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-gradient-to-r from-primary/10 to-secondary/10">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <span className="text-primary">⚙️</span> Generation Settings
          </h2>
          <button 
            onClick={onClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        {/* Content */}
        <div className="p-6 max-h-[70vh] overflow-y-auto">
          <SettingsPanel settings={settings} setSettings={setSettings} />
        </div>
        
        {/* Footer */}
        <div className="px-6 py-4 border-t border-white/10 bg-black/20">
          <button 
            onClick={onClose}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-primary to-secondary text-black font-bold hover:opacity-90 transition-opacity"
          >
            Save & Close
          </button>
        </div>
      </div>
    </div>
  );
}
