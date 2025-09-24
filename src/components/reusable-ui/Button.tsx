import { styled } from "@linaria/react";
import { theme } from "../../theme/theme";

export default function Button({
  label,
  className,
  Icon,
  intent = "primary",
  variant = "primary",
  onClick,
  ...buttonProps
}) {
  return (
    <ButtonStyled
      $intent={intent}
      $variant={variant}
      className={className}
      onClick={onClick}
      {...buttonProps}
    >
      <span>{label}</span>
      {Icon && <Icon />}
    </ButtonStyled>
  );
}

const ButtonStyled = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${theme.spacing.xs};
  border-radius: ${theme.borderRadius.round};

  color: ${({ $intent, $variant }) => getColor($intent, $variant, true)};
  background-color: ${({ $intent, $variant }) =>
    getColor($intent, $variant, false)};
  border: 1px solid
    ${({ $intent, $variant }) => getColor($intent, $variant, false)};

  svg {
    font-size: ${theme.fonts.size.P2};
    margin: ${theme.spacing.xs};
  }

  &:hover {
    color: ${({ $intent, $variant }) => getColor($intent, $variant, false)};
    background-color: ${({ $intent, $variant }) =>
      getColor($intent, $variant, true)};
    cursor: pointer;
  }

  &:active {
    color: ${({ $intent, $variant }) => getColor($intent, $variant, true)};
    background-color: ${({ $intent, $variant }) =>
      getColor($intent, $variant, false)};
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
    case "primary":
      return reverse ? altColor : baseColor;
    default:
      return reverse ? baseColor : altColor;
  }
}
