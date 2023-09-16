import { theme } from "@medlinked/config";
import styled, { css } from "styled-components";

export const StyledText = styled.p`
  font-weight: 100;
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
