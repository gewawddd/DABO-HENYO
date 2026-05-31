import React from 'react';
import { motion } from 'framer-motion';
import { PlayIcon, PauseIcon, RotateCcwIcon } from 'lucide-react';
interface TimerDisplayProps {
  secondsLeft: number;
  totalSeconds: number;
  running: boolean;
  onStart: () => void;
  onPause: () => void;
  onReset: () => void;
}
function format(s: number): string {
  const m = Math.floor(s / 60);
  const sec = s % 60;
  return `${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
}
export function TimerDisplay({
  secondsLeft,
  totalSeconds,
  running,
  onStart,
  onPause,
  onReset
}: TimerDisplayProps) {
  const isUp = secondsLeft <= 0;
  const low = !isUp && secondsLeft <= 10;
  const colorClass = isUp ?
  'text-teamB' :
  low ?
  'text-teamB-light' :
  'text-accent';
  return (
    <div className="hsc-glass rounded-3xl p-5 sm:p-6 flex flex-col items-center">
      <motion.div
        key={isUp ? 'up' : 'run'}
        className={`font-display tabular-nums text-6xl sm:text-8xl leading-none ${colorClass} ${low && running ? 'hsc-pulse' : ''}`}>
        
        {isUp ? "TIME'S UP!" : format(secondsLeft)}
      </motion.div>
      <div className="text-white/50 text-sm mt-1">
        of {format(totalSeconds)}
      </div>

      <div className="flex gap-2 mt-4">
        {!running ?
        <button
          type="button"
          onClick={onStart}
          disabled={isUp}
          className="inline-flex items-center gap-1.5 rounded-xl bg-teamA hover:bg-teamA-dark disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold px-5 py-2.5 transition-colors">
          
            <PlayIcon size={18} aria-hidden="true" fill="currentColor" />
            {secondsLeft < totalSeconds && secondsLeft > 0 ? 'Resume' : 'Start'}
          </button> :

        <button
          type="button"
          onClick={onPause}
          className="inline-flex items-center gap-1.5 rounded-xl bg-white/20 hover:bg-white/30 text-white font-bold px-5 py-2.5 transition-colors">
          
            <PauseIcon size={18} aria-hidden="true" fill="currentColor" />
            Pause
          </button>
        }
        <button
          type="button"
          onClick={onReset}
          className="inline-flex items-center gap-1.5 rounded-xl bg-white/15 hover:bg-white/25 text-white font-bold px-5 py-2.5 transition-colors">
          
          <RotateCcwIcon size={18} aria-hidden="true" />
          Reset
        </button>
      </div>
    </div>);

}