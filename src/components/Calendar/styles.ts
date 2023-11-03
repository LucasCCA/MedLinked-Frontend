import { breakpoints } from "@medlinked/config";
import styled, { css } from "styled-components";

type DayContainerProps = {
  $selectable?: boolean;
  $selected?: boolean;
};

export const CalendarContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const MonthYearContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;

  @media ${breakpoints.lg} {
    justify-content: flex-start;
  }

  > svg {
    color: ${(props) => props.theme.colors.black_80};

    &:hover {
      cursor: pointer;
      color: ${(props) => props.theme.colors.black_100};
    }
  }
`;

export const CalendarOptionsContainer = styled.div`
  display: flex;
  flex-direction: column-reverse;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;

  @media ${breakpoints.lg} {
    flex-direction: row;
  }
`;

export const DaysGridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  width: 100%;

  @media ${breakpoints.xs} {
    grid-template-columns: repeat(4, 1fr);
  }

  @media ${breakpoints.sm} {
    grid-template-columns: repeat(7, 1fr);
  }

  @media ${breakpoints.md} {
    grid-template-columns: repeat(5, 1fr);
  }

  @media ${breakpoints.lg} {
    grid-template-columns: repeat(7, 1fr);
  }
`;

export const MonthsGridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  width: 100%;

  @media ${breakpoints.xs} {
    grid-template-columns: repeat(2, 1fr);
  }

  @media ${breakpoints.sm} {
    grid-template-columns: repeat(3, 1fr);
  }

  @media ${breakpoints.md} {
    grid-template-columns: repeat(2, 1fr);
  }

  @media ${breakpoints.lg} {
    grid-template-columns: repeat(4, 1fr);
  }
`;

export const DayMonthContainer = styled.div<DayContainerProps>`
  border: 1px solid ${(props) => props.theme.colors.blue_80};
  background: ${(props) => props.theme.colors.white};
  padding: 10px 5px 0 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: 1px;
  width: 100%;
  height: 5rem;

  ${({ $selectable }) =>
    $selectable &&
    css`
      &:hover {
        background: ${(props) => props.theme.colors.blue_60};
        cursor: pointer;

        p {
          color: ${(props) => props.theme.colors.white};
        }
      }
    `}

  ${({ $selected }) =>
    $selected &&
    css`
      background: ${(props) => props.theme.colors.blue_80};

      p {
        color: ${(props) => props.theme.colors.white};
      }
    `}
`;

export const IconsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
