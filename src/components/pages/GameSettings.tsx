import "../../index.css";
import type { GameSettingsProps } from "../../types/propsTypes";
import type { AreaType } from "../../types/types";
import { styled } from "@linaria/react";
import Button from "../reusable-ui/Button";
import RadioGroup from "../reusable-ui/RadioGroup";
import Panel from "../reusable-ui/Panel";

function GameSettings({
  gameMode,
  gameModes,
  onChangeGameMode,
  onStartGame,
}: GameSettingsProps) {
  return (
    <GameSettingsStyled className="game-setting">
      <Panel>
        <h2>Welcome to GeoGuessr Mini!</h2>
        <p className="game-rules">
          <p>Guess the area based on the map provided.</p>
          <p>Click on an area to make your guess.</p>
          <p>Good luck!</p>{" "}
        </p>
        <RadioGroup<AreaType>
          ariaLabel="Game mode"
          displayLabel={true}
          values={gameModes}
          defaultValue={gameMode}
          onValueChange={onChangeGameMode}
        />
        <Button
          label="Start Game"
          intent="primary"
          className="start-game-button"
          onClick={onStartGame}
        >
          Start Game
        </Button>
      </Panel>
    </GameSettingsStyled>
  );
}

export default GameSettings;

const GameSettingsStyled = styled.div`
  .game-rules {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
`;
