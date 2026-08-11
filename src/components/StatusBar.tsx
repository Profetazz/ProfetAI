import { useState, useEffect } from 'react';
import { Wifi, Signal, Battery, Bell } from 'lucide-react';

export default function StatusBar() {
  const [time, setTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-10 px-5 flex items-center justify-between text-xs font-medium select-none z-50 text-foreground bg-black/20 backdrop-blur-md">
      <div className="flex items-center gap-2">
        <span className="font-bold tracking-tight">{time || '09:41'}</span>
        <span className="flex items-center gap-1 text-[10px] bg-emerald-500/20 text-emerald-400 px-1.5 py-0.5 rounded-full">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span> AI Active
        </span>
      </div>
      <div className="flex items-center gap-3">
        <Bell className="w-3.5 h-3.5 opacity-70" />
        <Signal className="w-3.5 h-3.5" />
        <Wifi className="w-3.5 h-3.5" />
        <div className="flex items-center gap-1">
          <Battery className="w-4 h-4 text-emerald-400" />
          <span className="text-[10px]">98%</span>
        </div>
      </div>
    </div>
  );
}
