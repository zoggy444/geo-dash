import "../../index.css";
import type { GameSettingsProps } from "../../types/propsTypes";
import type { AreaType } from "../../types/types";
import { styled } from "@linaria/react";
import Button from "../reusable-ui/Button";
import { theme } from "../../theme/theme";
import RadioGroup from "../reusable-ui/RadioGroup";

function GameSettings({
  gameMode,
  gameModes,
  onChangeGameMode,
  onStartGame,
}: GameSettingsProps) {
  return (
    <GameSettingsStyled className="game-setting">
      <div className="panel">
        <p>
          Welcome to Geoguesser Mini! Click the button below to start playing.
        </p>
        <RadioGroup<AreaType>
          ariaLabel="Game mode"
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
      </div>
    </GameSettingsStyled>
  );
}

export default GameSettings;

const GameSettingsStyled = styled.div`
  .panel {
    border: 1px solid ${theme.colors.parchmentDark};
    border-radius: ${theme.borderRadius.round};
    background-color: ${theme.colors.parchment};
    color: ${theme.colors.parchmentDark};
    padding: ${theme.spacing.md};
    box-shadow: ${theme.shadows.paneledElt};

    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
  }
`;
