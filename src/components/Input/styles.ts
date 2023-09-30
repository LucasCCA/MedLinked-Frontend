import styled from "styled-components";

type InputProps = {
  $fullWidth?: boolean;
};

export const StyledInput = styled.input`
  border: none;
  outline: none;
  width: 100%;
  font-family: inherit;
  padding: 0.75rem 0.5rem 0.75rem 0.5rem;

  &::placeholder {
    color: ${(props) => props.theme.colors.black_60};
  }
`;

export const InputContainer = styled.div<InputProps>`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding-left: 0.5rem;
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
`;
