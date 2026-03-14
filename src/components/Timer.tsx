import React, { useState, useEffect } from 'react';
import { Timer as TimerIcon, AlertCircle } from 'lucide-react';
import { cn } from '../lib/utils';

interface TimerProps {
  initialMinutes: number;
  onTimeUp: () => void;
  isActive: boolean;
}

export const Timer: React.FC<TimerProps> = ({ initialMinutes, onTimeUp, isActive }) => {
  const [seconds, setSeconds] = useState(initialMinutes * 60);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isActive && seconds > 0) {
      interval = setInterval(() => {
        setSeconds((prev) => prev - 1);
      }, 1000);
    } else if (seconds === 0) {
      onTimeUp();
    }

    return () => clearInterval(interval);
  }, [isActive, seconds, onTimeUp]);

  const formatTime = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const isLowTime = seconds < 30;

  return (
    <div className={cn(
      "flex items-center gap-2 px-4 py-2 rounded-full font-mono font-bold transition-all",
      isLowTime ? "bg-rose-100 text-rose-600 animate-pulse" : "bg-slate-100 text-slate-600"
    )}>
      {isLowTime ? <AlertCircle size={18} /> : <TimerIcon size={18} />}
      <span>{formatTime(seconds)}</span>
    </div>
  );
};
