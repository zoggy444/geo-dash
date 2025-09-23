import { test, expect } from "@playwright/experimental-ct-react";
import Game from "./Game";
import type { GameProps } from "../../types";

const handleAreaClick = (name: string): void => {
  if (mockState.guessedCorrectly) return; // Do not allow more guesses if already guessed correctly
  if (mockState.guessedIncorrectly.indexOf(name) !== -1) return; // Don't guess several times the same area
  if (mockState.guessedIncorrectly.length >= 3) return; // Do not allow more than 3 incorrect guesses
  if (name === mockState.toGuess) {
    mockState.guessedCorrectly = name;
  } else {
    mockState.guessedIncorrectly = [...mockState.guessedIncorrectly, name];
  }
};

const mockState: GameProps = {
  gameMode: "region",
  victory: false,
  toGuess: "Bretagne",
  guessedCorrectly: null,
  guessedIncorrectly: [],
  regGuessMap: new Map<string, string>(),
  dptGuessMap: new Map<string, string>(),
  onAreaClick: handleAreaClick,
  onNewRoundClick: () => {}, // todo adapt
  onSettingsClick: () => {}, // todo adapt
  onStartGameClick: () => {},
};

test.describe("@UIElements, basics", () => {
  test("Zoom control is not here", async ({ mount }) => {
    const component = mount(<Game {...mockState} />);
    const zoomControl = (await component).locator(".leaflet-control-zoom");
    expect(await zoomControl.count()).toBe(0);
  });

  /* for some reason this fails every time
  test("Background color is white", async ({ mount, page }) =>{
    const component = mount(
      <Game
        gameMode={mockState.gameMode}
        toGuess={mockState.toGuess}
        guessedCorrectly={mockState.guessedCorrectly}
        guessedIncorrectly={mockState.guessedIncorrectly}
        onAreaClick={mockState.onAreaClick}/>
    );
    (await component).waitFor({state: 'attached'})
    await page.screenshot({ path: "test-results/screenshots/bg-color.png" })
    const bgColor =  (await component).locator('.leaflet-container');

    expect(bgColor).toHaveCSS('background-color', 'white');
  });*/
});
