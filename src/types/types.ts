export type GeoDataType = {
  type: string;
  features: GeoFeatureType[];
};

export type GeoFeatureType =
  | {
      type: string;
      geometry: {
        type: string;
        coordinates: number[][][];
      };
      properties: {
        code: string;
        nom: string;
      };
    }
  | {
      type: string;
      geometry: {
        type: string;
        coordinates: number[][][][];
      };
      properties: {
        code: string;
        nom: string;
      };
    };

export type AreaType = "region" | "department";

export type ButtonVariantType = "regular" | "default";

export type ControlPositionType =
  | "bottomleft"
  | "bottomright"
  | "topleft"
  | "topright";

export type GuessStateType = {
  gameMode: AreaType;
  regLeftToGuess: Map<string, string>;
  regToGuess: string;
  regGuessed: boolean;
  regWrongGuesses: string[];
  deptLeftToGuess: Map<string, string>;
  deptToGuess: string;
  deptGuessed: boolean;
  deptWrongGuesses: string[];
};

export type IntentType = "primary" | "success";
