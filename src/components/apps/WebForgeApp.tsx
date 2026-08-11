import React, { useState } from 'react';
import { WebProject } from '../../types';
import { Globe, Sparkles, Code, Layout, Monitor, Tablet, Smartphone } from 'lucide-react';

interface WebForgeProps {
  webs: WebProject[];
  onAddWeb: (web: WebProject) => void;
}

export default function WebForgeApp({ webs, onAddWeb }: WebForgeProps) {
  const [selectedWeb, setSelectedWeb] = useState<WebProject>(webs[0] || {
    id: 'web-1',
    title: 'CyberCafe',
    prompt: 'A futuristic cyber-punk coffee shop',
    htmlCode: '<div>CyberCafe</div>',
    cssCode: 'body { background: #000; }',
    jsCode: '',
    framework: 'HTML/JS',
    createdAt: Date.now()
  });

  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeTab, setActiveTab] = useState<'preview' | 'html' | 'css'>('preview');
  const [deviceView, setDeviceView] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');

  const handleGenerateWeb = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setIsGenerating(true);
    setTimeout(() => {
      const newWeb: WebProject = {
        id: `web-${Date.now()}`,
        title: prompt.slice(0, 20) + '...',
        prompt,
        htmlCode: `<div class="p-8 max-w-2xl mx-auto text-center font-sans">
  <div class="inline-block p-3 bg-emerald-500/20 text-emerald-400 rounded-2xl mb-4">🚀</div>
  <h1 class="text-3xl font-bold text-white mb-3">${prompt}</h1>
  <p class="text-gray-300 mb-6">Generated instantly by NexusOS 15 WebForge AI Engine.</p>
  <div class="grid grid-cols-2 gap-4 text-left">
    <div class="bg-[#1a2234] p-4 rounded-xl border border-border">
      <h3 class="font-bold text-emerald-400">⚡ Lightning Fast</h3>
      <p class="text-xs text-gray-400 mt-1">Optimized for Android 15 WebView & Chrome.</p>
    </div>
    <div class="bg-[#1a2234] p-4 rounded-xl border border-border">
      <h3 class="font-bold text-emerald-400">🎨 Responsive UI</h3>
      <p class="text-xs text-gray-400 mt-1">Adapts seamlessly to any mobile or desktop screen.</p>
    </div>
  </div>
  <button onclick="alert('Interactive click registered!')" class="mt-6 px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-black font-bold rounded-xl">Explore Feature</button>
</div>`,
        cssCode: `body { background: #0b0f17; color: #f3f4f6; margin: 0; font-family: system-ui, sans-serif; }`,
        jsCode: `console.log("WebForge app loaded.");`,
        framework: 'HTML/JS',
        createdAt: Date.now()
      };
      onAddWeb(newWeb);
      setSelectedWeb(newWeb);
      setIsGenerating(false);
      setPrompt('');
    }, 2000);
  };

  return (
    <div className="flex flex-col h-full bg-[#12141c] text-foreground p-4 overflow-y-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-blue-500/20 text-blue-400 rounded-xl">
            <Globe className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-lg font-bold">WebForge AI 15</h1>
            <p className="text-xs text-muted-foreground">Prompt-to-Website Builder & Live Sandbox</p>
          </div>
        </div>
        <div className="flex items-center gap-1 bg-[#1a1f2c] p-1 rounded-xl border border-border">
          <button onClick={() => setDeviceView('desktop')} className={`p-1.5 rounded-lg ${deviceView === 'desktop' ? 'bg-blue-500 text-white' : 'text-muted-foreground'}`} title="Desktop">
            <Monitor className="w-3.5 h-3.5" />
          </button>
          <button onClick={() => setDeviceView('tablet')} className={`p-1.5 rounded-lg ${deviceView === 'tablet' ? 'bg-blue-500 text-white' : 'text-muted-foreground'}`} title="Tablet">
            <Tablet className="w-3.5 h-3.5" />
          </button>
          <button onClick={() => setDeviceView('mobile')} className={`p-1.5 rounded-lg ${deviceView === 'mobile' ? 'bg-blue-500 text-white' : 'text-muted-foreground'}`} title="Mobile">
            <Smartphone className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Prompt Generator */}
      <form onSubmit={handleGenerateWeb} className="mb-4">
        <div className="relative">
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Describe website to build (e.g. AI SaaS Landing, Portfolio, E-commerce...)"
            className="w-full bg-[#1a1f2c] border border-border rounded-xl px-4 py-3 text-sm pr-12 focus:outline-none focus:border-blue-500 text-foreground"
          />
          <button
            type="submit"
            disabled={isGenerating || !prompt.trim()}
            className="absolute right-2 top-2 bottom-2 px-3 bg-blue-500 hover:bg-blue-600 disabled:opacity-50 text-white font-semibold rounded-lg text-xs flex items-center gap-1 transition-all"
          >
            {isGenerating ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <Sparkles className="w-4 h-4" />}
            {isGenerating ? 'Building...' : 'Build Web'}
          </button>
        </div>
      </form>

      {/* Project Switcher */}
      <div className="flex gap-2 overflow-x-auto pb-2 mb-4 scrollbar-none">
        {webs.map((web) => (
          <button
            key={web.id}
            onClick={() => setSelectedWeb(web)}
            className={`px-3 py-2 rounded-xl text-xs whitespace-nowrap transition-all flex items-center gap-2 ${
              selectedWeb.id === web.id
                ? 'bg-blue-500 text-white font-bold shadow-lg shadow-blue-500/20'
                : 'bg-[#1a1f2c] text-muted-foreground hover:text-white border border-border'
            }`}
          >
            <Globe className="w-3.5 h-3.5" />
            {web.title}
          </button>
        ))}
      </div>

      {/* Inspector */}
      {selectedWeb && (
        <div className="flex-1 flex flex-col bg-[#1a1f2c] border border-border rounded-2xl overflow-hidden shadow-xl">
          {/* Tabs */}
          <div className="flex border-b border-border bg-[#161a25] text-xs">
            <button
              onClick={() => setActiveTab('preview')}
              className={`flex-1 py-2 px-3 font-medium flex items-center justify-center gap-1.5 border-b-2 transition-all ${
                activeTab === 'preview' ? 'border-blue-500 text-blue-400 bg-[#1a1f2c]' : 'border-transparent text-muted-foreground hover:text-white'
              }`}
            >
              <Layout className="w-3.5 h-3.5" /> Live Preview
            </button>
            <button
              onClick={() => setActiveTab('html')}
              className={`flex-1 py-2 px-3 font-medium flex items-center justify-center gap-1.5 border-b-2 transition-all ${
                activeTab === 'html' ? 'border-blue-500 text-blue-400 bg-[#1a1f2c]' : 'border-transparent text-muted-foreground hover:text-white'
              }`}
            >
              <Code className="w-3.5 h-3.5" /> index.html
            </button>
            <button
              onClick={() => setActiveTab('css')}
              className={`flex-1 py-2 px-3 font-medium flex items-center justify-center gap-1.5 border-b-2 transition-all ${
                activeTab === 'css' ? 'border-blue-500 text-blue-400 bg-[#1a1f2c]' : 'border-transparent text-muted-foreground hover:text-white'
              }`}
            >
              <Code className="w-3.5 h-3.5" /> style.css
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 p-4 overflow-y-auto flex items-center justify-center">
            {activeTab === 'preview' ? (
              <div className={`transition-all duration-300 bg-[#0b0f17] rounded-xl border border-border overflow-hidden flex flex-col ${
                deviceView === 'mobile' ? 'w-[320px] h-full' : deviceView === 'tablet' ? 'w-[500px] h-full' : 'w-full h-full'
              }`}>
                <div className="bg-[#151c2d] px-3 py-1.5 border-b border-border flex items-center gap-2 text-[11px] text-muted-foreground">
                  <div className="flex gap-1">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500/80 inline-block"></span>
                    <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80 inline-block"></span>
                    <span className="w-2.5 h-2.5 rounded-full bg-green-500/80 inline-block"></span>
                  </div>
                  <span className="bg-[#0b0f17] px-3 py-0.5 rounded text-gray-300 flex-1 text-center font-mono text-[10px]">https://nexus.preview/site</span>
                </div>
                <div 
                  className="flex-1 overflow-y-auto p-4"
                  dangerouslySetInnerHTML={{ __html: selectedWeb.htmlCode }} 
                />
              </div>
            ) : activeTab === 'html' ? (
              <pre className="w-full h-full text-xs font-mono text-blue-300 bg-[#10131b] p-4 rounded-xl overflow-x-auto">
                {selectedWeb.htmlCode}
              </pre>
            ) : (
              <pre className="w-full h-full text-xs font-mono text-purple-300 bg-[#10131b] p-4 rounded-xl overflow-x-auto">
                {selectedWeb.cssCode}
              </pre>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
