import React, { useEffect, useRef, useState } from 'react';
import { Trash2Icon, PlusIcon, MinusIcon } from 'lucide-react';
import { Round } from '../types';
interface RoundConfigRowProps {
  round: Round;
  index: number;
  onChange: (id: string, patch: Partial<Round>) => void;
  onDelete: (id: string) => void;
}
export const RoundConfigRow = React.memo(function RoundConfigRow({
  round,
  index,
  onChange,
  onDelete
}: RoundConfigRowProps) {
  const [draft, setDraft] = useState(() => ({
    word: round.word,
    hint1: round.hint1,
    hint2: round.hint2 ?? '',
    hint3: round.hint3 ?? ''
  }));
  const [showExtra, setShowExtra] = useState(!!(round.hint2 || round.hint3));
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setDraft({
      word: round.word,
      hint1: round.hint1,
      hint2: round.hint2 ?? '',
      hint3: round.hint3 ?? ''
    });
  }, [round.hint1, round.hint2, round.hint3, round.word]);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      const patch: Partial<Round> = {};
      if (draft.word !== round.word) patch.word = draft.word;
      if (draft.hint1 !== round.hint1) patch.hint1 = draft.hint1;
      if (draft.hint2 !== (round.hint2 ?? '')) patch.hint2 = draft.hint2;
      if (draft.hint3 !== (round.hint3 ?? '')) patch.hint3 = draft.hint3;
      if (Object.keys(patch).length > 0) onChange(round.id, patch);
    }, 120);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [draft, onChange, round.hint1, round.hint2, round.hint3, round.id, round.word]);

  const flushChanges = () => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = null;
    const patch: Partial<Round> = {};
    if (draft.word !== round.word) patch.word = draft.word;
    if (draft.hint1 !== round.hint1) patch.hint1 = draft.hint1;
    if (draft.hint2 !== (round.hint2 ?? '')) patch.hint2 = draft.hint2;
    if (draft.hint3 !== (round.hint3 ?? '')) patch.hint3 = draft.hint3;
    if (Object.keys(patch).length > 0) onChange(round.id, patch);
  };
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
            value={draft.word}
            onChange={(e) =>
            setDraft((d) => ({
              ...d,
              word: e.target.value
            }))
            }
            onBlur={flushChanges}
            placeholder="e.g. Jollibee"
            className="w-full rounded-xl bg-white/15 border border-white/20 px-4 py-3 text-white placeholder-white/40 text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-accent" />
          
        </div>
        <div>
          <label className="block text-xs font-bold uppercase tracking-wide text-white/70 mb-1">
            Hint
          </label>
          <input
            value={draft.hint1}
            onChange={(e) =>
            setDraft((d) => ({
              ...d,
              hint1: e.target.value
            }))
            }
            onBlur={flushChanges}
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
            value={draft.hint2}
            onChange={(e) =>
            setDraft((d) => ({
              ...d,
              hint2: e.target.value
            }))
            }
            onBlur={flushChanges}
            placeholder="Second hint"
            className="w-full rounded-xl bg-white/15 border border-white/20 px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-accent" />
          
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-wide text-white/70 mb-1">
              Hint 3 (optional)
            </label>
            <input
            value={draft.hint3}
            onChange={(e) =>
            setDraft((d) => ({
              ...d,
              hint3: e.target.value
            }))
            }
            onBlur={flushChanges}
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

  });