import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Confetti from 'react-confetti';
import {
  TrophyIcon,
  RotateCcwIcon,
  SparklesIcon,
  ListIcon,
  CheckIcon,
  XIcon,
  ZapIcon } from
'lucide-react';
import { GameSettings, GameStats, Team } from '../types';
interface WinnerScreenProps {
  settings: GameSettings;
  scoreA: number;
  scoreB: number;
  stats: GameStats;
  onPlayAgain: () => void;
  onNewGame: () => void;
}
function format(s: number | null): string {
  if (s === null) return '—';
  const m = Math.floor(s / 60);
  const sec = s % 60;
  return `${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
}
export function WinnerScreen({
  settings,
  scoreA,
  scoreB,
  stats,
  onPlayAgain,
  onNewGame
}: WinnerScreenProps) {
  const [size, setSize] = useState({
    w: window.innerWidth,
    h: window.innerHeight
  });
  const tie = scoreA === scoreB;
  const winner: Team = scoreA >= scoreB ? 'A' : 'B';
  const winnerName = winner === 'A' ? settings.teamAName : settings.teamBName;
  const winnerColor = winner === 'A' ? 'text-teamA-light' : 'text-teamB-light';
  useEffect(() => {
    const onResize = () =>
    setSize({
      w: window.innerWidth,
      h: window.innerHeight
    });
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);
  const statItems = [
  {
    icon: ListIcon,
    label: 'Total Rounds',
    value: String(stats.totalRounds)
  },
  {
    icon: CheckIcon,
    label: 'Correct Answers',
    value: String(stats.correct)
  },
  {
    icon: XIcon,
    label: 'Wrong Answers',
    value: String(stats.wrong)
  },
  {
    icon: ZapIcon,
    label: 'Fastest Round',
    value: format(stats.fastestRound)
  },
  {
    icon: TrophyIcon,
    label: 'Winning Team',
    value: tie ? 'Tie' : winnerName
  }];

  return (
    <main className="hsc-backdrop min-h-full w-full px-4 py-10 sm:px-8 sm:py-16 flex items-center hsc-tv-stage">
      {!tie &&
      <Confetti
        width={size.w}
        height={size.h}
        numberOfPieces={350}
        recycle={false}
        gravity={0.25} />

      }
      <div className="max-w-5xl mx-auto w-full text-center hsc-tv-max">
        <motion.div
          initial={{
            scale: 0,
            rotate: -20
          }}
          animate={{
            scale: 1,
            rotate: 0
          }}
          transition={{
            type: 'spring',
            stiffness: 200,
            damping: 14
          }}
          className="inline-flex flex-col items-center">
          
          <TrophyIcon
            size={80}
            className="text-accent drop-shadow-lg"
            aria-hidden="true" />
          
          <div className="inline-flex items-center gap-2 rounded-full bg-accent text-ink font-bold px-4 py-1.5 text-sm mt-4">
            <SparklesIcon size={16} aria-hidden="true" />
            {tie ? 'WHAT A MATCH' : 'CHAMPION'}
          </div>
        </motion.div>

        <motion.h1
          initial={{
            opacity: 0,
            y: 30
          }}
          animate={{
            opacity: 1,
            y: 0
          }}
          transition={{
            delay: 0.2
          }}
          className="font-display text-5xl sm:text-7xl text-white mt-4 drop-shadow-lg">
          
          {tie ? "IT'S A TIE!" : 'WINNER'}
        </motion.h1>

        {!tie &&
        <motion.div
          initial={{
            opacity: 0,
            scale: 0.8
          }}
          animate={{
            opacity: 1,
            scale: 1
          }}
          transition={{
            delay: 0.35
          }}
          className={`font-display text-4xl sm:text-6xl mt-2 ${winnerColor}`}>
          
            {winnerName}
          </motion.div>
        }

        {/* Final score */}
        <motion.div
          initial={{
            opacity: 0,
            y: 20
          }}
          animate={{
            opacity: 1,
            y: 0
          }}
          transition={{
            delay: 0.45
          }}
          className="grid grid-cols-2 gap-4 mt-8">
          
          <div className="hsc-glass-strong rounded-3xl p-6 ring-2 ring-teamA">
            <div className="text-teamA-light font-bold uppercase tracking-widest text-sm">
              {settings.teamAName}
            </div>
            <div className="font-display text-6xl sm:text-7xl text-white tabular-nums">
              {scoreA}
            </div>
          </div>
          <div className="hsc-glass-strong rounded-3xl p-6 ring-2 ring-teamB">
            <div className="text-teamB-light font-bold uppercase tracking-widest text-sm">
              {settings.teamBName}
            </div>
            <div className="font-display text-6xl sm:text-7xl text-white tabular-nums">
              {scoreB}
            </div>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{
            opacity: 0,
            y: 20
          }}
          animate={{
            opacity: 1,
            y: 0
          }}
          transition={{
            delay: 0.55
          }}
          className="hsc-glass rounded-3xl p-5 sm:p-6 mt-6">
          
          <h2 className="font-display text-2xl text-accent mb-4">
            Game Statistics
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {statItems.map((s) => {
              const Icon = s.icon;
              return (
                <div
                  key={s.label}
                  className="hsc-glass rounded-2xl p-4 flex flex-col items-center">
                  
                  <Icon
                    size={22}
                    className="text-accent mb-1"
                    aria-hidden="true" />
                  
                  <div className="text-white/60 text-xs font-semibold uppercase tracking-wide text-center">
                    {s.label}
                  </div>
                  <div className="font-display text-xl sm:text-2xl text-white mt-1 text-center break-words">
                    {s.value}
                  </div>
                </div>);

            })}
          </div>
        </motion.div>

        {/* Actions */}
        <motion.div
          initial={{
            opacity: 0,
            y: 20
          }}
          animate={{
            opacity: 1,
            y: 0
          }}
          transition={{
            delay: 0.65
          }}
          className="flex flex-wrap justify-center gap-3 mt-8">
          
          <button
            type="button"
            onClick={onPlayAgain}
            className="inline-flex items-center gap-2 rounded-2xl bg-accent hover:bg-accent-dark text-ink font-display text-xl px-8 py-3.5 transition-all hover:scale-105 active:scale-95">
            
            <RotateCcwIcon size={22} aria-hidden="true" />
            PLAY AGAIN
          </button>
          <button
            type="button"
            onClick={onNewGame}
            className="inline-flex items-center gap-2 rounded-2xl bg-white/15 hover:bg-white/25 text-white font-display text-xl px-8 py-3.5 transition-colors">
            
            NEW GAME
          </button>
        </motion.div>
      </div>
    </main>);

}