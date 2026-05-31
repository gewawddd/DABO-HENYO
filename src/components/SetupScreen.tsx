import React from 'react';
import { motion } from 'framer-motion';
import {
  PlusIcon,
  ShuffleIcon,
  PlayIcon,
  SettingsIcon,
  ListChecksIcon,
  SparklesIcon } from
'lucide-react';
import { Round, GameSettings } from '../types';
import { RoundConfigRow } from './RoundConfigRow';
interface SetupScreenProps {
  settings: GameSettings;
  rounds: Round[];
  onSettingsChange: (patch: Partial<GameSettings>) => void;
  onRoundChange: (id: string, patch: Partial<Round>) => void;
  onAddRound: () => void;
  onDeleteRound: (id: string) => void;
  onRandomize: () => void;
  onStart: () => void;
}
export function SetupScreen({
  settings,
  rounds,
  onSettingsChange,
  onRoundChange,
  onAddRound,
  onDeleteRound,
  onRandomize,
  onStart
}: SetupScreenProps) {
  const validRounds = rounds.filter((r) => r.word.trim().length > 0).length;
  const canStart = validRounds > 0;
  return (
    <main className="hsc-backdrop min-h-full w-full px-4 py-8 sm:px-8 sm:py-12">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{
            opacity: 0,
            y: -20
          }}
          animate={{
            opacity: 1,
            y: 0
          }}
          className="text-center mb-8 sm:mb-12">
          
          <div className="inline-flex items-center gap-2 rounded-full bg-accent text-ink font-bold px-4 py-1.5 text-sm mb-4 shadow-lg">
            <SparklesIcon size={16} aria-hidden="true" />
            FAMILY GAME NIGHT
          </div>
          <h1 className="font-display text-5xl sm:text-7xl text-white drop-shadow-lg leading-none">
            HENYO <span className="text-accent">SA</span> CUADRA
          </h1>
          <p className="text-white/70 mt-3 text-lg">
            Pinoy Henyo-style team showdown — hosted by you!
          </p>
        </motion.div>

        {/* Game Settings */}
        <motion.section
          initial={{
            opacity: 0,
            y: 20
          }}
          animate={{
            opacity: 1,
            y: 0
          }}
          transition={{
            delay: 0.05
          }}
          className="hsc-glass-strong rounded-3xl p-5 sm:p-8 mb-6"
          aria-labelledby="settings-heading">
          
          <h2
            id="settings-heading"
            className="flex items-center gap-2 font-display text-2xl sm:text-3xl text-white mb-5">
            
            <SettingsIcon className="text-accent" aria-hidden="true" />
            Game Settings
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="teamA"
                className="block text-xs font-bold uppercase tracking-wide text-teamA-light mb-1">
                
                Team A Name
              </label>
              <input
                id="teamA"
                value={settings.teamAName}
                onChange={(e) =>
                onSettingsChange({
                  teamAName: e.target.value
                })
                }
                className="w-full rounded-xl bg-white/15 border-2 border-teamA/60 px-4 py-3 text-white text-lg font-bold focus:outline-none focus:ring-2 focus:ring-teamA-light" />
              
            </div>
            <div>
              <label
                htmlFor="teamB"
                className="block text-xs font-bold uppercase tracking-wide text-teamB-light mb-1">
                
                Team B Name
              </label>
              <input
                id="teamB"
                value={settings.teamBName}
                onChange={(e) =>
                onSettingsChange({
                  teamBName: e.target.value
                })
                }
                className="w-full rounded-xl bg-white/15 border-2 border-teamB/60 px-4 py-3 text-white text-lg font-bold focus:outline-none focus:ring-2 focus:ring-teamB-light" />
              
            </div>
            <div>
              <label
                htmlFor="numRounds"
                className="block text-xs font-bold uppercase tracking-wide text-white/70 mb-1">
                
                Number of Rounds
              </label>
              <input
                id="numRounds"
                type="number"
                min={1}
                value={settings.numRounds}
                onChange={(e) =>
                onSettingsChange({
                  numRounds: Math.max(1, Number(e.target.value) || 1)
                })
                }
                className="w-full rounded-xl bg-white/15 border border-white/20 px-4 py-3 text-white text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-accent" />
              
            </div>
            <div>
              <label
                htmlFor="seconds"
                className="block text-xs font-bold uppercase tracking-wide text-white/70 mb-1">
                
                Seconds per Round
              </label>
              <input
                id="seconds"
                type="number"
                min={5}
                value={settings.secondsPerRound}
                onChange={(e) =>
                onSettingsChange({
                  secondsPerRound: Math.max(5, Number(e.target.value) || 5)
                })
                }
                className="w-full rounded-xl bg-white/15 border border-white/20 px-4 py-3 text-white text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-accent" />
              
            </div>
          </div>
        </motion.section>

        {/* Round Configuration */}
        <motion.section
          initial={{
            opacity: 0,
            y: 20
          }}
          animate={{
            opacity: 1,
            y: 0
          }}
          transition={{
            delay: 0.1
          }}
          className="hsc-glass-strong rounded-3xl p-5 sm:p-8 mb-6"
          aria-labelledby="rounds-heading">
          
          <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
            <h2
              id="rounds-heading"
              className="flex items-center gap-2 font-display text-2xl sm:text-3xl text-white">
              
              <ListChecksIcon className="text-accent" aria-hidden="true" />
              Round Configuration
            </h2>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={onRandomize}
                disabled={rounds.length < 2}
                className="inline-flex items-center gap-1.5 rounded-xl bg-white/15 hover:bg-white/25 disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold px-4 py-2.5 transition-colors">
                
                <ShuffleIcon size={18} aria-hidden="true" />
                Randomize Order
              </button>
              <button
                type="button"
                onClick={onAddRound}
                className="inline-flex items-center gap-1.5 rounded-xl bg-teamA hover:bg-teamA-dark text-white font-semibold px-4 py-2.5 transition-colors">
                
                <PlusIcon size={18} aria-hidden="true" />
                Add Round
              </button>
            </div>
          </div>

          <div className="space-y-4">
            {rounds.map((round, i) =>
            <RoundConfigRow
              key={round.id}
              round={round}
              index={i}
              onChange={onRoundChange}
              onDelete={onDeleteRound} />

            )}
            {rounds.length === 0 &&
            <p className="text-center text-white/60 py-8">
                No rounds yet. Add your first word to get started!
              </p>
            }
          </div>
        </motion.section>

        {/* Start */}
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
            delay: 0.15
          }}
          className="flex flex-col items-center gap-3">
          
          <button
            type="button"
            onClick={onStart}
            disabled={!canStart}
            className="inline-flex items-center gap-3 rounded-2xl bg-accent hover:bg-accent-dark disabled:opacity-40 disabled:cursor-not-allowed text-ink font-display text-2xl sm:text-3xl px-10 py-4 shadow-xl transition-all hover:scale-105 active:scale-95">
            
            <PlayIcon size={28} aria-hidden="true" fill="currentColor" />
            START GAME
          </button>
          {!canStart &&
          <p className="text-white/60 text-sm">
              Add at least one word to start the game.
            </p>
          }
        </motion.div>
      </div>
    </main>);

}