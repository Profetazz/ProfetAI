import { Settings, Shield, Cpu, Palette, Smartphone, Check, Sparkles } from 'lucide-react';
import { ThemeAccent } from '../../types';

interface SettingsAppProps {
  themeAccent: ThemeAccent;
  onSetThemeAccent: (accent: ThemeAccent) => void;
}

export default function SettingsApp({ themeAccent, onSetThemeAccent }: SettingsAppProps) {
  const accents: { id: ThemeAccent; name: string; color: string }[] = [
    { id: 'emerald', name: 'Material Emerald', color: 'bg-emerald-500' },
    { id: 'lavender', name: 'Cyber Lavender', color: 'bg-purple-500' },
    { id: 'ocean', name: 'Ocean Blue', color: 'bg-blue-500' },
    { id: 'sunset', name: 'Sunset Amber', color: 'bg-amber-500' },
    { id: 'obsidian', name: 'Obsidian Dark', color: 'bg-gray-700' },
  ];

  return (
    <div className="flex flex-col h-full bg-[#12141c] text-foreground p-4 overflow-y-auto">
      {/* Header */}
      <div className="flex items-center gap-2 mb-4 pb-3 border-b border-border">
        <div className="p-2 bg-gray-500/20 text-gray-300 rounded-xl">
          <Settings className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-lg font-bold">Android 15 Settings</h1>
          <p className="text-xs text-muted-foreground">NexusOS System & AI Configuration</p>
        </div>
      </div>

      <div className="flex flex-col gap-4 pb-4">
        {/* Material You Accents */}
        <div className="bg-[#1a1f2c] p-4 rounded-2xl border border-border">
          <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-3 flex items-center gap-1.5">
            <Palette className="w-4 h-4 text-emerald-400" /> Material You Dynamic Theme
          </h3>
          <div className="grid grid-cols-1 gap-2">
            {accents.map((acc) => (
              <button
                key={acc.id}
                onClick={() => onSetThemeAccent(acc.id)}
                className={`p-3 rounded-xl border flex items-center justify-between transition-all ${
                  themeAccent === acc.id ? 'bg-[#222838] border-emerald-500' : 'bg-[#10131b] border-border hover:border-gray-600'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-5 h-5 rounded-full ${acc.color}`} />
                  <span className="text-xs font-semibold text-foreground">{acc.name}</span>
                </div>
                {themeAccent === acc.id && <Check className="w-4 h-4 text-emerald-400" />}
              </button>
            ))}
          </div>
        </div>

        {/* AI Engine Status */}
        <div className="bg-[#1a1f2c] p-4 rounded-2xl border border-border flex flex-col gap-3">
          <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
            <Cpu className="w-4 h-4 text-emerald-400" /> AI Neural Copilot Engine
          </h3>
          <div className="bg-[#10131b] p-3 rounded-xl border border-border flex items-center justify-between text-xs">
            <div>
              <p className="font-semibold text-foreground">Gemini 3.6 Flash & Veo 3.1</p>
              <p className="text-[10px] text-emerald-400 mt-0.5">● Fully Active & Server-Connected</p>
            </div>
            <Sparkles className="w-5 h-5 text-emerald-400" />
          </div>
        </div>

        {/* System Info */}
        <div className="bg-[#1a1f2c] p-4 rounded-2xl border border-border flex flex-col gap-2 text-xs">
          <h3 className="font-bold text-muted-foreground uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <Smartphone className="w-4 h-4 text-blue-400" /> System Specifications
          </h3>
          <div className="flex justify-between py-1 border-b border-border">
            <span className="text-muted-foreground">OS Version</span>
            <span className="font-semibold">Android 15 (Nexus Edition v15.4)</span>
          </div>
          <div className="flex justify-between py-1 border-b border-border">
            <span className="text-muted-foreground">Security Patch</span>
            <span className="font-semibold">August 2026</span>
          </div>
          <div className="flex justify-between py-1">
            <span className="text-muted-foreground">Virtual RAM</span>
            <span className="font-semibold">16 GB + 8 GB AI Swap</span>
          </div>
        </div>
      </div>
    </div>
  );
}
