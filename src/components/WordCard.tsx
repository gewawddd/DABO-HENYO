import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { EyeIcon, EyeOffIcon, LightbulbIcon, XIcon } from 'lucide-react';
import { Round } from '../types';
interface WordCardProps {
  round: Round | undefined;
  wordRevealed: boolean;
  hintsShown: number;
  onToggleWord: () => void;
  onRevealHint: () => void;
}
export function WordCard({
  round,
  wordRevealed,
  hintsShown,
  onToggleWord,
  onRevealHint
}: WordCardProps) {
  const hints = round ?
  [round.hint1, round.hint2, round.hint3].filter(
    (h) => h && h.trim().length > 0
  ) as string[] :
  [];
  const moreHints = hintsShown < hints.length;
  return (
    <div className="hsc-glass-strong rounded-3xl p-6 sm:p-10 flex flex-col items-center">
      <div className="text-white/60 text-sm font-bold uppercase tracking-widest mb-4">
        The Word
      </div>

      <div className="relative w-full min-h-[120px] sm:min-h-[160px] flex items-center justify-center">
        <AnimatePresence mode="wait">
          {wordRevealed && round ?
          <motion.div
            key="word"
            initial={{
              opacity: 0,
              scale: 0.6,
              rotateX: -40
            }}
            animate={{
              opacity: 1,
              scale: 1,
              rotateX: 0
            }}
            exit={{
              opacity: 0,
              scale: 0.6
            }}
            className="font-display text-6xl sm:text-8xl md:text-9xl lg:text-[7.5rem] text-accent text-center break-words drop-shadow-lg">
            
              {round.word.toUpperCase()}
            </motion.div> :

          <motion.div
            key="hidden"
            initial={{
              opacity: 0
            }}
            animate={{
              opacity: 1
            }}
            exit={{
              opacity: 0
            }}
            className="font-display text-4xl sm:text-6xl text-white/30 text-center tracking-wider">
            
              WORD HIDDEN
            </motion.div>
          }
        </AnimatePresence>
      </div>

      <button
        type="button"
        onClick={onToggleWord}
        disabled={!round}
        className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-white/20 hover:bg-white/30 disabled:opacity-40 text-white font-display text-xl sm:text-2xl px-8 py-3 transition-colors">
        
        {wordRevealed ?
        <EyeOffIcon aria-hidden="true" /> :

        <EyeIcon aria-hidden="true" />
        }
        {wordRevealed ? 'HIDE WORD' : 'SHOW WORD'}
      </button>
      <p className="text-white/40 text-xs mt-2">
        Host only — keep this hidden from teams!
      </p>

      {/* Hints */}
      <div className="w-full mt-6 pt-6 border-t border-white/15 flex flex-col items-center">
        <button
          type="button"
          onClick={onRevealHint}
          disabled={!moreHints}
          className="inline-flex items-center gap-2 rounded-2xl bg-accent hover:bg-accent-dark disabled:opacity-40 disabled:cursor-not-allowed text-ink font-bold text-lg px-6 py-3 transition-colors">
          
          <LightbulbIcon size={20} aria-hidden="true" />
          {hintsShown === 0 ?
          'REVEAL HINT' :
          moreHints ?
          'REVEAL NEXT HINT' :
          'NO MORE HINTS'}
        </button>

        <div className="w-full mt-4 space-y-2">
          <AnimatePresence>
            {hints.slice(0, hintsShown).map((hint, i) =>
            <motion.div
              key={i}
              initial={{
                opacity: 0,
                x: -20
              }}
              animate={{
                opacity: 1,
                x: 0
              }}
              exit={{
                opacity: 0
              }}
              className="hsc-glass rounded-xl px-4 py-3 text-center">
              
                <span className="text-accent font-bold mr-2">
                  Hint {i + 1}:
                </span>
                <span className="text-white text-lg sm:text-xl font-semibold">
                  {hint}
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>);

}