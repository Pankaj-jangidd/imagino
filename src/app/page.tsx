"use client";

import { useState, useEffect, useRef } from "react";
import { Menu, Plus, Settings, Sparkles, ArrowRight, Heart, Download, Home, Clock, Image, Grid, X, Trash2, ChevronLeft, Loader2, Wand2 } from "lucide-react";
import SettingsModal from "@/components/SettingsModal";

interface HistoryItem {
  id: string;
  prompt: string;
  timestamp: Date;
  imageUrl?: string;
}

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

export default function HomePage() {
  const [prompt, setPrompt] = useState("");
  const [activeStyle, setActiveStyle] = useState("All Styles");
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDesktopSidebarExpanded, setIsDesktopSidebarExpanded] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isEnhancing, setIsEnhancing] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const desktopTextareaRef = useRef<HTMLTextAreaElement>(null);
  const mobileTextareaRef = useRef<HTMLTextAreaElement>(null);
  const [settings, setSettings] = useState<Settings>({
    width: 512,
    height: 512,
    steps: 30,
    guidance: 7.5,
    seed: -1,
    enhancePrompt: true,
    model: "stable-diffusion",
    style: "realistic",
  });

  const styles = ["All Styles", "Photorealistic", "Anime", "3D Render", "Cyberpunk", "Oil Painting"];

  const galleryImages = [
    {
      src: "https://lh3.googleusercontent.com/aida-public/AB6AXuBoZGIMGQ0YhFm_0e11Csu8UFAbqYl0a5XLjDh2QV-WfJBOI26oZ_EH2WnjOVXVxGurHWoN8mCtDpJ-IiPG2F0raoBhAhiw_j-YkGGFBQG3yzd9zKazbvXy5d9DFz0VhO4gS_MOVIC-v-oC6KB6rTIQobrVwGtYduJOQ8_SQplPaysCXs9x0DOjMr3MOqXYUdjI1vgSkgBqHHHZ4oq-6pU1MuTiCNJNooX6FSmhPdXVtP_wBQxbR5_M0nXc0sYmK2ro5FcMRxCDLOoB",
      alt: "Abstract vibrant gradient waves",
      category: "Abstract",
      title: "Neon liquid dreamscape",
      time: "2m ago",
      liked: true,
    },
    {
      src: "https://lh3.googleusercontent.com/aida-public/AB6AXuBG1dT4zxpdsZ1Vu_Gh-k8VkRXP4dY3bTIccxaRRWziHrWYAS6TuaS4sLhh5wQ4ZZ9p7dTH9eEzR-bQPPNLyL8hOXyhvhaqkL3pDPeCVzK1okvWCu9mIM2vu1Uu5SukJv-AZ-bnDNZjT3lIQ9RdA2icDiUm2osLmBCdA3MgJSVIxIKy9m5p0Ilfft7ofKoj4BTDPtgsTHySss8PDCcRISqWcEcw65MztjFCmcQ-KLQWgWfO812tjkf3uVUI9nKCmfhntlf2WgeN8YEI",
      alt: "Cyberpunk character portrait",
      category: "3D Render",
      title: "Cyber samurai v2",
      time: "15m ago",
      liked: false,
    },
    {
      src: "https://lh3.googleusercontent.com/aida-public/AB6AXuCAl8YZfIPEcMYbADMEu9F4-UmcX7Q7XAMC_yE3BRXomnABLcff-ZeivX5t0ci7amdJBE1Z0UXS3L9xf3udd-cyf2uqFGVttT-u_oSfRBcua-wTBbBaOBrG3rQi0nfsC7UxPUru2FvOysRwSpIfrPg2yUpwRku84gFDkECfoSc1iugFRGIfuVdI1w66gmxosRGTxnswyQBTJlRPpZg5C-H4jj_Oh9a-X-5T5_qy9PHpN0g7KHdorfxyKH3ivIoSYWQmBApsCCIg1TIn",
      alt: "Anime style city street",
      category: "Anime",
      title: "Tokyo Midnight",
      time: "1h ago",
      liked: false,
    },
    {
      src: "https://lh3.googleusercontent.com/aida-public/AB6AXuC4qGYw5KSBzKLjq_RS_UWnBhEYLswd8wQL4Md9Ym6Y2gqJFH6v6Dv7-T6KSVgXkbylyKpuDfprjgwKmxx5evmH0WhKDFQbfTqsdONzMZM13wYSD6XXJK8uTVK3Kz2HRjhc6RA4wCnt6HxS1VG-VnoUdvav646-gdw1qjnI9BPpooE6Im_zp4P85ihiOAIpz5koaNi_0i7UnzAXykIOkhkQThn20aqQYq2_wHTAFDTHgRcUzWqb_kPK807oxlMGuHgGICTqQOgrO5NQ",
      alt: "Surreal digital landscape",
      category: "Surrealism",
      title: "Dream valley",
      time: "2h ago",
      liked: false,
    },
  ];

  // Load history from localStorage on mount
  useEffect(() => {
    const savedHistory = localStorage.getItem("imagino-history");
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory));
    }
    // Restore prompt and generated image from session
    const savedPrompt = localStorage.getItem("imagino-current-prompt");
    const savedImage = localStorage.getItem("imagino-current-image");
    if (savedPrompt) setPrompt(savedPrompt);
    if (savedImage) setGeneratedImage(savedImage);
  }, []);

  // Auto-resize textareas when prompt changes (including on load)
  useEffect(() => {
    if (desktopTextareaRef.current) {
      desktopTextareaRef.current.style.height = 'auto';
      desktopTextareaRef.current.style.height = Math.min(desktopTextareaRef.current.scrollHeight, 250) + 'px';
    }
    if (mobileTextareaRef.current) {
      mobileTextareaRef.current.style.height = 'auto';
      mobileTextareaRef.current.style.height = Math.min(mobileTextareaRef.current.scrollHeight, 150) + 'px';
    }
  }, [prompt]);

  // Save history to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("imagino-history", JSON.stringify(history));
  }, [history]);

  // Save current prompt and image to localStorage
  useEffect(() => {
    localStorage.setItem("imagino-current-prompt", prompt);
  }, [prompt]);

  useEffect(() => {
    if (generatedImage) {
      localStorage.setItem("imagino-current-image", generatedImage);
    } else {
      localStorage.removeItem("imagino-current-image");
    }
  }, [generatedImage]);

  const handleNewChat = () => {
    setPrompt("");
    setGeneratedImage(null);
    setIsDesktopSidebarExpanded(false);
    setIsSidebarOpen(false);
  };

  // Enhance prompt using Pollinations.ai text API (free, no API key needed)
  const handleEnhancePrompt = async () => {
    if (!prompt.trim() || isEnhancing) return;

    setIsEnhancing(true);
    try {
      const systemPrompt = "You are an expert AI image prompt engineer. Take the user's simple prompt and transform it into a detailed, high-quality image generation prompt. Add specific details about lighting, composition, style, atmosphere, and quality modifiers. Keep it under 150 words. Output ONLY the enhanced prompt, nothing else.";
      const userPrompt = `Enhance this image prompt: "${prompt.trim()}"`;
      
      const response = await fetch(
        `https://text.pollinations.ai/${encodeURIComponent(userPrompt)}?system=${encodeURIComponent(systemPrompt)}&model=openai`
      );
      
      if (response.ok) {
        const enhancedPrompt = await response.text();
        setPrompt(enhancedPrompt.trim());
      }
    } catch (error) {
      console.error("Failed to enhance prompt:", error);
    } finally {
      setIsEnhancing(false);
    }
  };

  // Generate image using Pollinations.ai
  const handleGenerate = async () => {
    if (!prompt.trim() || isGenerating) return;

    setIsGenerating(true);
    
    // Build enhanced prompt based on selected style
    let enhancedPrompt = prompt.trim();
    const styleEnhancements: Record<string, string> = {
      "All Styles": "",
      "Photorealistic": ", photorealistic, ultra detailed, 8k, high quality photography",
      "Anime": ", anime style, studio ghibli, vibrant colors, manga art, detailed",
      "3D Render": ", 3D render, octane render, unreal engine, highly detailed",
      "Cyberpunk": ", cyberpunk style, neon lights, futuristic city, dystopian, dark atmosphere",
      "Oil Painting": ", oil painting style, classical art, brush strokes, artistic, masterpiece",
    };
    
    enhancedPrompt += styleEnhancements[activeStyle] || "";

    // Create Pollinations.ai URL
    const encodedPrompt = encodeURIComponent(enhancedPrompt);
    const seed = settings.seed === -1 ? Math.floor(Math.random() * 1000000) : settings.seed;
    const imageUrl = `https://image.pollinations.ai/prompt/${encodedPrompt}?width=${settings.width}&height=${settings.height}&seed=${seed}&nologo=true`;

    // Add to history
    const newItem: HistoryItem = {
      id: Date.now().toString(),
      prompt: prompt.trim(),
      timestamp: new Date(),
      imageUrl: imageUrl,
    };
    setHistory((prev) => [newItem, ...prev]);

    // Set the generated image (the URL will load the image)
    // Keep isGenerating true - it will be set to false in onLoad handler
    setGeneratedImage(imageUrl);
  };

  const handleHistoryClick = (item: HistoryItem) => {
    setPrompt(item.prompt);
    setIsDesktopSidebarExpanded(false);
    setIsSidebarOpen(false);
  };

  const handleDeleteHistory = (id: string) => {
    setHistory((prev) => prev.filter((item) => item.id !== id));
  };

  const formatDate = (date: Date) => {
    const d = new Date(date);
    const now = new Date();
    const diffMs = now.getTime() - d.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    return `${diffDays}d ago`;
  };

  return (
    <>
      {/* Settings Modal */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        settings={settings}
        setSettings={setSettings}
      />

      {/* ==================== DESKTOP VERSION ==================== */}
      <div className="hidden lg:block min-h-screen overflow-auto">
        {/* Background Effects */}
        <div className="fixed inset-0 z-0 bg-space-gradient pointer-events-none"></div>
        <div 
          className="fixed inset-0 z-0 opacity-[0.1] pointer-events-none" 
          style={{ 
            backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)", 
            backgroundSize: "40px 40px" 
          }}
        ></div>
        <div className="fixed top-[-10%] left-[10%] w-[60vh] h-[60vh] bg-secondary/10 rounded-full blur-[120px] pointer-events-none animate-float"></div>
        <div className="fixed bottom-[10%] right-[-5%] w-[50vh] h-[50vh] bg-primary/10 rounded-full blur-[100px] pointer-events-none animate-float-delayed"></div>

        {/* Desktop Sidebar Overlay */}
        {isDesktopSidebarExpanded && (
          <div 
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-300"
            onClick={() => setIsDesktopSidebarExpanded(false)}
          ></div>
        )}

        {/* Desktop Sidebar - Collapsed */}
        <aside className={`fixed top-0 left-0 bottom-0 z-50 flex flex-col items-center py-6 bg-black/20 backdrop-blur-xl border-r border-white/5 transition-all duration-300 ${isDesktopSidebarExpanded ? 'w-72' : 'w-16'}`}>
          {isDesktopSidebarExpanded ? (
            // Expanded Sidebar
            <div className="flex flex-col h-full w-full px-4">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                  Imagino
                </h1>
                <button 
                  onClick={() => setIsDesktopSidebarExpanded(false)}
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
              </div>

              {/* New Chat Button */}
              <button 
                onClick={handleNewChat}
                className="w-full flex items-center gap-3 px-4 py-3 mb-6 rounded-xl bg-gradient-to-r from-primary/20 to-secondary/20 border border-primary/30 hover:border-primary/60 transition-colors group"
              >
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                  <Plus className="w-5 h-5 text-black" />
                </div>
                <span className="text-white font-medium">New Chat</span>
              </button>

              {/* History Section */}
              <div className="flex-1 overflow-hidden flex flex-col">
                <h3 className="text-white/50 text-xs font-medium uppercase tracking-wider mb-3 px-1">History</h3>
                <div className="flex-1 overflow-y-auto space-y-1 pr-1">
                  {history.length === 0 ? (
                    <p className="text-white/30 text-sm px-1">No history yet</p>
                  ) : (
                    history.map((item) => (
                      <div 
                        key={item.id}
                        className="group flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/5 cursor-pointer transition-colors"
                        onClick={() => handleHistoryClick(item)}
                      >
                        <Clock className="w-4 h-4 text-white/40 flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <p className="text-white/80 text-sm truncate">{item.prompt}</p>
                          <p className="text-white/40 text-xs">{formatDate(item.timestamp)}</p>
                        </div>
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteHistory(item.id);
                          }}
                          className="opacity-0 group-hover:opacity-100 w-6 h-6 rounded flex items-center justify-center text-white/40 hover:text-red-400 hover:bg-red-400/10 transition-all"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Settings Button */}
              <button 
                onClick={() => setIsSettingsOpen(true)}
                className="flex items-center gap-3 px-4 py-3 mt-4 rounded-xl hover:bg-white/5 transition-colors border-t border-white/5 pt-4"
              >
                <Settings className="w-5 h-5 text-white/60" />
                <span className="text-white/80 font-medium">Settings</span>
              </button>
            </div>
          ) : (
            // Collapsed Sidebar
            <>
              {/* Hamburger Menu Icon */}
              <button 
                onClick={() => setIsDesktopSidebarExpanded(true)}
                className="group w-10 h-10 rounded-xl flex items-center justify-center text-primary transition-all duration-300 hover:bg-white/5"
              >
                <Menu className="w-6 h-6 group-hover:drop-shadow-[0_0_8px_rgba(0,238,255,0.8)] transition-all" />
              </button>
              
              {/* New Chat Button with + Icon */}
              <div className="mt-8 relative group">
                <button 
                  onClick={handleNewChat}
                  className="relative w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-105 group-hover:shadow-[0_0_20px_rgba(0,238,255,0.4)]"
                >
                  <div className="absolute inset-0 rounded-xl border border-transparent bg-clip-border [background:linear-gradient(rgba(255,255,255,0.05),rgba(255,255,255,0.05))_padding-box,linear-gradient(to_bottom_right,#00eeff,#d946ef)_border-box] backdrop-blur-sm"></div>
                  <Plus className="w-6 h-6 text-primary relative z-10 drop-shadow-[0_0_8px_rgba(0,238,255,0.6)]" strokeWidth={2.5} />
                </button>
                <div className="absolute left-full top-1/2 -translate-y-1/2 ml-4 px-3 py-1.5 bg-white/10 backdrop-blur-md border border-white/10 rounded-lg text-white text-xs font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 group-hover:translate-x-0 -translate-x-4 transition-all duration-300 pointer-events-none z-50">
                  New Chat
                </div>
              </div>

              {/* History Icon */}
              <div className="mt-4 relative group">
                <button 
                  onClick={() => setIsDesktopSidebarExpanded(true)}
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-white/60 hover:text-primary transition-all duration-300 hover:bg-white/5"
                >
                  <Clock className="w-5 h-5" />
                </button>
                <div className="absolute left-full top-1/2 -translate-y-1/2 ml-4 px-3 py-1.5 bg-white/10 backdrop-blur-md border border-white/10 rounded-lg text-white text-xs font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 group-hover:translate-x-0 -translate-x-4 transition-all duration-300 pointer-events-none z-50">
                  History
                </div>
              </div>

              {/* Settings Gear Icon */}
              <div className="mt-auto relative group">
                <button 
                  onClick={() => setIsSettingsOpen(true)}
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white/60 hover:text-primary transition-all duration-300 hover:drop-shadow-[0_0_8px_rgba(0,238,255,0.8)]"
                >
                  <Settings className="w-6 h-6" />
                </button>
                <div className="absolute left-full top-1/2 -translate-y-1/2 ml-4 px-3 py-1.5 bg-white/10 backdrop-blur-md border border-white/10 rounded-lg text-white text-xs font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 group-hover:translate-x-0 -translate-x-4 transition-all duration-300 pointer-events-none z-50">
                  Settings
                </div>
              </div>
            </>
          )}
        </aside>

        {/* Main Content */}
        <div className={`relative z-10 flex flex-col min-h-screen pb-6 transition-all duration-300 ${isDesktopSidebarExpanded ? 'ml-72' : 'ml-16'}`}>
          {/* Header */}
          <header className="w-full flex items-center justify-between px-10 py-5 bg-gradient-to-b from-black/80 via-black/40 to-transparent backdrop-blur-sm">
            <div className="flex items-center">
              <h1 className="text-3xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary drop-shadow-[0_0_10px_rgba(0,238,255,0.4)]">
                Imagino
              </h1>
            </div>
            <div className="flex items-center gap-6">
              <div className="h-8 w-[1px] bg-white/10"></div>
              <button className="group flex items-center gap-4 focus:outline-none">
                <div className="text-right hidden sm:block">
                  <div className="text-white text-sm font-bold tracking-wide">User</div>
                  <div className="text-primary text-xs font-medium tracking-wider uppercase">Pro Plan</div>
                </div>
                <div className="relative p-[2px] rounded-full bg-gradient-to-tr from-primary to-secondary group-hover:shadow-[0_0_15px_rgba(217,70,239,0.6)] transition-all duration-300">
                  <div className="h-10 w-10 rounded-full overflow-hidden border-2 border-background-dark bg-background-dark">
                    <img 
                      alt="User profile" 
                      className="h-full w-full object-cover" 
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuBdznEyrFYQYPmzoqE_YnPuup1g-3WbRHAmWUoBb6vnOH7nCwKw7WZJDR0OmX2h_6kNEMVuvD7GEMb2Zt-Sbev8QTYwSsrXcWxRCOBAB_psusUh48NG0-ceMzQaZtbUk7id_nAyTgUoBa-iVP45Kzn18hZKTCNbh4OY85mxwMC-wZ-mOItrhNP9Rq8_r3FrBAvLOdEwXSPcmBgzt50WIEQ4XH8UT3hCu1fNA_A3PZpesoGvqXfDZcYK1sqoFTy5IFNlNkvmSTDy4sLx"
                    />
                  </div>
                </div>
              </button>
            </div>
          </header>

          {/* Hero Section */}
          <section className="flex flex-col items-center justify-center px-4 mt-2 mb-4 max-w-7xl mx-auto w-full">
            <h3 className="text-primary text-lg font-bold mb-2 tracking-wide">Hi User</h3>
            <h1 className="text-3xl md:text-4xl lg:text-5xl leading-tight font-bold text-center text-white tracking-tight mb-6">
              Ready to create some <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-white/60 drop-shadow-[0_0_25px_rgba(255,255,255,0.25)]">visual magic?</span>
            </h1>

            {/* Prompt Input */}
            <div className="relative w-full max-w-[800px] group z-20">
              <div className={`absolute -inset-1 bg-gradient-to-r from-primary/30 to-secondary/30 rounded-[24px] blur-xl transition duration-500 ${isInputFocused ? 'opacity-60' : 'opacity-0 group-hover:opacity-40'}`}></div>
              <div className={`relative w-full min-h-[64px] rounded-[20px] bg-black/40 backdrop-blur-2xl border transition-all duration-300 flex items-end px-6 py-3 gap-3 ${isInputFocused ? 'border-primary/80 shadow-[0_0_25px_rgba(0,238,255,0.3)]' : 'border-primary/30 group-hover:border-primary/60'}`}>
                <Sparkles className="w-6 h-6 text-primary flex-shrink-0 mb-2" />
                <textarea 
                  ref={desktopTextareaRef}
                  className="flex-1 bg-transparent border-none text-white text-lg placeholder:text-white/30 focus:ring-0 focus:outline-none font-medium resize-none min-h-[40px] max-h-[250px] py-2 overflow-y-auto" 
                  placeholder="Describe your imagination..." 
                  value={prompt}
                  onChange={(e) => {
                    setPrompt(e.target.value);
                    e.target.style.height = 'auto';
                    e.target.style.height = Math.min(e.target.scrollHeight, 250) + 'px';
                  }}
                  onFocus={() => setIsInputFocused(true)}
                  onBlur={() => setIsInputFocused(false)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleGenerate();
                    }
                  }}
                  onWheel={(e) => {
                    // Completely block scroll from going to the page when inside textarea
                    e.stopPropagation();
                    const el = e.currentTarget;
                    const isAtTop = el.scrollTop === 0;
                    const isAtBottom = el.scrollTop + el.clientHeight >= el.scrollHeight;
                    // Prevent scroll escape at boundaries
                    if ((e.deltaY < 0 && isAtTop) || (e.deltaY > 0 && isAtBottom)) {
                      e.preventDefault();
                    }
                  }}
                  rows={1}
                />
                <div className="flex items-center gap-2 flex-shrink-0 mb-1">
                  <button 
                    onClick={handleEnhancePrompt}
                    disabled={isEnhancing || !prompt.trim()}
                    className="h-[44px] px-5 rounded-full bg-gradient-to-r from-secondary/30 to-purple-500/30 hover:from-secondary/50 hover:to-purple-500/50 text-secondary border border-secondary/50 font-bold text-sm tracking-wide transition-all duration-300 transform hover:scale-105 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 shadow-[0_0_20px_rgba(217,70,239,0.3)] hover:shadow-[0_0_30px_rgba(217,70,239,0.5)]"
                    title="Enhance prompt with AI"
                  >
                    {isEnhancing ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <Wand2 className="w-5 h-5" />
                    )}
                    Enhance
                  </button>
                  <button 
                    onClick={handleGenerate}
                    disabled={!prompt.trim() || isGenerating}
                    className="h-[44px] w-[44px] rounded-full bg-gradient-to-r from-primary to-cyan-400 hover:from-white hover:to-white text-black transition-all duration-300 transform hover:scale-110 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 shadow-[0_0_20px_rgba(0,238,255,0.5)] hover:shadow-[0_0_30px_rgba(0,238,255,0.7)]"
                    title="Generate image"
                  >
                    <ArrowRight className="w-6 h-6" />
                  </button>
                </div>
              </div>
            </div>

            {/* Style Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-3 mt-4">
              {styles.map((style: string) => (
                <button
                  key={style}
                  onClick={() => setActiveStyle(style)}
                  className={`h-9 px-6 rounded-full text-sm font-medium transition-all ${
                    activeStyle === style
                      ? "bg-primary text-background-dark font-bold shadow-[0_0_15px_rgba(0,238,255,0.4)] hover:scale-105"
                      : "bg-white/5 border border-white/10 hover:bg-white/10 hover:border-primary/50 text-white/90 backdrop-blur-md hover:shadow-[0_0_10px_rgba(255,255,255,0.1)] hover:-translate-y-0.5"
                  }`}
                >
                  {style}
                </button>
              ))}
            </div>
          </section>

          {/* Generated Image or Gallery Section */}
          <section className="flex-1 px-10 pb-10 w-full max-w-[1400px] mx-auto overflow-auto">
            {generatedImage || isGenerating ? (
              // Generated Image Display with Loading Overlay
              <div className="flex flex-col items-center justify-center h-full">
                <div className="relative max-w-2xl w-full">
                  <div className="relative rounded-[24px] overflow-hidden bg-background-dark shadow-2xl border border-white/10 min-h-[300px]">
                    {/* Loading Overlay */}
                    {isGenerating && (
                      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-background-dark/90 backdrop-blur-sm">
                        <div className="relative">
                          <div className="w-24 h-24 rounded-full border-4 border-primary/20 border-t-primary animate-spin"></div>
                          <Sparkles className="w-8 h-8 text-primary absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                        </div>
                        <p className="text-white/60 mt-6 text-lg">Creating your masterpiece...</p>
                        <p className="text-primary/80 mt-2 text-sm font-medium animate-pulse">Please wait...</p>
                        <p className="text-white/40 mt-1 text-xs">This may take a few seconds</p>
                      </div>
                    )}
                    {generatedImage && (
                      <img 
                        alt="Generated image" 
                        className={`w-full h-auto object-contain transition-opacity duration-300 ${isGenerating ? 'opacity-0' : 'opacity-100'}`}
                        src={generatedImage}
                        onLoad={() => setIsGenerating(false)}
                      />
                    )}
                  </div>
                  {!isGenerating && (
                    <div className="flex items-center justify-center gap-4 mt-6">
                      <a 
                        href={generatedImage || '#'}
                        download="imagino-generated.png"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="h-12 px-6 rounded-xl bg-primary hover:bg-white text-black font-bold flex items-center gap-2 transition-all"
                      >
                        <Download className="w-5 h-5" />
                        Download
                      </a>
                      <button 
                        onClick={handleNewChat}
                        className="h-12 px-6 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold flex items-center gap-2 transition-all border border-white/10"
                      >
                        <Plus className="w-5 h-5" />
                        New Image
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              // Gallery Section - Only 3 images for desktop
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {galleryImages.slice(0, 3).map((image, index) => (
                  <div 
                    key={index}
                    className="group relative w-full rounded-[24px] overflow-hidden bg-background-dark shadow-2xl border border-white/5 cursor-pointer hover:shadow-[0_20px_40px_rgba(0,0,0,0.6)] hover:z-10 transition-all duration-500"
                  >
                    <div className="relative overflow-hidden rounded-[24px] h-full">
                      <img 
                        alt={image.alt} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:rotate-1" 
                        src={image.src}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-500"></div>
                      <div className="absolute inset-0 p-6 flex flex-col justify-end translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                          <span className="inline-block px-3 py-1 mb-3 rounded-full bg-white/20 backdrop-blur-md text-[10px] font-bold text-white uppercase tracking-wider border border-white/10">
                            {image.category}
                          </span>
                          <h3 className="text-white text-lg font-bold leading-tight mb-4 drop-shadow-md">{image.title}</h3>
                          <div className="flex items-center justify-between pt-4 border-t border-white/20">
                            <span className="text-xs text-white/70 font-medium">{image.time}</span>
                            <div className="flex gap-2">
                              <button className="h-9 w-9 rounded-full bg-white/10 hover:bg-secondary hover:text-white flex items-center justify-center transition-colors text-white backdrop-blur-md group/icon">
                                <Heart className={`w-[18px] h-[18px] group-hover/icon:animate-pulse ${image.liked ? "fill-current" : ""}`} />
                              </button>
                              <button className="h-9 w-9 rounded-full bg-white/10 hover:bg-primary hover:text-black flex items-center justify-center transition-colors text-white backdrop-blur-md">
                                <Download className="w-[18px] h-[18px]" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>
      </div>

      {/* ==================== MOBILE VERSION ==================== */}
      <div className="lg:hidden min-h-screen overflow-auto flex flex-col">
        {/* Background Effects */}
        <div className="fixed inset-0 z-0 bg-space-gradient pointer-events-none"></div>
        <div 
          className="fixed inset-0 z-0 opacity-[0.1] pointer-events-none" 
          style={{ 
            backgroundImage: "radial-gradient(#ffffff 1px, transparent 1px)", 
            backgroundSize: "30px 30px" 
          }}
        ></div>
        <div className="fixed top-[-10%] right-[-20%] w-[300px] h-[300px] bg-secondary/20 rounded-full blur-[80px] pointer-events-none animate-float"></div>
        <div className="fixed bottom-[20%] left-[-10%] w-[250px] h-[250px] bg-primary/20 rounded-full blur-[80px] pointer-events-none animate-float-delayed"></div>

        {/* Mobile Sidebar Overlay */}
        {isSidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 transition-opacity duration-300"
            onClick={() => setIsSidebarOpen(false)}
          ></div>
        )}

        {/* Mobile Sidebar */}
        <aside className={`fixed top-0 left-0 bottom-0 w-[75%] max-w-[300px] z-50 bg-[#0f2223] border-r border-white/10 transform transition-transform duration-300 flex flex-col p-6 shadow-2xl ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">Imagino</h2>
            <button onClick={() => setIsSidebarOpen(false)} className="text-white/60 hover:text-white">
              <X className="w-6 h-6" />
            </button>
          </div>
          
          {/* New Chat Button */}
          <button 
            onClick={handleNewChat}
            className="w-full flex items-center gap-3 px-4 py-3 mb-6 rounded-xl bg-gradient-to-r from-primary/20 to-secondary/20 border border-primary/30 hover:border-primary/60 transition-colors"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
              <Plus className="w-5 h-5 text-black" />
            </div>
            <span className="text-white font-medium">New Chat</span>
          </button>

          {/* History */}
          <div className="flex-1 overflow-hidden flex flex-col">
            <h3 className="text-white/50 text-xs font-medium uppercase tracking-wider mb-3">History</h3>
            <div className="flex-1 overflow-y-auto space-y-1">
              {history.length === 0 ? (
                <p className="text-white/30 text-sm">No history yet</p>
              ) : (
                history.slice(0, 10).map((item) => (
                  <div 
                    key={item.id}
                    className="group flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/5 cursor-pointer transition-colors"
                    onClick={() => handleHistoryClick(item)}
                  >
                    <Clock className="w-4 h-4 text-white/40 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-white/80 text-sm truncate">{item.prompt}</p>
                      <p className="text-white/40 text-xs">{formatDate(item.timestamp)}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Settings */}
          <button 
            onClick={() => {
              setIsSettingsOpen(true);
              setIsSidebarOpen(false);
            }}
            className="flex items-center gap-3 px-4 py-3 mt-4 rounded-xl hover:bg-white/5 transition-colors border-t border-white/10 pt-4"
          >
            <Settings className="w-5 h-5 text-white/60" />
            <span className="text-white/80 font-medium">Settings</span>
          </button>
        </aside>

        {/* Mobile Header */}
        <header className="sticky top-0 z-30 w-full px-5 py-3 flex items-center justify-between backdrop-blur-md bg-black/10 border-b border-white/5">
          <div className="flex items-center">
            <h1 className="text-2xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">Imagino</h1>
          </div>
          <div className="h-9 w-9 rounded-full p-[2px] bg-gradient-to-tr from-primary to-secondary shadow-[0_0_10px_rgba(0,238,255,0.3)]">
            <div className="h-full w-full rounded-full overflow-hidden bg-background-dark">
              <img 
                alt="User profile" 
                className="h-full w-full object-cover" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBdznEyrFYQYPmzoqE_YnPuup1g-3WbRHAmWUoBb6vnOH7nCwKw7WZJDR0OmX2h_6kNEMVuvD7GEMb2Zt-Sbev8QTYwSsrXcWxRCOBAB_psusUh48NG0-ceMzQaZtbUk7id_nAyTgUoBa-iVP45Kzn18hZKTCNbh4OY85mxwMC-wZ-mOItrhNP9Rq8_r3FrBAvLOdEwXSPcmBgzt50WIEQ4XH8UT3hCu1fNA_A3PZpesoGvqXfDZcYK1sqoFTy5IFNlNkvmSTDy4sLx"
              />
            </div>
          </div>
        </header>

        {/* Mobile Main Content */}
        <main className="relative z-10 px-5 pt-4 flex flex-col flex-1 w-full">
          {/* Mobile Hero */}
          <div className="mb-4">
            <h3 className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary text-lg font-bold mb-1 tracking-wide uppercase">Hi User</h3>
            <h1 className="text-3xl leading-[1.1] font-bold text-white tracking-tight">
              Ready to create some <br />
              <span className="text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.4)]">visual magic?</span>
            </h1>
          </div>

          {/* Mobile Prompt Input */}
          <div className="relative w-full mb-4 group z-20">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-lg blur opacity-0 group-hover:opacity-50 transition duration-500"></div>
            <div className="relative bg-black/60 backdrop-blur-xl border border-white/10 rounded-lg p-3 flex flex-col gap-2 shadow-2xl">
              <textarea 
                ref={mobileTextareaRef}
                className="w-full bg-transparent border-none text-white text-base placeholder:text-white/30 focus:ring-0 focus:outline-none font-medium resize-none min-h-[40px] max-h-[150px] overflow-y-auto"
                style={{ height: 'auto' }}
                placeholder="Describe your imagination..."
                value={prompt}
                onChange={(e) => {
                  setPrompt(e.target.value);
                  e.target.style.height = 'auto';
                  e.target.style.height = Math.min(e.target.scrollHeight, 150) + 'px';
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleGenerate();
                  }
                }}
                onWheel={(e) => {
                  // Completely block scroll from going to the page when inside textarea
                  e.stopPropagation();
                  const el = e.currentTarget;
                  const isAtTop = el.scrollTop === 0;
                  const isAtBottom = el.scrollTop + el.clientHeight >= el.scrollHeight;
                  // Prevent scroll escape at boundaries
                  if ((e.deltaY < 0 && isAtTop) || (e.deltaY > 0 && isAtBottom)) {
                    e.preventDefault();
                  }
                }}
                onTouchMove={(e) => {
                  // Stop touch scroll from going to the page when inside textarea
                  e.stopPropagation();
                }}
              />
              <div className="flex justify-between items-center pt-1">
                <button className="p-1.5 rounded-full hover:bg-white/10 text-white/50 transition-colors">
                  <Image className="w-5 h-5" />
                </button>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={handleEnhancePrompt}
                    disabled={isEnhancing || !prompt.trim()}
                    className="h-8 px-4 rounded-full bg-gradient-to-r from-secondary/30 to-purple-500/30 hover:from-secondary/50 hover:to-purple-500/50 text-secondary border border-secondary/50 font-bold text-xs transition-all flex items-center gap-1.5 disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_15px_rgba(217,70,239,0.3)]"
                    title="Enhance prompt with AI"
                  >
                    {isEnhancing ? (
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                      <Wand2 className="w-3.5 h-3.5" />
                    )}
                    Enhance
                  </button>
                  <button 
                    onClick={handleGenerate}
                    disabled={!prompt.trim() || isGenerating}
                    className="h-8 w-8 rounded-full bg-gradient-to-r from-primary to-cyan-400 hover:from-white hover:to-white text-black transition-all duration-300 transform active:scale-95 flex items-center justify-center shadow-[0_0_20px_rgba(0,238,255,0.5)] disabled:opacity-50 disabled:cursor-not-allowed"
                    title="Generate image"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Style Buttons - Horizontal Scroll */}
          <div className="w-full overflow-x-auto no-scrollbar mb-4 -mx-5 px-5 pb-2">
            <div className="flex gap-3 w-max">
              {styles.map((style: string) => (
                <button
                  key={style}
                  onClick={() => setActiveStyle(style)}
                  className={`h-9 px-4 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                    activeStyle === style
                      ? "bg-primary text-black font-bold shadow-[0_0_10px_rgba(0,238,255,0.3)] flex items-center gap-2"
                      : "bg-white/5 border border-white/10 hover:bg-white/10 hover:border-primary/50 text-white/90 backdrop-blur-md"
                  }`}
                >
                  {activeStyle === style && <Grid className="w-4 h-4" />}
                  {style}
                </button>
              ))}
            </div>
          </div>

          {/* Generated Image or Gallery Section */}
          {generatedImage || isGenerating ? (
            // Generated Image Display for Mobile with Loading Overlay
            <div className="flex-1 flex flex-col items-center justify-center pb-20">
              <div className="relative w-full max-w-sm">
                <div className="relative rounded-2xl overflow-hidden bg-background-dark shadow-2xl border border-white/10 min-h-[200px]">
                  {/* Loading Overlay */}
                  {isGenerating && (
                    <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-background-dark/90 backdrop-blur-sm">
                      <div className="relative">
                        <div className="w-20 h-20 rounded-full border-4 border-primary/20 border-t-primary animate-spin"></div>
                        <Sparkles className="w-6 h-6 text-primary absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                      </div>
                      <p className="text-white/60 mt-4 text-base">Creating magic...</p>
                      <p className="text-primary/80 mt-2 text-sm font-medium animate-pulse">Please wait...</p>
                    </div>
                  )}
                  {generatedImage && (
                    <img 
                      alt="Generated image" 
                      className={`w-full h-auto object-contain transition-opacity duration-300 ${isGenerating ? 'opacity-0' : 'opacity-100'}`}
                      src={generatedImage}
                      onLoad={() => setIsGenerating(false)}
                    />
                  )}
                </div>
                {!isGenerating && (
                  <div className="flex items-center justify-center gap-3 mt-4">
                    <a 
                      href={generatedImage || '#'}
                      download="imagino-generated.png"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="h-10 px-4 rounded-lg bg-primary hover:bg-white text-black font-bold text-sm flex items-center gap-2 transition-all"
                    >
                      <Download className="w-4 h-4" />
                      Download
                    </a>
                    <button 
                      onClick={handleNewChat}
                      className="h-10 px-4 rounded-lg bg-white/10 hover:bg-white/20 text-white font-bold text-sm flex items-center gap-2 transition-all border border-white/10"
                    >
                      <Plus className="w-4 h-4" />
                      New
                    </button>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <>
              {/* Recent Creations Header */}
              <h3 className="text-white text-base font-bold mb-3 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-primary" /> Recent Creations
              </h3>

              {/* Mobile Gallery - 2x2 Grid with all 4 images */}
              <div className="grid grid-cols-2 gap-2 flex-1 pb-20">
                {galleryImages.map((image, index) => (
                  <div key={index} className="group relative rounded-2xl overflow-hidden bg-white/5 border border-white/10 shadow-lg">
                    <img 
                      alt={image.alt} 
                      className="w-full h-full object-cover" 
                      src={image.src}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-100"></div>
                    <div className="absolute bottom-2 left-2 right-2">
                      <div className="text-[9px] font-bold text-primary uppercase tracking-wider mb-0.5">{image.category}</div>
                      <div className="flex justify-between items-end">
                        <h4 className="text-white text-[10px] font-bold leading-tight line-clamp-1 w-[75%]">{image.title}</h4>
                        <button className="text-white/80 hover:text-secondary">
                          <Heart className={`w-4 h-4 ${image.liked ? "fill-current text-secondary" : ""}`} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </main>

        {/* Mobile Bottom Navigation */}
        <nav className="fixed bottom-0 left-0 right-0 z-50 bg-[#0f2223]/90 backdrop-blur-xl border-t border-white/10 pb-safe">
          <div className="flex justify-around items-center h-14 px-2">
            <button className="flex flex-col items-center justify-center w-14 h-full text-primary gap-0.5">
              <Home className="w-5 h-5 drop-shadow-[0_0_8px_rgba(0,238,255,0.6)]" fill="currentColor" />
              <span className="text-[10px] font-medium">Home</span>
            </button>
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="flex flex-col items-center justify-center w-14 h-full text-white/50 hover:text-white gap-0.5 transition-colors"
            >
              <Clock className="w-5 h-5" />
              <span className="text-[10px] font-medium">History</span>
            </button>
            <div className="relative -top-5">
              <button 
                onClick={handleNewChat}
                className="h-12 w-12 rounded-full bg-gradient-to-br from-primary to-secondary shadow-[0_0_20px_rgba(0,238,255,0.5)] flex items-center justify-center text-black transform hover:scale-105 transition-transform"
              >
                <Plus className="w-6 h-6" />
              </button>
            </div>
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="flex flex-col items-center justify-center w-14 h-full text-white/50 hover:text-white gap-0.5 transition-colors"
            >
              <Image className="w-5 h-5" />
              <span className="text-[10px] font-medium">Gallery</span>
            </button>
            <button 
              onClick={() => setIsSettingsOpen(true)}
              className="flex flex-col items-center justify-center w-14 h-full text-white/50 hover:text-white gap-0.5 transition-colors"
            >
              <Settings className="w-5 h-5" />
              <span className="text-[10px] font-medium">Settings</span>
            </button>
          </div>
        </nav>
      </div>
    </>
  );
}
