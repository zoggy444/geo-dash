import { useEffect, useState } from 'react'

import './index.css'
import "normalize.css";
import "@blueprintjs/core/lib/css/blueprint.css";
import 'leaflet/dist/leaflet.css';

import Game from './components/pages/Game';
import type { AreaType } from './types/types';

import departmentData from '../data/departements-version-simplifiee.json' with { type: "json" };
import regionData from '../data/regions-version-simplifiee.json';
import { styled } from '@linaria/react';
import { theme } from './theme/theme';
import TooltipIconContainer from './components/reusable-ui/TooltipIconContainer';

const regInitKVMap = new Map<string, string>(
  regionData.features.map(feature => [feature.properties.code, feature.properties.nom]
));
const dptInitKVMap = new Map<string, string>(
  departmentData.features.map(feature => [feature.properties.code, feature.properties.nom])
);

function getRandomKey(collection:Map<string, string>) {
    const keys = Array.from(collection.keys());
    return keys[Math.floor(Math.random() * keys.length)];
}

const gameModes: AreaType[] = ["region", "department"];

type GameStage = "game_start" | "round_in_progress" | "round_fail" | "round_success" | "victory" | "game_over";

function getGameStage (inGame: boolean, victory: boolean, guessedCorrectly: string | null, guessedIncorrectly: string[]): GameStage {
  if (!inGame) return "game_start";
  if (victory) return "victory";
  if (guessedCorrectly) return "round_success";
  if (guessedIncorrectly.length >=3 ) return "round_fail";
  return "round_in_progress";
}

// @ todo: fix state

function App() {
  const [inGame, setInGame] = useState(false);
  const [victory, setVictory] = useState(false);
  const [gameMode, setGameMode] = useState<AreaType>('region');
  const [dptGuessMap, setDptGuessMap] = useState(new Map([...dptInitKVMap]))
  const [regGuessMap, setRegGuessMap] = useState(new Map([...regInitKVMap]))
  const [toGuess, setToGuess] = useState<string | null>(null);
  const [guessedCorrectly, setGuessedCorrectly] = useState<string | null>(null);
  const [guessedIncorrectly, setGuesseIncorrectly] = useState<string[]>([]);
  const [boxes, setBoxes] = useState<{ [key: string]: { Icon: React.ReactNode; x: number; y: number } }>({});
  const [count, setCount] = useState(0);

  const gameStage = getGameStage(inGame, victory, guessedCorrectly, guessedIncorrectly);

  useEffect(() => {
    switch (gameStage) {
      case "round_fail":
      case "round_success": {
          const newRoundTimer = setTimeout(() => handleNewRound(), 1100);
          return () => {
            clearTimeout(newRoundTimer);
          };
        }
      case "game_start": {
          const startGameTimer = setTimeout(() => handleStartGame(), 1000);
          return () => {
            clearTimeout(startGameTimer);
          };
        }
    }

  });

  const setNewToGuess = function () {
    let guessMap;
    if (gameMode == 'region') {
      guessMap = victory ? regInitKVMap : regGuessMap
    }else{
      guessMap = victory ? dptInitKVMap : dptGuessMap
    }
    const newKey = getRandomKey(guessMap)
    setToGuess(guessMap.get(newKey) || null)
  }

  const addBox = ({ success, pageX, pageY }) => {
    setBoxes((boxes) => ({ ...boxes, [count]: { success: success, x: pageX, y: pageY } }));
    setCount((count) => count + 1);
  };

  const handleStartGame = () => {
    setInGame(true);
    setNewToGuess();
    setGuessedCorrectly(null);
    setGuesseIncorrectly([]);
    setVictory(false);
    setDptGuessMap(new Map([...dptInitKVMap]))
    setRegGuessMap(new Map([...regInitKVMap]))
  }

  const handleAreaClick = (name: string, pageX: number, pageY: number) => {
    if (guessedCorrectly) return; // Do not allow more guesses if already guessed correctly
    if (guessedIncorrectly.indexOf(name) !== -1) return; // Don't guess several times the same area
    if (guessedIncorrectly.length >= 3) return; // Do not allow more than 3 incorrect guesses
    if (name === toGuess) {
      setGuessedCorrectly(name);
      if (gameMode == 'region') {
        const newRegMap = new Map(
          [...regGuessMap]
          .filter(([, v]) => v !== toGuess )
        );
        if (newRegMap.size === 0) setVictory(true)
        setRegGuessMap(newRegMap)
      }else{
        const newDptMap = new Map(
          [...dptGuessMap]
          .filter(([, v]) => v !== toGuess )
        );
        if (newDptMap.size === 0) setVictory(true)
        setDptGuessMap(newDptMap)
      }
      addBox({ success: true, pageX: pageX, pageY: pageY });
    } else {
      setGuesseIncorrectly([...guessedIncorrectly, name]);
      addBox({ success: false, pageX: pageX, pageY: pageY });
    }
  }

  const handleNewRound = () => {
    setGuessedCorrectly(null);
    setGuesseIncorrectly([]); // Reset incorrect guesses
    setNewToGuess();
    setBoxes({});
  }

  const handleSettingsClick = () => {
    setInGame(false);
  }

  return (
    <AppStyled>
      <Game gameMode={gameMode} toGuess={toGuess}
        gameStage={gameStage}
        guessedCorrectly={guessedCorrectly}
        guessedIncorrectly={guessedIncorrectly}
        regGuessMap={regGuessMap}
        dptGuessMap={dptGuessMap}
        onAreaClick={handleAreaClick}
        onNewRoundClick={handleNewRound}
        onSettingsClick={handleSettingsClick}
        onStartGameClick={handleStartGame}/>
      <TooltipIconContainer boxes={boxes}/>
    </AppStyled>
  )
}

export default App;

const AppStyled = styled.div`
  width: 100wh;
  height: 100vh;
  background-color: ${theme.colors.parchmentWhite};
  padding: 2rem;
`;
