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
      <Panel>
        <p>
          Where is <i className="to-guess-name">{toGuess}</i> ?
        </p>
        {guessedCorrectly && (
          <>
            <p>You guessed correctly !</p>
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
            {guessedIncorrectly.length < 3 && (
              <p>You guessed incorrectly... try again!</p>
            )}
            {guessedIncorrectly.length >= 3 && (
              <>
                <p>You have made 3 incorrect guesses.</p>
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
      </Panel>
    );
  }
  return (
    <div className="game-prompter">
      <h2>YOU WON THE GAME</h2>
      <Button
        label="Start Game"
        intent="primary"
        className="start-game-button"
        onClick={onStartGameClick}
      />
    </div>
  );
}

export default GamePrompter;
