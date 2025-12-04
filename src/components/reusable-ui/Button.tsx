import { styled } from "@linaria/react";
import { theme } from "../../theme/theme";
import type { ButtonProps, ButtonStyledProps } from "../../types/propsTypes";
import type { ButtonVariantType, IntentType } from "../../types/types";

export default function Button({
  label,
  className,
  Icon,
  intent = "primary",
  variant = "regular",
  onClick,
  ...buttonProps
}: ButtonProps) {
  return (
    <ButtonStyled
      $intent={intent}
      $variant={variant}
      className={className}
      onClick={onClick}
      {...buttonProps}
    >
      <div>
        <span>{label}</span>
        {Icon && <Icon />}
      </div>
    </ButtonStyled>
  );
}

const ButtonStyled = styled.button<ButtonStyledProps>`
  box-sizing: border-box;
  position: relative;
  display: inline-block;
  padding: 0;
  margin-bottom: 8px;
  border: none;
  background-color: transparent;

  div {
    z-index: 10;
    position: relative;
    padding: ${theme.spacing.xs};
    border-radius: ${theme.borderRadius.round};
    color: ${({ $intent, $variant }) => getColor($intent, $variant, true)};
    background-color: ${({ $intent, $variant }) =>
      getColor($intent, $variant, false)};
    border: 1px solid
      ${({ $intent, $variant }) => getColor($intent, $variant, false)};
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    text-shadow: 0px 1px 0px #000;
    filter: dropshadow(color=#000, offx=0px, offy=1px);

    -webkit-box-shadow: inset 0 1px 0 #ffe5c4, 0 5px 0 #003a91;
    -moz-box-shadow: inset 0 1px 0 #ffe5c4, 0 5px 0 #003a91;
    box-shadow: inset 0 1px 0 #ffe5c4, 0 5px 0 #003a91;

    display: flex;
    align-items: center;
    justify-content: center;
  }
  div:active {
    top: 5px;
    -webkit-box-shadow: inset 0 1px 0 #ffe5c4, 0 1px 0 #003a91;
    -moz-box-shadow: inset 0 1px 0 #ffe5c4, 0 1px 0 #003a91;
    box-shadow: inset 0 1px 0 #ffe5c4, 0 1px 0 #003a91;

    color: ${({ $intent, $variant }) => getColor($intent, $variant, true)};
    background-color: ${({ $intent, $variant }) =>
      getColor($intent, $variant, false)};
  }

  div > svg {
    font-size: ${theme.fonts.size.P2};
    margin: ${theme.spacing.xs};
  }

  div:hover {
    color: ${({ $intent, $variant }) => getColor($intent, $variant, false)};
    background-color: ${({ $intent, $variant }) =>
      getColor($intent, $variant, true)};
    cursor: pointer;
  }
  &:after {
    content: "";
    height: calc(100% + 4px);
    width: calc(100% + 2px);
    padding: 4px;
    position: absolute;
    bottom: -8px;
    left: -1px;
    z-index: 0;
    background-color: #2b1800;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    border-radius: 5px;
  }
`;

function getColor(
  intent: IntentType,
  variant: ButtonVariantType,
  reverse: boolean
) {
  const baseColor = theme.colors[intent];
  const altColor = theme.colors.white;
  switch (variant) {
    case "regular":
      return reverse ? altColor : baseColor;
    default:
      return reverse ? baseColor : altColor;
  }
}
