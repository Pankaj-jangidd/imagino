'use client';

import { useState } from 'react';
import Head from 'next/head';

// Define TypeScript interfaces
interface SlideContent {
  title: string;
  content: string[];
}

interface PresentationResult {
  status: string;
  file_path: string;
  preview: SlideContent[];
}

interface ApiError {
  detail: string;
}

export default function Home() {
  // State variables
  const [topic, setTopic] = useState<string>('');
  const [numSlides, setNumSlides] = useState<number>(5);
  const [style, setStyle] = useState<'modern' | 'minimalist' | 'corporate'>('modern');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [result, setResult] = useState<SlideContent[] | null>(null);
  const [fileId, setFileId] = useState<string>('');

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setResult(null);

    try {
      const response = await fetch('http://localhost:8000/api/generate-presentation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          topic,
          num_slides: numSlides,
          style,
        }),
      });

      const data = await response.json() as PresentationResult | ApiError;

      if (!response.ok) {
        throw new Error('detail' in data ? data.detail : 'Failed to generate presentation');
      }

      const presentationData = data as PresentationResult;
      setResult(presentationData.preview);
      
      // Extract file ID from file path
      const filePathParts = presentationData.file_path.split(/[\/\\]/); // Handle both forward and backslashes
      const fileName = filePathParts[filePathParts.length - 1];
      const extractedFileId = fileName.replace('.pptx', '');
      setFileId(extractedFileId);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setLoading(false);
    }
  };

  // Handle PowerPoint download
  const handleDownload = () => {
    if (fileId) {
      window.open(`http://localhost:8000/api/download/${fileId}`, '_blank');
    }
  };

  // Handle number input change with proper type conversion
  const handleNumSlidesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value)) {
      setNumSlides(value);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Head>
        <title>Text-to-PowerPoint Generator</title>
        <meta name="description" content="Generate PowerPoint presentations from text prompts" />
      </Head>

      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-8">Text-to-PowerPoint Generator</h1>
        
        {/* Form */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="topic" className="block text-sm font-medium text-gray-700 mb-1">
                Presentation Topic
              </label>
              <input
                type="text"
                id="topic"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="Enter your presentation topic"
                required
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label htmlFor="numSlides" className="block text-sm font-medium text-gray-700 mb-1">
                  Number of Slides (3-15)
                </label>
                <input
                  type="number"
                  id="numSlides"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={numSlides}
                  onChange={handleNumSlidesChange}
                  min={3}
                  max={15}
                  required
                />
              </div>
              
              <div>
                <label htmlFor="style" className="block text-sm font-medium text-gray-700 mb-1">
                  Presentation Style
                </label>
                <select
                  id="style"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={style}
                  onChange={(e) => setStyle(e.target.value as 'modern' | 'minimalist' | 'corporate')}
                >
                  <option value="modern">Modern</option>
                  <option value="minimalist">Minimalist</option>
                  <option value="corporate">Corporate</option>
                </select>
              </div>
            </div>
            
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
              disabled={loading}
            >
              {loading ? 'Generating...' : 'Generate Presentation'}
            </button>
          </form>
        </div>
        
        {/* Error message */}
        {error && (
          <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-8 rounded">
            <p>{error}</p>
          </div>
        )}
        
        {/* Results */}
        {result && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Presentation Preview</h2>
              <button
                onClick={handleDownload}
                className="bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors"
              >
                Download PowerPoint
              </button>
            </div>
            
            <div className="space-y-6">
              {result.map((slide, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <h3 className="text-lg font-semibold mb-2">{slide.title}</h3>
                  <ul className="list-disc pl-5">
                    {slide.content.map((item, i) => (
                      <li key={i} className="mb-1">{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
      
      <footer className="text-center py-6 text-gray-600">
        <p>Powered by Text-to-PPT Generator API</p>
      </footer>
    </div>
  );
}