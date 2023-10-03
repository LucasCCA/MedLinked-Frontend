import styled, { css } from "styled-components";

type CardStylesProps = {
  $selected?: boolean;
};

export const CardStyles = styled.div<CardStylesProps>`
  border: 1px solid ${(props) => props.theme.colors.blue_80};
  border-radius: ${(props) => props.theme.border_radius};
  background: ${(props) => props.theme.colors.white};
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  width: 100%;

  &:hover {
    background: ${(props) => props.theme.colors.blue_60};
    cursor: pointer;

    > p {
      color: ${(props) => props.theme.colors.white};
    }
  }

  ${({ $selected }) =>
    $selected &&
    css`
      background: ${(props) => props.theme.colors.blue_80};

      > p {
        color: ${(props) => props.theme.colors.white};
      }
    `}
`;
