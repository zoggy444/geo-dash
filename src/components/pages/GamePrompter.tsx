import { styled } from "@linaria/react";
import type { GamePrompterProps } from "../../types/propsTypes";
import Button from "../reusable-ui/Button";
import Panel from "../reusable-ui/Panel";
import { useEffect, useState } from "react";

function GamePrompter({
  gameStage,
  toGuess,
  onStartGameClick,
}: GamePrompterProps) {
  const [active, setActive] = useState(true);
  useEffect(() => {
    if (gameStage == "round_in_progress") {
      const timer = setTimeout(() => setActive(false), 1000);

      return () => {
        clearTimeout(timer);
      };
    }else if (!active){
      setActive(true);
    }
  }, [gameStage, active]);

  return (
    <GamePrompterStyled $active={active}>
      <Panel>
        {gameStage == "game_start" && <h2>Guess the place !</h2>}
        {gameStage == "round_in_progress" && (
          <h2 className="to-guess-name">{toGuess} ?</h2>
        )}
        {gameStage == "round_success" && <h2>Correct !</h2>}
        {gameStage == "round_fail" && <h2>You failed...</h2>}
        {gameStage == "victory" && (
          <>
            <h2>Victory !</h2>
            <Button
              label="Start Game"
              intent="primary"
              className="start-game-button"
              onClick={onStartGameClick}
            />
          </>
        )}
      </Panel>
    </GamePrompterStyled>
  );
}

export default GamePrompter;

const GamePrompterStyled = styled.div`
  position: absolute;
  top: ${({ $active }) => ($active ? "50%" : "0")};
  left: ${({ $active }) => ($active ? "50%" : "0")};
  transform: ${({ $active }) =>
    $active ? "translate(-50%, -50%)" : "translate(8px, 8px)"};
  z-index: 1000;
`;
