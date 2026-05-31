import React from 'react';
import { PlusIcon, MinusIcon } from 'lucide-react';
import { Team } from '../types';
interface ScoreboardProps {
  teamAName: string;
  teamBName: string;
  scoreA: number;
  scoreB: number;
  currentTeam: Team;
  onAdjust: (team: Team, delta: number) => void;
}
interface TeamCardProps {
  name: string;
  score: number;
  active: boolean;
  variant: 'A' | 'B';
  onAdjust: (delta: number) => void;
}
function TeamCard({ name, score, active, variant, onAdjust }: TeamCardProps) {
  const ring = variant === 'A' ? 'ring-teamA' : 'ring-teamB';
  const bg = variant === 'A' ? 'bg-teamA' : 'bg-teamB';
  const label = variant === 'A' ? 'text-teamA-light' : 'text-teamB-light';
  return (
    <div
      className={`hsc-glass rounded-3xl p-5 sm:p-6 flex flex-col items-center transition-all ${active ? `ring-4 ${ring} scale-[1.02]` : 'opacity-90'}`}>
      
      <div className={`text-xs font-bold uppercase tracking-widest ${label}`}>
        Team {variant} {active && '• Turn'}
      </div>
      <div className="font-display text-2xl sm:text-3xl text-white text-center leading-tight mt-1 break-words max-w-full">
        {name}
      </div>
      <div className="font-display text-6xl sm:text-7xl text-accent tabular-nums my-2">
        {score}
      </div>
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => onAdjust(-1)}
          aria-label={`Subtract a point from ${name}`}
          className="inline-flex items-center justify-center rounded-xl bg-white/15 hover:bg-white/25 text-white w-12 h-12 transition-colors">
          
          <MinusIcon size={22} aria-hidden="true" />
        </button>
        <button
          type="button"
          onClick={() => onAdjust(1)}
          aria-label={`Add a point to ${name}`}
          className={`inline-flex items-center justify-center rounded-xl ${bg} hover:opacity-90 text-white w-12 h-12 transition-opacity`}>
          
          <PlusIcon size={22} aria-hidden="true" />
        </button>
      </div>
    </div>);

}
export function Scoreboard({
  teamAName,
  teamBName,
  scoreA,
  scoreB,
  currentTeam,
  onAdjust
}: ScoreboardProps) {
  return (
    <div className="grid grid-cols-2 gap-4">
      <TeamCard
        name={teamAName}
        score={scoreA}
        active={currentTeam === 'A'}
        variant="A"
        onAdjust={(d) => onAdjust('A', d)} />
      
      <TeamCard
        name={teamBName}
        score={scoreB}
        active={currentTeam === 'B'}
        variant="B"
        onAdjust={(d) => onAdjust('B', d)} />
      
    </div>);

}