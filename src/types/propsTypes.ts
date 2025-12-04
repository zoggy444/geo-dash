import type { IconType } from "react-icons";
import type {
  AreaType,
  ButtonVariantType,
  ControlPositionType,
  GameStageType,
  IntentType,
} from "./types";
import type { ComponentPropsWithoutRef, FormEvent, ReactNode } from "react";

export type ButtonProps = {
  label: string;
  variant?: ButtonVariantType;
  intent?: IntentType;
  className?: string;
  Icon?: IconType;
  onClick?: (e?: FormEvent) => void;
} & ComponentPropsWithoutRef<"button">;

export type ButtonStyledProps = {
  $intent: IntentType;
  $variant: ButtonVariantType;
};

export type ClickReactionProps = {
  success: boolean;
  x: number;
  y: number;
};

export type GamePrompterProps = {
  gameStage: GameStageType;
  toGuess: string | null;
  guessedCorrectly: string | null;
  guessedIncorrectly: string[];
  onStartGameClick: () => void;
  onNewRoundClick: () => void;
};

export type GamePrompterStyledProps = {
  $active: boolean;
};

export type GameProps = {
  gameStage: GameStageType;
  gameMode: AreaType;
  toGuess: string | null;
  guessedCorrectly: string | null;
  guessedIncorrectly: string[];
  regGuessMap: Map<string, string>;
  dptGuessMap: Map<string, string>;
  onAreaClick: (name: string, pageX: number, pageY: number) => void;
  onNewRoundClick: () => void;
  onSettingsClick: () => void;
  onStartGameClick: () => void;
};

export type GameSettingsProps = {
  gameModes: AreaType[];
  gameMode: AreaType;
  onChangeGameMode: (mode: AreaType) => void;
  onStartGame: () => void;
};

export type MapControlProps = {
  position: ControlPositionType;
  children?: React.ReactNode;
};

export type PanelProps = {
  children: ReactNode;
};

export type RadioGroupProps<T> = {
  ariaLabel: string;
  displayLabel?: boolean;
  values: T[];
  defaultValue: T;
  onValueChange: (value: T) => void;
};

export type RadioItemProps<T> = {
  itemID: T;
  label: string;
  isSelected: boolean;
  onSelect: (itemID: T) => void;
};

export type TooltipContainerProps = {
  boxes: { [key: number]: ClickReactionProps };
};
