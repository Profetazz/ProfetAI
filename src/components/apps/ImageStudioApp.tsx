import React, { useState } from 'react';
import { ImageItem } from '../../types';
import { Image as ImageIcon, Sparkles, Download, Wand2, Sliders, RefreshCw } from 'lucide-react';

interface ImageStudioProps {
  images: ImageItem[];
  onAddImage: (img: ImageItem) => void;
}

export default function ImageStudioApp({ images, onAddImage }: ImageStudioProps) {
  const [prompt, setPrompt] = useState('');
  const [style, setStyle] = useState('Photorealistic');
  const [aspectRatio, setAspectRatio] = useState('16:9');
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedImage, setSelectedImage] = useState<ImageItem>(images[0] || {
    id: 'img-1',
    title: 'Neon Cyber Cityscape',
    prompt: 'Cyberpunk Tokyo',
    url: 'https://picsum.photos/seed/cybercity/800/600',
    style: 'Cyberpunk',
    aspectRatio: '16:9',
    createdAt: Date.now()
  });
  const [activeTab, setActiveTab] = useState<'gallery' | 'editor'>('gallery');
  const [filter, setFilter] = useState('normal');

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setIsGenerating(true);
    setTimeout(() => {
      const seed = Math.floor(Math.random() * 1000);
      const newImg: ImageItem = {
        id: `img-${Date.now()}`,
        title: prompt.slice(0, 25) + '...',
        prompt,
        url: `https://picsum.photos/seed/${seed}/800/600`,
        style,
        aspectRatio,
        createdAt: Date.now()
      };
      onAddImage(newImg);
      setSelectedImage(newImg);
      setIsGenerating(false);
      setPrompt('');
    }, 2500);
  };

  return (
    <div className="flex flex-col h-full bg-[#12141c] text-foreground p-4 overflow-y-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-purple-500/20 text-purple-400 rounded-xl">
            <ImageIcon className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-lg font-bold">Nexus Canvas AI</h1>
            <p className="text-xs text-muted-foreground">AI Image Generation & Professional Editor</p>
          </div>
        </div>
        <div className="flex bg-[#1a1f2c] p-1 rounded-xl border border-border text-xs">
          <button 
            onClick={() => setActiveTab('gallery')}
            className={`px-3 py-1 rounded-lg transition-all ${activeTab === 'gallery' ? 'bg-purple-500 text-white font-bold' : 'text-muted-foreground'}`}
          >
            Studio
          </button>
          <button 
            onClick={() => setActiveTab('editor')}
            className={`px-3 py-1 rounded-lg transition-all ${activeTab === 'editor' ? 'bg-purple-500 text-white font-bold' : 'text-muted-foreground'}`}
          >
            Editor
          </button>
        </div>
      </div>

      {activeTab === 'gallery' ? (
        <div className="flex-1 flex flex-col gap-4">
          {/* Prompt Form */}
          <form onSubmit={handleGenerate} className="bg-[#1a1f2c] p-4 rounded-2xl border border-border flex flex-col gap-3">
            <div>
              <label className="text-xs font-semibold text-muted-foreground mb-1 block">AI Prompt & Description</label>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Describe the image you want to create in vivid detail..."
                className="w-full bg-[#10131b] border border-border rounded-xl p-3 text-xs text-foreground focus:outline-none focus:border-purple-500 h-20 resize-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-semibold text-muted-foreground mb-1 block">Art Style</label>
                <select
                  value={style}
                  onChange={(e) => setStyle(e.target.value)}
                  className="w-full bg-[#10131b] border border-border rounded-xl p-2 text-xs text-foreground focus:outline-none focus:border-purple-500"
                >
                  <option value="Photorealistic">Photorealistic</option>
                  <option value="Cyberpunk">Cyberpunk Neon</option>
                  <option value="3D Render">3D Render</option>
                  <option value="Anime">Anime / Manga</option>
                  <option value="Oil Painting">Oil Painting</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-semibold text-muted-foreground mb-1 block">Aspect Ratio</label>
                <select
                  value={aspectRatio}
                  onChange={(e) => setAspectRatio(e.target.value)}
                  className="w-full bg-[#10131b] border border-border rounded-xl p-2 text-xs text-foreground focus:outline-none focus:border-purple-500"
                >
                  <option value="1:1">1:1 Square</option>
                  <option value="16:9">16:9 Cinematic</option>
                  <option value="9:16">9:16 Story / Mobile</option>
                  <option value="4:3">4:3 Standard</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              disabled={isGenerating || !prompt.trim()}
              className="w-full py-3 bg-purple-500 hover:bg-purple-600 disabled:opacity-50 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 transition-all shadow-lg shadow-purple-500/20"
            >
              {isGenerating ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
              {isGenerating ? 'Synthesizing with Imagen 3...' : 'Generate Image'}
            </button>
          </form>

          {/* Generated Preview & Recent Gallery */}
          <div className="flex-1 flex flex-col gap-3">
            <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Recent AI Creations</h3>
            <div className="grid grid-cols-2 gap-3">
              {images.map((img) => (
                <div
                  key={img.id}
                  onClick={() => setSelectedImage(img)}
                  className={`group relative rounded-xl overflow-hidden border cursor-pointer bg-[#1a1f2c] transition-all ${
                    selectedImage.id === img.id ? 'border-purple-500 ring-2 ring-purple-500/30' : 'border-border'
                  }`}
                >
                  <img src={img.url} alt={img.title} referrerPolicy="no-referrer" className="w-full h-32 object-cover group-hover:scale-105 transition-transform" />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-2">
                    <p className="text-[11px] font-semibold text-white truncate">{img.title}</p>
                    <span className="text-[9px] text-purple-300">{img.style}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="flex-1 flex flex-col gap-4">
          {/* Image Editor Studio */}
          <div className="flex-1 bg-[#1a1f2c] rounded-2xl border border-border p-4 flex flex-col items-center justify-center relative overflow-hidden">
            <img 
              src={selectedImage.url} 
              alt="Editing" 
              referrerPolicy="no-referrer"
              className={`max-h-60 rounded-xl object-contain shadow-2xl transition-all ${
                filter === 'grayscale' ? 'grayscale' : filter === 'sepia' ? 'sepia' : filter === 'contrast' ? 'contrast-150' : ''
              }`}
            />
            <div className="absolute bottom-3 right-3 flex gap-2">
              <button 
                onClick={() => alert(`Saved edited image: ${selectedImage.title}`)}
                className="px-3 py-1.5 bg-purple-500 text-white rounded-lg text-xs font-semibold flex items-center gap-1 shadow"
              >
                <Download className="w-3.5 h-3.5" /> Save
              </button>
            </div>
          </div>

          <div className="bg-[#1a1f2c] p-4 rounded-2xl border border-border flex flex-col gap-3">
            <h3 className="text-xs font-bold text-muted-foreground flex items-center gap-1.5">
              <Sliders className="w-3.5 h-3.5 text-purple-400" /> AI Filters & Enhancement
            </h3>
            <div className="grid grid-cols-4 gap-2">
              <button onClick={() => setFilter('normal')} className={`p-2 rounded-xl text-xs border ${filter === 'normal' ? 'bg-purple-500/20 border-purple-500 text-purple-300' : 'bg-[#10131b] border-border text-muted-foreground'}`}>Normal</button>
              <button onClick={() => setFilter('grayscale')} className={`p-2 rounded-xl text-xs border ${filter === 'grayscale' ? 'bg-purple-500/20 border-purple-500 text-purple-300' : 'bg-[#10131b] border-border text-muted-foreground'}`}>B&W</button>
              <button onClick={() => setFilter('sepia')} className={`p-2 rounded-xl text-xs border ${filter === 'sepia' ? 'bg-purple-500/20 border-purple-500 text-purple-300' : 'bg-[#10131b] border-border text-muted-foreground'}`}>Sepia</button>
              <button onClick={() => setFilter('contrast')} className={`p-2 rounded-xl text-xs border ${filter === 'contrast' ? 'bg-purple-500/20 border-purple-500 text-purple-300' : 'bg-[#10131b] border-border text-muted-foreground'}`}>HDR+ AI</button>
            </div>

            <button 
              onClick={() => {
                setTimeout(() => alert('AI Object removal & super-resolution enhancement completed!'), 1000);
              }}
              className="w-full py-2.5 bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 border border-purple-500/30 rounded-xl text-xs font-semibold flex items-center justify-center gap-2"
            >
              <Wand2 className="w-4 h-4" /> Magical AI Upscale & Retouch
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
