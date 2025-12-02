import { styled } from "@linaria/react";
import type { GamePrompterProps } from "../../types/propsTypes";
import Button from "../reusable-ui/Button";
import Panel from "../reusable-ui/Panel";

function GamePrompter({
  victory,
  toGuess,
  guessedCorrectly,
  guessedIncorrectly,
  onStartGameClick,
  onNewRoundClick,
}: GamePrompterProps) {
  if (!victory) {
    return (
      <GamePrompterStyled $active={false}>
        <Panel>
          {guessedCorrectly && (
            <>
              <h2>You guessed correctly !</h2>
              <Button
                label="New Round"
                intent="primary"
                className="next-round-button"
                onClick={onNewRoundClick}
              />
            </>
          )}
          {!guessedCorrectly && guessedIncorrectly.length !== 0 && (
            <>
              {guessedIncorrectly.length >= 3 && (
                <>
                  <h2>You have made 3 incorrect guesses.</h2>
                  <Button
                    label="New Round"
                    intent="primary"
                    className="next-round-button"
                    onClick={onNewRoundClick}
                  />
                </>
              )}
            </>
          )}
          {!guessedCorrectly && guessedIncorrectly.length < 3 && (
            <h2>
              Where is <i className="to-guess-name">{toGuess}</i> ?
            </h2>
          )}
        </Panel>
      </GamePrompterStyled>
    );
  }
  return (
    <Panel>
      <h2>YOU WON THE GAME</h2>
      <Button
        label="Start Game"
        intent="primary"
        className="start-game-button"
        onClick={onStartGameClick}
      />
    </Panel>
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
