import { breakpoints } from "@medlinked/config";
import styled, { css } from "styled-components";

type TabItemContainerProps = {
  $selected?: boolean;
  $firstItem?: boolean;
  $lastItem?: boolean;
  $disabled?: boolean;
};

export const TabsItemsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;

  @media ${breakpoints.xs} {
    display: flex;
    flex-direction: row;
    width: fit-content;
  }
`;

export const TabItemContainer = styled.div<TabItemContainerProps>`
  border: 1px solid ${(props) => props.theme.colors.black_60};
  user-select: none;
  width: 100%;

  > p {
    padding: 0.5rem 0.75rem;
    text-align: center;
  }

  &:hover {
    cursor: pointer;
    border: 1px solid ${(props) => props.theme.colors.blue_100};

    > p {
      color: ${(props) => props.theme.colors.blue_80};
    }
  }

  @media ${breakpoints.xs} {
    width: fit-content;
  }

  ${({ $selected }) =>
    $selected &&
    css`
      border: 1px solid ${(props) => props.theme.colors.blue_60};

      > p {
        color: ${(props) => props.theme.colors.blue_80};
      }
    `}

  ${({ $firstItem }) =>
    $firstItem &&
    css`
      border-radius: ${(props) => props.theme.border_radius}
        ${(props) => props.theme.border_radius} 0 0;

      @media ${breakpoints.xs} {
        border-radius: ${(props) => props.theme.border_radius} 0 0
          ${(props) => props.theme.border_radius};
      }
    `}

    ${({ $lastItem }) =>
    $lastItem &&
    css`
      border-radius: 0 0 ${(props) => props.theme.border_radius}
        ${(props) => props.theme.border_radius};

      @media ${breakpoints.xs} {
        border-radius: 0 ${(props) => props.theme.border_radius}
          ${(props) => props.theme.border_radius} 0;
      }
    `}

    ${({ $disabled }) =>
    $disabled &&
    css`
      pointer-events: none;
      background: ${(props) => props.theme.colors.gray_80};
    `}
`;
