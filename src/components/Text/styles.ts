import { theme } from "@medlinked/config";
import styled, { css } from "styled-components";

export const StyledText = styled.p<{
  color?: "black_80" | "white";
  fontWeight?: number;
}>`
  font-weight: ${(props) => props.fontWeight || 400};
  color: ${theme.colors.black_100};

  ${({ color }) =>
    color == "black_80" &&
    css`
      color: ${theme.colors.black_80};
    `};

  ${({ color }) =>
    color == "white" &&
    css`
      color: ${theme.colors.white};
    `};
`;
