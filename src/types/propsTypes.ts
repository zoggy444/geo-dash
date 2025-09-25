import type { IconType } from "react-icons";
import type {
  AreaType,
  ButtonVariantType,
  ControlPositionType,
  IntentType,
} from "./types";
import type { ComponentPropsWithoutRef, FormEvent } from "react";

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

export type GamePrompterProps = {
  victory: boolean;
  toGuess: string | null;
  guessedCorrectly: string | null;
  guessedIncorrectly: string[];
  onStartGameClick: () => void;
  onNewRoundClick: () => void;
};

export type GameProps = {
  gameMode: AreaType;
  victory: boolean;
  toGuess: string | null;
  guessedCorrectly: string | null;
  guessedIncorrectly: string[];
  regGuessMap: Map<string, string>;
  dptGuessMap: Map<string, string>;
  onAreaClick: (name: string) => void;
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

export type RadioGroupProps<T> = {
  ariaLabel: string;
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
