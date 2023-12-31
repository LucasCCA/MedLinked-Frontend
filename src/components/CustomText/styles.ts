import styled, { css } from "styled-components";

export type TextStylesProps = {
  $color?: "black_80" | "black_60" | "white" | "red_80";
  $weight?: number;
  $size?: "h1" | "h2" | "h3" | "h5" | "h6";
  $align?: "center" | "left";
};

export const baseTextStyles = css<TextStylesProps>`
  font-weight: ${(props) => props.$weight || 400};
  font-size: ${(props) => props.theme.font_sizes.h4};
  text-align: justify;

  ${({ $color }) => {
    switch ($color) {
      case "black_80":
        return css`
          color: ${(props) => props.theme.colors.black_80};
        `;
      case "black_60":
        return css`
          color: ${(props) => props.theme.colors.black_60};
        `;
      case "white":
        return css`
          color: ${(props) => props.theme.colors.white};
        `;
      case "red_80":
        return css`
          color: ${(props) => props.theme.colors.red_80};
        `;
    }
  }};

  ${({ $size }) => {
    switch ($size) {
      case "h1":
        return css`
          font-size: ${(props) => props.theme.font_sizes.h1};
        `;
      case "h2":
        return css`
          font-size: ${(props) => props.theme.font_sizes.h2};
        `;
      case "h3":
        return css`
          font-size: ${(props) => props.theme.font_sizes.h3};
        `;
      case "h5":
        return css`
          font-size: ${(props) => props.theme.font_sizes.h5};
        `;
      case "h6":
        return css`
          font-size: ${(props) => props.theme.font_sizes.h6};
        `;
    }
  }};

  ${({ $align }) => {
    switch ($align) {
      case "center":
        return css`
          text-align: center;
        `;
      case "left":
        return css`
          text-align: left;
        `;
    }
  }};
`;

export const StyledText = styled.p<TextStylesProps>`
  color: ${(props) => props.theme.colors.black_100};

  ${baseTextStyles}
`;
