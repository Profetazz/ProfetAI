import React, { useState } from 'react';
import { VideoItem } from '../../types';
import { Video, Sparkles, Play, Film, Download, RefreshCw, Clapperboard } from 'lucide-react';

interface VideoSuiteProps {
  videos: VideoItem[];
  onAddVideo: (vid: VideoItem) => void;
}

export default function VideoSuiteApp({ videos, onAddVideo }: VideoSuiteProps) {
  const [prompt, setPrompt] = useState('');
  const [resolution, setResolution] = useState<'720p' | '1080p'>('1080p');
  const [aspectRatio, setAspectRatio] = useState<'16:9' | '9:16'>('16:9');
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState<VideoItem>(videos[0] || {
    id: 'vid-1',
    title: 'Quantum Drive Cinematic',
    prompt: 'Spacecraft wormhole',
    duration: '0:07',
    resolution: '1080p',
    thumbnailUrl: 'https://picsum.photos/seed/spaceship/800/450',
    status: 'completed',
    createdAt: Date.now()
  });

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setIsGenerating(true);
    setTimeout(() => {
      const newVid: VideoItem = {
        id: `vid-${Date.now()}`,
        title: prompt.slice(0, 22) + '...',
        prompt,
        duration: '0:07',
        resolution,
        thumbnailUrl: 'https://picsum.photos/seed/veovideo/800/450',
        status: 'completed',
        createdAt: Date.now()
      };
      onAddVideo(newVid);
      setSelectedVideo(newVid);
      setIsGenerating(false);
      setPrompt('');
    }, 3000);
  };

  return (
    <div className="flex flex-col h-full bg-[#12141c] text-foreground p-4 overflow-y-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-amber-500/20 text-amber-400 rounded-xl">
            <Film className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-lg font-bold">CineGen AI 15</h1>
            <p className="text-xs text-muted-foreground">Cinematic AI Video Generation Studio (Veo)</p>
          </div>
        </div>
        <div className="text-xs bg-amber-500/10 text-amber-400 px-2.5 py-1 rounded-full border border-amber-500/20">
          Veo 3.1
        </div>
      </div>

      {/* Generator Form */}
      <form onSubmit={handleGenerate} className="bg-[#1a1f2c] p-4 rounded-2xl border border-border flex flex-col gap-3 mb-4">
        <div>
          <label className="text-xs font-semibold text-muted-foreground mb-1 block">Video Prompt & Storyboard</label>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Describe cinematic video (e.g. Neon drone shot flying through futuristic cloud city)..."
            className="w-full bg-[#10131b] border border-border rounded-xl p-3 text-xs text-foreground focus:outline-none focus:border-amber-500 h-20 resize-none"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-xs font-semibold text-muted-foreground mb-1 block">Resolution</label>
            <select
              value={resolution}
              onChange={(e) => setResolution(e.target.value as any)}
              className="w-full bg-[#10131b] border border-border rounded-xl p-2 text-xs text-foreground focus:outline-none focus:border-amber-500"
            >
              <option value="1080p">1080p HD</option>
              <option value="720p">720p Fast</option>
            </select>
          </div>
          <div>
            <label className="text-xs font-semibold text-muted-foreground mb-1 block">Format</label>
            <select
              value={aspectRatio}
              onChange={(e) => setAspectRatio(e.target.value as any)}
              className="w-full bg-[#10131b] border border-border rounded-xl p-2 text-xs text-foreground focus:outline-none focus:border-amber-500"
            >
              <option value="16:9">16:9 Cinematic</option>
              <option value="9:16">9:16 Shorts / Reels</option>
            </select>
          </div>
        </div>

        <button
          type="submit"
          disabled={isGenerating || !prompt.trim()}
          className="w-full py-3 bg-amber-500 hover:bg-amber-600 disabled:opacity-50 text-black font-bold rounded-xl text-xs flex items-center justify-center gap-2 transition-all shadow-lg shadow-amber-500/20"
        >
          {isGenerating ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
          {isGenerating ? 'Rendering Veo Video (May take 10s)...' : 'Generate Cinematic Video'}
        </button>
      </form>

      {/* Selected Video Player & Gallery */}
      {selectedVideo && (
        <div className="flex-1 flex flex-col gap-4">
          <div className="bg-[#1a1f2c] rounded-2xl border border-border overflow-hidden shadow-xl">
            <div className="relative group bg-black aspect-video flex items-center justify-center">
              <img src={selectedVideo.thumbnailUrl} alt={selectedVideo.title} referrerPolicy="no-referrer" className="w-full h-full object-cover opacity-90" />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <button 
                  onClick={() => alert(`Playing cinematic render: ${selectedVideo.title}`)}
                  className="w-14 h-14 rounded-full bg-amber-500 text-black flex items-center justify-center shadow-xl hover:scale-110 transition-transform"
                >
                  <Play className="w-6 h-6 fill-black ml-0.5" />
                </button>
              </div>
              <div className="absolute top-3 left-3 bg-black/60 backdrop-blur px-2.5 py-1 rounded-lg text-[10px] text-amber-400 font-mono">
                {selectedVideo.resolution} • {selectedVideo.duration}
              </div>
            </div>
            <div className="p-3 flex items-center justify-between">
              <div>
                <h4 className="font-bold text-sm text-foreground">{selectedVideo.title}</h4>
                <p className="text-xs text-muted-foreground truncate max-w-xs">{selectedVideo.prompt}</p>
              </div>
              <button 
                onClick={() => alert(`Downloading MP4: ${selectedVideo.title}.mp4`)}
                className="px-3 py-1.5 bg-amber-500/20 hover:bg-amber-500/30 text-amber-400 rounded-xl text-xs font-semibold flex items-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" /> MP4
              </button>
            </div>
          </div>

          <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Video Render History</h3>
          <div className="grid grid-cols-2 gap-3 pb-4">
            {videos.map((vid) => (
              <div
                key={vid.id}
                onClick={() => setSelectedVideo(vid)}
                className={`rounded-xl overflow-hidden border bg-[#1a1f2c] cursor-pointer ${selectedVideo.id === vid.id ? 'border-amber-500 ring-2 ring-amber-500/30' : 'border-border'}`}
              >
                <img src={vid.thumbnailUrl} alt={vid.title} referrerPolicy="no-referrer" className="w-full h-24 object-cover" />
                <div className="p-2">
                  <p className="text-[11px] font-semibold text-foreground truncate">{vid.title}</p>
                  <span className="text-[9px] text-muted-foreground">{vid.resolution}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
