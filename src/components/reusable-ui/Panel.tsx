import { styled } from "@linaria/react";
import { theme } from "../../theme/theme";
import type { PanelProps } from "../../types/propsTypes";

function Panel({ children }: PanelProps) {
  return <PanelStyled>{children}</PanelStyled>;
}

export default Panel;

const PanelStyled = styled.div`
  border: 1px solid ${theme.colors.parchmentDark};
  border-radius: ${theme.borderRadius.round};
  background-color: ${theme.colors.parchment};
  color: ${theme.colors.parchmentDark};
  padding: ${theme.spacing.md};
  box-shadow: ${theme.shadows.paneledElt};

  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;
