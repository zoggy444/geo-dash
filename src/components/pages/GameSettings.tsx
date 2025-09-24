import { RadioGroup } from "radix-ui";
import "../../index.css";
import type { AreaType, GameSettingsProps } from "../../types";
import { styled } from "@linaria/react";
import Button from "../reusable-ui/Button";
import { theme } from "../../theme/theme";
import { FaCheck, FaCircle } from "react-icons/fa";
import { MdCheckCircle } from "react-icons/md";
import { useState } from "react";

const radioValueToKey = {
  default: 1,
  comfortable: 2,
  compact: 3,
};

function GameSettings({
  gameMode,
  onChangeGameMode,
  onStartGame,
}: GameSettingsProps) {
  const [itemSelected, setItemSelected] = useState(1);
  const [itemHovered, setItemHovered] = useState(0);
  const handleMouseEnter = (n) => {
    setItemHovered(n);
  };
  const handleMouseLeave = () => {
    setItemHovered(0);
  };
  const handleRadioSelect = (value) => {
    setItemSelected(radioValueToKey[value]);
  };

  return (
    <GameSettingsStyled className="game-setting">
      <p>
        Welcome to Geoguesser Mini! Click the button below to start playing.
      </p>
      <div className="panel">
        <RadioGroup.Root
          className="RadioGroupRoot"
          defaultValue="default"
          aria-label="View density"
          onValueChange={handleRadioSelect}
        >
          <div
            style={{ display: "flex", alignItems: "center" }}
            onMouseEnter={() => handleMouseEnter(1)}
            onMouseLeave={() => handleMouseLeave()}
          >
            <RadioGroup.Item className="RadioGroupItem" value="default" id="r1">
              {itemHovered === 1 && itemSelected !== itemHovered && (
                <MdCheckCircle className="hovered" />
              )}
              <RadioGroup.Indicator className="RadioGroupIndicator">
                <MdCheckCircle className="selected" />
              </RadioGroup.Indicator>
            </RadioGroup.Item>
            <label className="Label" htmlFor="r1">
              Default
            </label>
          </div>
          <div
            style={{ display: "flex", alignItems: "center" }}
            onMouseEnter={() => handleMouseEnter(2)}
            onMouseLeave={() => handleMouseLeave()}
          >
            <RadioGroup.Item
              className="RadioGroupItem"
              value="comfortable"
              id="r2"
            >
              {itemHovered === 2 && itemSelected !== itemHovered && (
                <MdCheckCircle className="hovered" />
              )}
              <RadioGroup.Indicator className="RadioGroupIndicator">
                <MdCheckCircle className="selected" />
              </RadioGroup.Indicator>
            </RadioGroup.Item>
            <label className="Label" htmlFor="r2">
              Comfortable
            </label>
          </div>
          <div
            style={{ display: "flex", alignItems: "center" }}
            onMouseEnter={() => handleMouseEnter(3)}
            onMouseLeave={() => handleMouseLeave()}
          >
            <RadioGroup.Item className="RadioGroupItem" value="compact" id="r3">
              {itemHovered === 3 && itemSelected !== itemHovered && (
                <MdCheckCircle className="hovered" />
              )}
              <RadioGroup.Indicator className="RadioGroupIndicator">
                <MdCheckCircle className="selected" />
              </RadioGroup.Indicator>
            </RadioGroup.Item>
            <label className="Label" htmlFor="r3">
              Compact
            </label>
          </div>
        </RadioGroup.Root>
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
  .RadioGroupRoot {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .RadioGroupItem {
    background-color: #fcf5e5;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    border: none;
    box-shadow: 0 2px 10px black;
    padding: 0;
  }
  .RadioGroupItem:hover {
    /* background-color: var(--violet-2); */
  }
  /* .RadioGroupItem:focus {
    box-shadow: 0 0 0 2px black inset;
  } */
  .selected {
    font-size: 20px;
    color: #3f2f07;
  }
  .hovered {
    font-size: 20px;
    color: #b98816;
  }

  .RadioGroupIndicator {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 20px;
    height: 20px;
    /* width: 100%;
    height: 100%; */
    /* background-color: blue; */
    position: relative;
  }
  /* .RadioGroupIndicator::after {
    content: "";
    display: block;
    width: 11px;
    height: 11px;
    border-radius: 50%;
    background-color: blue;
  } */

  .Label {
    font-size: 15px;
    line-height: 1;
    padding-left: 15px;
  }
`;
