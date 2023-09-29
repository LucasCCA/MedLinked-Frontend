import styled, { css } from "styled-components";

type StyledButtonProps = {
  $color?: "red_80";
  $fullWidth?: boolean;
};

export const StyledButton = styled.button<StyledButtonProps>`
  border-radius: ${(props) => props.theme.border_radius};
  background: ${(props) => props.theme.colors.dark_blue_80};
  border: none;
  padding: 0.75rem 0;
  padding-left: 15px;
  width: ${(props) => (props.$fullWidth ? "100%" : "240px")};
  display: flex;
  justify-content: flex-start;
  align-items: center;
  text-align: left;
  gap: 5px;
  color: ${(props) => props.theme.colors.white};

  > a {
    width: 100%;

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

    &:hover {
      cursor: default;
      background: ${(props) => props.theme.colors.gray_100};

      > a {
        &:hover {
          cursor: default;
        }
      }
    }
  }

  ${({ $color }) => {
    switch ($color) {
      case "red_80":
        return css`
          background: ${(props) => props.theme.colors.red_80};

          &:hover {
            background: ${(props) => props.theme.colors.red_100};
          }
        `;
    }
  }}
`;
