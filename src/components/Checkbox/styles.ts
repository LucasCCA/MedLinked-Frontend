import styled, { css } from "styled-components";

type CheckboxProps = {
  $error?: boolean;
  $disabled?: boolean;
  $checked: boolean;
};

export const StyledCheckbox = styled.input`
  display: none;
`;

export const CheckboxContainer = styled.div<CheckboxProps>`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  color: ${(props) => props.theme.colors.black_100};
  gap: 5px;
  border: 1px solid ${(props) => props.theme.colors.blue_60};
  border-radius: ${(props) => props.theme.border_radius};
  overflow: hidden;
  padding: ${(props) => (props.$checked ? "0" : "10px")};

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

export const ErrorMessageContainer = styled.div`
  margin-top: 5px;
  width: 100%;
`;

export const CheckboxAndErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const CheckboxAndLabelContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 5px;
  width: 100%;
`;
