import React, { useState } from 'react';
import { Trash2Icon, PlusIcon, MinusIcon } from 'lucide-react';
import { Round } from '../types';
interface RoundConfigRowProps {
  round: Round;
  index: number;
  onChange: (id: string, patch: Partial<Round>) => void;
  onDelete: (id: string) => void;
}
export function RoundConfigRow({
  round,
  index,
  onChange,
  onDelete
}: RoundConfigRowProps) {
  const [showExtra, setShowExtra] = useState(!!(round.hint2 || round.hint3));
  return (
    <div className="hsc-glass rounded-2xl p-4 sm:p-5">
      <div className="flex items-center justify-between mb-3">
        <span className="font-display text-accent text-xl sm:text-2xl">
          ROUND {index + 1}
        </span>
        <button
          type="button"
          onClick={() => onDelete(round.id)}
          aria-label={`Delete round ${index + 1}`}
          className="flex items-center gap-1.5 rounded-xl bg-teamB/80 hover:bg-teamB text-white text-sm font-semibold px-3 py-2 transition-colors">
          
          <Trash2Icon size={16} aria-hidden="true" />
          <span className="hidden sm:inline">Delete</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wide text-white/70 mb-1">
            Word
          </label>
          <input
            value={round.word}
            onChange={(e) =>
            onChange(round.id, {
              word: e.target.value
            })
            }
            placeholder="e.g. Jollibee"
            className="w-full rounded-xl bg-white/15 border border-white/20 px-4 py-3 text-white placeholder-white/40 text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-accent" />
          
        </div>
        <div>
          <label className="block text-xs font-bold uppercase tracking-wide text-white/70 mb-1">
            Hint
          </label>
          <input
            value={round.hint1}
            onChange={(e) =>
            onChange(round.id, {
              hint1: e.target.value
            })
            }
            placeholder="e.g. Fast Food"
            className="w-full rounded-xl bg-white/15 border border-white/20 px-4 py-3 text-white placeholder-white/40 text-lg focus:outline-none focus:ring-2 focus:ring-accent" />
          
        </div>
      </div>

      {showExtra &&
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wide text-white/70 mb-1">
              Hint 2 (optional)
            </label>
            <input
            value={round.hint2 ?? ''}
            onChange={(e) =>
            onChange(round.id, {
              hint2: e.target.value
            })
            }
            placeholder="Second hint"
            className="w-full rounded-xl bg-white/15 border border-white/20 px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-accent" />
          
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-wide text-white/70 mb-1">
              Hint 3 (optional)
            </label>
            <input
            value={round.hint3 ?? ''}
            onChange={(e) =>
            onChange(round.id, {
              hint3: e.target.value
            })
            }
            placeholder="Third hint"
            className="w-full rounded-xl bg-white/15 border border-white/20 px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-accent" />
          
          </div>
        </div>
      }

      <button
        type="button"
        onClick={() => setShowExtra((v) => !v)}
        className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-accent hover:text-accent-dark transition-colors">
        
        {showExtra ?
        <MinusIcon size={15} aria-hidden="true" /> :

        <PlusIcon size={15} aria-hidden="true" />
        }
        {showExtra ? 'Hide extra hints' : 'Add more hints'}
      </button>
    </div>);

}