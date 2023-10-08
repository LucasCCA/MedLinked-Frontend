import styled, { css } from "styled-components";

type StyledButtonProps = {
  $color?: "red_80";
  $fullWidth?: boolean;
  $hasLink?: boolean;
  $textAlign?: "center";
};

export const StyledButton = styled.button<StyledButtonProps>`
  border-radius: ${(props) => props.theme.border_radius};
  background: ${(props) => props.theme.colors.dark_blue_80};
  border: none;
  padding: ${(props) => (props.$hasLink ? 0 : "0.75rem 0")};
  padding-left: ${(props) => (props.$hasLink ? 0 : "15px")};
  width: ${(props) => (props.$fullWidth ? "100%" : "240px")};
  display: flex;
  justify-content: ${(props) =>
    props.$textAlign == "center" ? "center" : "flex-start"};
  align-items: center;
  text-align: left;
  gap: 5px;
  color: ${(props) => props.theme.colors.white};
  font-family: inherit;
  user-select: none;

  > a {
    width: 100%;
    padding: 0.75rem 0;
    padding-left: 15px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 5px;

    &:hover {
      color: ${(props) => props.theme.colors.white};
    }
  }

  &:hover {
    cursor: pointer;
    background: ${(props) => props.theme.colors.dark_blue_100};
  }

  &:disabled {
    background: ${(props) => props.theme.colors.gray_80};
    pointer-events: none;
  }

  ${({ $color }) =>
    $color == "red_80" &&
    css`
      background: ${(props) => props.theme.colors.red_80};

      &:hover {
        background: ${(props) => props.theme.colors.red_100};
      }
    `}
`;
