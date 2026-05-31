import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import {
  CheckCircle2Icon,
  XCircleIcon,
  SkipForwardIcon,
  ChevronRightIcon,
  FlagIcon } from
'lucide-react';
import { Round, Team, GameSettings } from '../types';
import { TimerDisplay } from './TimerDisplay';
import { Scoreboard } from './Scoreboard';
import { WordCard } from './WordCard';
interface GameScreenProps {
  settings: GameSettings;
  rounds: Round[];
  currentRoundIndex: number;
  currentTeam: Team;
  scoreA: number;
  scoreB: number;
  onAdjustScore: (team: Team, delta: number) => void;
  onOutcome: (outcome: 'correct' | 'wrong', elapsed: number) => void;
  onSkip: (elapsed: number) => void;
  onNextRound: (elapsed: number) => void;
  onEndGame: () => void;
}
export function GameScreen({
  settings,
  rounds,
  currentRoundIndex,
  currentTeam,
  scoreA,
  scoreB,
  onAdjustScore,
  onOutcome,
  onSkip,
  onNextRound,
  onEndGame
}: GameScreenProps) {
  const round = rounds[currentRoundIndex];
  const total = settings.secondsPerRound;
  const [secondsLeft, setSecondsLeft] = useState(total);
  const [running, setRunning] = useState(false);
  const [wordRevealed, setWordRevealed] = useState(false);
  const [hintsShown, setHintsShown] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  // Reset per-round state when the round changes
  useEffect(() => {
    setSecondsLeft(total);
    setRunning(false);
    setWordRevealed(false);
    setHintsShown(0);
  }, [currentRoundIndex, total]);
  // Countdown
  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => {
        setSecondsLeft((s) => {
          if (s <= 1) {
            setRunning(false);
            return 0;
          }
          return s - 1;
        });
      }, 1000);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [running]);
  const elapsed = total - secondsLeft;
  const teamName = currentTeam === 'A' ? settings.teamAName : settings.teamBName;
  const isLast = currentRoundIndex >= rounds.length - 1;
  return (
    <main className="hsc-backdrop min-h-full w-full px-4 py-6 sm:px-8 sm:py-8">
      <div className="max-w-6xl mx-auto">
        {/* Top bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
          <div className="hsc-glass rounded-2xl px-5 py-3">
            <div className="text-white/60 text-xs font-bold uppercase tracking-widest">
              Round
            </div>
            <div className="font-display text-2xl sm:text-3xl text-white">
              {currentRoundIndex + 1} <span className="text-white/40">OF</span>{' '}
              {rounds.length}
            </div>
          </div>

          <motion.div
            key={currentTeam}
            initial={{
              scale: 0.9,
              opacity: 0
            }}
            animate={{
              scale: 1,
              opacity: 1
            }}
            className={`rounded-2xl px-6 py-3 text-center ${currentTeam === 'A' ? 'bg-teamA' : 'bg-teamB'}`}>
            
            <div className="text-white/80 text-xs font-bold uppercase tracking-widest">
              Current Team Turn
            </div>
            <div className="font-display text-2xl sm:text-3xl text-white">
              {teamName}
            </div>
          </motion.div>

          <button
            type="button"
            onClick={onEndGame}
            className="inline-flex items-center gap-1.5 rounded-2xl bg-white/15 hover:bg-white/25 text-white font-bold px-5 py-3 transition-colors">
            
            <FlagIcon size={18} aria-hidden="true" />
            End Game
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left column: timer + scoreboard */}
          <div className="lg:col-span-1 space-y-6 order-2 lg:order-1">
            <TimerDisplay
              secondsLeft={secondsLeft}
              totalSeconds={total}
              running={running}
              onStart={() => setRunning(true)}
              onPause={() => setRunning(false)}
              onReset={() => {
                setRunning(false);
                setSecondsLeft(total);
              }} />
            
            <Scoreboard
              teamAName={settings.teamAName}
              teamBName={settings.teamBName}
              scoreA={scoreA}
              scoreB={scoreB}
              currentTeam={currentTeam}
              onAdjust={onAdjustScore} />
            
          </div>

          {/* Right column: word card + controls */}
          <div className="lg:col-span-2 space-y-6 order-1 lg:order-2">
            <WordCard
              round={round}
              wordRevealed={wordRevealed}
              hintsShown={hintsShown}
              onToggleWord={() => setWordRevealed((v) => !v)}
              onRevealHint={() => setHintsShown((n) => n + 1)} />
            

            {/* Round controls */}
            <div className="hsc-glass rounded-3xl p-5 sm:p-6">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setRunning(false);
                    onOutcome('correct', elapsed);
                  }}
                  className="inline-flex flex-col items-center justify-center gap-1 rounded-2xl bg-teamA hover:bg-teamA-dark text-white font-display text-lg py-4 transition-colors">
                  
                  <CheckCircle2Icon aria-hidden="true" />
                  CORRECT
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setRunning(false);
                    onOutcome('wrong', elapsed);
                  }}
                  className="inline-flex flex-col items-center justify-center gap-1 rounded-2xl bg-teamB hover:bg-teamB-dark text-white font-display text-lg py-4 transition-colors">
                  
                  <XCircleIcon aria-hidden="true" />
                  WRONG
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setRunning(false);
                    onSkip(elapsed);
                  }}
                  className="inline-flex flex-col items-center justify-center gap-1 rounded-2xl bg-white/15 hover:bg-white/25 text-white font-display text-lg py-4 transition-colors">
                  
                  <SkipForwardIcon aria-hidden="true" />
                  SKIP
                </button>
              </div>
              <button
                type="button"
                onClick={() => {
                  setRunning(false);
                  onNextRound(elapsed);
                }}
                className="w-full mt-3 inline-flex items-center justify-center gap-2 rounded-2xl bg-accent hover:bg-accent-dark text-ink font-display text-xl sm:text-2xl py-4 transition-colors hover:scale-[1.01] active:scale-95">
                
                {isLast ? 'FINISH & SEE WINNER' : 'NEXT ROUND'}
                <ChevronRightIcon aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>);

}