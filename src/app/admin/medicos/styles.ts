import { breakpoints } from "@medlinked/config";
import styled from "styled-components";

export const FiltersContainer = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: 15px;
  margin-bottom: 1rem;

  @media ${breakpoints.md} {
    display: grid;
    grid-template-columns: 48% 48%;
  }

  @media ${breakpoints.lg} {
    grid-template-columns: 32% 32% 32%;
  }

  @media ${breakpoints.xl} {
    display: flex;
    flex-direction: row;
  }

  @media ${breakpoints.xxl} {
    max-width: 80%;
  }
`;

export const CardsContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 10px;
  margin-bottom: 15px;

  > div {
    gap: 5px;
  }
`;

export const PaginationAndRecordsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;

  > div:first-of-type {
    max-width: 100px;
    order: 2;
  }

  > div:last-of-type {
    order: 1;
  }

  @media ${breakpoints.sm} {
    flex-direction: row;
    justify-content: space-between;

    > div:first-of-type {
      order: 1;
    }

    > div:last-of-type {
      order: 2;
    }
  }
`;
