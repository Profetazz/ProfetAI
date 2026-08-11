import { ChevronLeft, Home, Square } from 'lucide-react';
import { AppId } from '../types';

interface NavigationBarProps {
  currentApp: AppId;
  onNavigate: (app: AppId) => void;
}

export default function NavigationBar({ currentApp, onNavigate }: NavigationBarProps) {
  return (
    <div className="h-12 px-6 flex items-center justify-between text-foreground bg-black/30 backdrop-blur-md z-50 select-none">
      <button 
        onClick={() => onNavigate('home')}
        className="p-2 hover:bg-white/10 rounded-full transition-colors active:scale-95"
        title="Back"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      {/* Android 15 Gesture Pill */}
      <div 
        onClick={() => onNavigate('home')}
        className="w-32 h-1.5 bg-white/40 hover:bg-white/70 rounded-full cursor-pointer transition-all"
        title="Home"
      />

      <div className="flex items-center gap-1">
        <button 
          onClick={() => onNavigate('home')}
          className="p-2 hover:bg-white/10 rounded-full transition-colors active:scale-95"
          title="Home Screen"
        >
          <Home className="w-4 h-4" />
        </button>
        <button 
          onClick={() => onNavigate('file-explorer')}
          className="p-2 hover:bg-white/10 rounded-full transition-colors active:scale-95"
          title="Recent Apps"
        >
          <Square className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
