import styled, { css } from "styled-components";

type WidthProps = {
  $fullWidth?: boolean;
};

type ErrorProps = {
  $error?: boolean;
};

type InputContainerProps = WidthProps &
  ErrorProps & {
    $disabled?: boolean;
  };

export const StyledInput = styled.input`
  border: none;
  outline: none;
  width: 100%;
  font-family: inherit;
  padding: 0.75rem 0.5rem 0.75rem 0.5rem;
  background: none;

  &::placeholder {
    color: ${(props) => props.theme.colors.black_60};
  }
`;

export const InputContainer = styled.div<InputContainerProps>`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 0 0.5rem;
  color: ${(props) => props.theme.colors.black_100};
  gap: 5px;
  border: 1px solid ${(props) => props.theme.colors.blue_60};
  border-radius: ${(props) => props.theme.border_radius};
  overflow: hidden;
  width: ${(props) => (props.$fullWidth ? "100%" : "240px")};

  > svg {
    color: ${(props) => props.theme.colors.black_80};
  }

  &:hover {
    border: 1px solid ${(props) => props.theme.colors.blue_100};
  }

  ${({ $error }) =>
    $error &&
    css`
      border: 1px solid ${(props) => props.theme.colors.red_60};

      &:hover {
        border: 1px solid ${(props) => props.theme.colors.red_100};
      }
    `}

  ${({ $disabled }) =>
    $disabled &&
    css`
      background: ${(props) => props.theme.colors.gray_80};
      pointer-events: none;

      &:hover {
        cursor: default;
        background: ${(props) => props.theme.colors.gray_80};
      }
    `}
`;

export const ErrorMessageContainer = styled.div<WidthProps>`
  margin-top: 5px;
  width: ${(props) => (props.$fullWidth ? "100%" : "240px")};
`;
