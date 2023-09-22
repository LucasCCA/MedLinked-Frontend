import styled, { css } from "styled-components";

export const StyledText = styled.p<{
  color?: "black_80" | "white";
  fontWeight?: number;
  fontSize?: "h1" | "h2" | "h3" | "h5" | "h6";
}>`
  font-weight: ${(props) => props.fontWeight || 400};
  color: ${(props) => props.theme.colors.black_100};
  font-size: ${(props) => props.theme.font_sizes.h4};

  ${({ color }) =>
    color == "black_80" &&
    css`
      color: ${(props) => props.theme.colors.black_80};
    `};

  ${({ color }) =>
    color == "white" &&
    css`
      color: ${(props) => props.theme.colors.white};
    `};

  ${({ fontSize }) =>
    fontSize == "h1" &&
    css`
      font-size: ${(props) => props.theme.font_sizes.h1};
    `};

  ${({ fontSize }) =>
    fontSize == "h2" &&
    css`
      font-size: ${(props) => props.theme.font_sizes.h2};
    `};

  ${({ fontSize }) =>
    fontSize == "h3" &&
    css`
      font-size: ${(props) => props.theme.font_sizes.h3};
    `};

  ${({ fontSize }) =>
    fontSize == "h5" &&
    css`
      font-size: ${(props) => props.theme.font_sizes.h5};
    `};

  ${({ fontSize }) =>
    fontSize == "h6" &&
    css`
      font-size: ${(props) => props.theme.font_sizes.h6};
    `};
`;
