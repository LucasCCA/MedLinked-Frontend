import styled, { css } from "styled-components";

type PaginationStylesProps = {
  $selected?: boolean;
  $disabled?: boolean;
};

export const PaginationItemsContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
  width: fit-content;
`;

export const PaginationItemContainer = styled.div<PaginationStylesProps>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0.15rem 0.5rem;
  border: 1px solid ${(props) => props.theme.colors.blue_60};
  border-radius: ${(props) => props.theme.border_radius};
  overflow: hidden;
  background: ${(props) => props.theme.colors.white};
  width: 32px;
  height: 32px;
  user-select: none;

  > svg {
    color: ${(props) => props.theme.colors.black_80};
  }

  &:hover {
    background: ${(props) => props.theme.colors.blue_80};
    cursor: pointer;

    > svg,
    p {
      color: ${(props) => props.theme.colors.white};
    }
  }

  ${({ $selected }) =>
    $selected &&
    css`
      background: ${(props) => props.theme.colors.blue_60};

      > svg,
      p {
        color: ${(props) => props.theme.colors.white};
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

        > svg,
        p {
          color: ${(props) => props.theme.colors.black_80};
        }
      }
    `}
`;
