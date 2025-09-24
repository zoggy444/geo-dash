import "../../index.css";
import type { AreaType, GameSettingsProps } from "../../types";
import { styled } from "@linaria/react";
import Button from "../reusable-ui/Button";
import { theme } from "../../theme/theme";
import { useState } from "react";
import RadioGroup from "../reusable-ui/RadioGroup";

function GameSettings({
  gameMode,
  onChangeGameMode,
  onStartGame,
}: GameSettingsProps) {
  const radioValues = ["locate regions", "locate departments"];

  return (
    <GameSettingsStyled className="game-setting">
      <p>
        Welcome to Geoguesser Mini! Click the button below to start playing.
      </p>
      <div className="panel">
        <RadioGroup
          ariaLabel="Game mode"
          values={radioValues}
          onValueChange={() => {}}
        />
      </div>
      <Button
        label="Start Game"
        intent="primary"
        size="large"
        className="start-game-button"
        onClick={onStartGame}
      >
        Start Game
      </Button>
    </GameSettingsStyled>
  );
}

export default GameSettings;

const GameSettingsStyled = styled.div`
  .panel {
    border: 1px solid #3f2f07;
    border-radius: ${theme.borderRadius.round};
    background-color: ${theme.colors.parchment};
    color: #3f2f07;
    padding: ${theme.spacing.md};
    box-shadow: 1px 1px 3px #3f2f07;
  }
`;
