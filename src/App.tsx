import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useScreenInit } from './useScreenInit';
import {
  Round,
  Team,
  Phase,
  GameSettings,
  RoundResult,
  GameStats } from
'./types';
import { SetupScreen } from './components/SetupScreen';
import { GameScreen } from './components/GameScreen';
import { WinnerScreen } from './components/WinnerScreen';
let idCounter = 0;
const newId = () => `r-${Date.now()}-${idCounter++}`;
const DEFAULT_ROUNDS: Round[] = [
{
  id: newId(),
  word: 'Jollibee',
  hint1: 'Fast Food'
},
{
  id: newId(),
  word: 'Jose Rizal',
  hint1: 'Bayani'
},
{
  id: newId(),
  word: 'Adobo',
  hint1: 'Pagkain'
}];

const DEFAULT_SETTINGS: GameSettings = {
  teamAName: 'Team A',
  teamBName: 'Team B',
  numRounds: 3,
  secondsPerRound: 45
};
export function App() {
  const screenInit = useScreenInit();
  const [phase, setPhase] = useState<Phase>(
    screenInit.phase as Phase ?? 'setup'
  );
  const [settings, setSettings] = useState<GameSettings>(DEFAULT_SETTINGS);
  const [rounds, setRounds] = useState<Round[]>(DEFAULT_ROUNDS);
  const [gameRounds, setGameRounds] = useState<Round[]>(DEFAULT_ROUNDS);
  const [skippedRounds, setSkippedRounds] = useState<Round[]>([]);
  // Active game state
  const [currentRoundIndex, setCurrentRoundIndex] = useState(0);
  const [currentTeam, setCurrentTeam] = useState<Team>('A');
  const [scoreA, setScoreA] = useState(0);
  const [scoreB, setScoreB] = useState(0);
  const [results, setResults] = useState<RoundResult[]>([]);
  // ---- Setup handlers ----
  const updateSettings = (patch: Partial<GameSettings>) =>
  setSettings((s) => ({
    ...s,
    ...patch
  }));
  const updateRound = (id: string, patch: Partial<Round>) =>
  setRounds((rs) =>
  rs.map((r) =>
  r.id === id ?
  {
    ...r,
    ...patch
  } :
  r
  )
  );
  const addRound = () =>
  setRounds((rs) => [
  ...rs,
  {
    id: newId(),
    word: '',
    hint1: ''
  }]
  );
  const deleteRound = (id: string) =>
  setRounds((rs) => rs.filter((r) => r.id !== id));
  const randomize = () =>
  setRounds((rs) => {
    const arr = [...rs];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  });
  const startGame = () => {
    const playable = rounds.filter((r) => r.word.trim().length > 0);
    if (playable.length === 0) return;
    setRounds(playable);
    setGameRounds(playable);
    setSkippedRounds([]);
    setCurrentRoundIndex(0);
    setCurrentTeam('A');
    setScoreA(0);
    setScoreB(0);
    setResults([]);
    setPhase('game');
  };
  // ---- Game handlers ----
  const adjustScore = (team: Team, delta: number) => {
    if (team === 'A') setScoreA((s) => Math.max(0, s + delta));else
    setScoreB((s) => Math.max(0, s + delta));
  };
  const advance = (nextSkipped?: Round[]) => {
    const skippedPool = nextSkipped ?? skippedRounds;
    if (currentRoundIndex >= gameRounds.length - 1) {
      if (skippedPool.length > 0) {
        setGameRounds(skippedPool);
        setSkippedRounds([]);
        setCurrentRoundIndex(0);
        setCurrentTeam((t) => t === 'A' ? 'B' : 'A');
      } else {
        setPhase('winner');
      }
    } else {
      setCurrentRoundIndex((i) => i + 1);
      setCurrentTeam((t) => t === 'A' ? 'B' : 'A');
    }
  };
  const handleOutcome = (outcome: 'correct' | 'wrong', elapsed: number) => {
    if (outcome === 'correct') adjustScore(currentTeam, 1);
    setResults((r) => [
    ...r,
    {
      team: currentTeam,
      outcome,
      elapsed
    }]
    );
    advance();
  };
  const handleSkip = (elapsed: number) => {
    const currentRound = gameRounds[currentRoundIndex];
    const nextSkipped = currentRound ? [...skippedRounds, currentRound] : skippedRounds;
    if (currentRound) setSkippedRounds(nextSkipped);
    setResults((r) => [
    ...r,
    {
      team: currentTeam,
      outcome: 'skip',
      elapsed
    }]
    );
    advance(nextSkipped);
  };
  const handleNextRound = (elapsed: number) => {
    // Advance without an explicit correct/wrong mark; record as skip for stats fairness
    const currentRound = gameRounds[currentRoundIndex];
    const nextSkipped = currentRound ? [...skippedRounds, currentRound] : skippedRounds;
    if (currentRound) setSkippedRounds(nextSkipped);
    setResults((r) => [
    ...r,
    {
      team: currentTeam,
      outcome: 'skip',
      elapsed
    }]
    );
    advance(nextSkipped);
  };
  const endGame = () => setPhase('winner');
  // ---- Stats ----
  const stats: GameStats = (() => {
    const correct = results.filter((r) => r.outcome === 'correct').length;
    const wrong = results.filter((r) => r.outcome === 'wrong').length;
    const scored = results.filter((r) => r.outcome === 'correct');
    const fastest = scored.length ?
    scored.reduce((min, r) => Math.min(min, r.elapsed), Infinity) :
    null;
    return {
      totalRounds: results.length,
      correct,
      wrong,
      fastestRound: fastest === Infinity ? null : fastest
    };
  })();
  // ---- Winner handlers ----
  const playAgain = () => {
    setCurrentRoundIndex(0);
    setCurrentTeam('A');
    setScoreA(0);
    setScoreB(0);
    setResults([]);
    setPhase('setup');
  };
  const newGame = () => {
    setSettings(DEFAULT_SETTINGS);
    setRounds([
    {
      id: newId(),
      word: '',
      hint1: ''
    }]
    );
    setCurrentRoundIndex(0);
    setCurrentTeam('A');
    setScoreA(0);
    setScoreB(0);
    setResults([]);
    setPhase('setup');
  };
  return (
    <div className="w-full min-h-full">
      <AnimatePresence mode="wait">
        {phase === 'setup' &&
        <motion.div
          key="setup"
          initial={{
            opacity: 0
          }}
          animate={{
            opacity: 1
          }}
          exit={{
            opacity: 0
          }}>
          
            <SetupScreen
            settings={settings}
            rounds={rounds}
            onSettingsChange={updateSettings}
            onRoundChange={updateRound}
            onAddRound={addRound}
            onDeleteRound={deleteRound}
            onRandomize={randomize}
            onStart={startGame} />
          
          </motion.div>
        }

        {phase === 'game' &&
        <motion.div
          key="game"
          initial={{
            opacity: 0
          }}
          animate={{
            opacity: 1
          }}
          exit={{
            opacity: 0
          }}>
          
            <GameScreen
            settings={settings}
            rounds={gameRounds}
            currentRoundIndex={currentRoundIndex}
            currentTeam={currentTeam}
            scoreA={scoreA}
            scoreB={scoreB}
            onAdjustScore={adjustScore}
            onOutcome={handleOutcome}
            onSkip={handleSkip}
            onNextRound={handleNextRound}
            onEndGame={endGame} />
          
          </motion.div>
        }

        {phase === 'winner' &&
        <motion.div
          key="winner"
          initial={{
            opacity: 0
          }}
          animate={{
            opacity: 1
          }}
          exit={{
            opacity: 0
          }}>
          
            <WinnerScreen
            settings={settings}
            scoreA={scoreA}
            scoreB={scoreB}
            stats={stats}
            onPlayAgain={playAgain}
            onNewGame={newGame} />
          
          </motion.div>
        }
      </AnimatePresence>
    </div>);

}