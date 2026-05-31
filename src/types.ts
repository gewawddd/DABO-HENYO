export interface Round {
  id: string;
  word: string;
  hint1: string;
  hint2?: string;
  hint3?: string;
}

export type Team = 'A' | 'B';

export type Phase = 'setup' | 'game' | 'winner';

export interface GameSettings {
  teamAName: string;
  teamBName: string;
  numRounds: number;
  secondsPerRound: number;
}

export interface RoundResult {
  team: Team;
  outcome: 'correct' | 'wrong' | 'skip';
  elapsed: number;
}

export interface GameStats {
  totalRounds: number;
  correct: number;
  wrong: number;
  fastestRound: number | null;
}