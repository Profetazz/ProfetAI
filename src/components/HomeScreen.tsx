import { useState, useEffect } from 'react';
import { AppId, ApkProject, WebProject, CrashLog } from '../types';
import { Cpu, Globe, Image as ImageIcon, Film, FileText, Sparkles, Folder, Settings, Search, Play, Plus, Bug, AlertTriangle } from 'lucide-react';

interface HomeScreenProps {
  onNavigate: (app: AppId) => void;
  apks: ApkProject[];
  webs: WebProject[];
  crashLogs?: CrashLog[];
}

export default function HomeScreen({ onNavigate, apks, webs, crashLogs }: HomeScreenProps) {
  const [timeStr, setTimeStr] = useState('');
  const [dateStr, setDateStr] = useState('');

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      setTimeStr(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }));
      setDateStr(now.toLocaleDateString([], { weekday: 'long', month: 'short', day: 'numeric' }));
    };
    updateDateTime();
    const interval = setInterval(updateDateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const apps = [
    { id: 'crash-analyzer' as AppId, name: 'Crash Inspector', icon: Bug, color: 'bg-rose-500/20 text-rose-400 border-rose-500/30' },
    { id: 'apk-studio' as AppId, name: 'APK Studio', icon: Cpu, color: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' },
    { id: 'web-forge' as AppId, name: 'WebForge', icon: Globe, color: 'bg-blue-500/20 text-blue-400 border-blue-500/30' },
    { id: 'image-studio' as AppId, name: 'Image Studio', icon: ImageIcon, color: 'bg-purple-500/20 text-purple-400 border-purple-500/30' },
    { id: 'video-suite' as AppId, name: 'CineGen AI', icon: Film, color: 'bg-amber-500/20 text-amber-400 border-amber-500/30' },
    { id: 'doc-editor' as AppId, name: 'DocMaster', icon: FileText, color: 'bg-teal-500/20 text-teal-400 border-teal-500/30' },
    { id: 'gemini-assistant' as AppId, name: 'Gemini AI', icon: Sparkles, color: 'bg-indigo-500/20 text-indigo-400 border-indigo-500/30' },
    { id: 'file-explorer' as AppId, name: 'Files', icon: Folder, color: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30' },
  ];

  return (
    <div className="flex flex-col h-full bg-gradient-to-b from-[#161a25] to-[#0b0e14] text-foreground p-5 overflow-y-auto">
      {/* Android 15 Clock Widget */}
      <div className="mt-4 mb-6 bg-[#1f2638]/70 backdrop-blur-xl p-6 rounded-3xl border border-white/10 shadow-2xl flex flex-col justify-between">
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-emerald-400 uppercase tracking-widest flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 animate-pulse" /> Android 15 Nexus AI
          </span>
          <span className="text-xs text-muted-foreground">{dateStr}</span>
        </div>
        <div className="my-4">
          <h1 className="text-5xl font-light tracking-tight text-white">{timeStr || '09:41'}</h1>
          <p className="text-xs text-gray-300 mt-1">Ready to create APKs, websites, images & videos</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
          <span className="text-[11px] text-gray-400">Gemini Neural Core Active</span>
        </div>
      </div>

      {/* Quick Search Bar */}
      <div 
        onClick={() => onNavigate('gemini-assistant')}
        className="mb-6 bg-[#1f2638] hover:bg-[#283149] border border-white/10 rounded-2xl px-4 py-3.5 flex items-center gap-3 cursor-pointer transition-all shadow-lg group"
      >
        <Search className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
        <span className="text-xs text-gray-300 font-medium">Ask Gemini AI to build anything...</span>
      </div>

      {/* Main Apps Grid (4x2) */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        {apps.map((app) => {
          const Icon = app.icon;
          return (
            <button
              key={app.id}
              onClick={() => onNavigate(app.id)}
              className="flex flex-col items-center gap-2 group active:scale-95 transition-transform"
            >
              <div className={`w-14 h-14 rounded-2xl border flex items-center justify-center shadow-lg transition-transform group-hover:scale-105 ${app.color}`}>
                <Icon className="w-6 h-6" />
              </div>
              <span className="text-[11px] font-medium text-gray-200 tracking-tight text-center truncate w-full">
                {app.name}
              </span>
            </button>
          );
        })}
      </div>

      {/* Recent Quick Shortcuts / Bento cards */}
      <div className="mt-auto flex flex-col gap-3">
        {/* Active Crash Log Diagnostic Alert Banner */}
        <div 
          onClick={() => onNavigate('crash-analyzer')}
          className="bg-rose-950/40 hover:bg-rose-900/50 border border-rose-500/40 p-3.5 rounded-2xl cursor-pointer transition-all flex items-center justify-between group shadow-lg"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 bg-rose-500/20 text-rose-400 rounded-xl group-hover:scale-110 transition-transform">
              <Bug className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-rose-300">Moto G54 Crash Analyzed</span>
                <span className="text-[9px] bg-rose-500/20 text-rose-300 px-1.5 py-0.5 rounded font-mono">IOException</span>
              </div>
              <p className="text-[10px] text-gray-300 mt-0.5">java.io.IOException: Archive is not a ZIP archive</p>
            </div>
          </div>
          <span className="text-xs font-bold text-rose-400 group-hover:translate-x-1 transition-transform">Inspect & Fix →</span>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {apks[0] && (
            <div 
              onClick={() => onNavigate('apk-studio')}
              className="bg-[#1a1f2c] p-3 rounded-2xl border border-border cursor-pointer hover:border-emerald-500/50 transition-all flex flex-col justify-between"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded font-medium">APK Project</span>
                <Play className="w-3.5 h-3.5 text-emerald-400" />
              </div>
              <h4 className="font-bold text-xs text-foreground truncate">{apks[0].appName}</h4>
              <p className="text-[10px] text-muted-foreground truncate">{apks[0].packageName}</p>
            </div>
          )}

          {webs[0] && (
            <div 
              onClick={() => onNavigate('web-forge')}
              className="bg-[#1a1f2c] p-3 rounded-2xl border border-border cursor-pointer hover:border-blue-500/50 transition-all flex flex-col justify-between"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] bg-blue-500/20 text-blue-400 px-2 py-0.5 rounded font-medium">Website</span>
                <Globe className="w-3.5 h-3.5 text-blue-400" />
              </div>
              <h4 className="font-bold text-xs text-foreground truncate">{webs[0].title}</h4>
              <p className="text-[10px] text-muted-foreground truncate">HTML5 Sandbox</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
