import { breakpoints } from "@medlinked/config";
import styled from "styled-components";

export const ContentContainer = styled.section`
  display: flex;
  width: 100%;
  height: 100%;
`;

export const FiltersContainer = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: 15px;

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
  margin-bottom: 30px;

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

export const CardInfoContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: 5px;
`;

export const HealthInsuranceInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: 5px;
`;

export const SingleFieldContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
  margin-bottom: 10px;

  @media ${breakpoints.md} {
    width: calc(50% - 5px);
  }
`;

export const CepContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
  margin-bottom: 10px;

  @media ${breakpoints.md} {
    width: calc(50% - 5px);
  }
`;

export const FieldsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  max-width: 100%;

  @media ${breakpoints.md} {
    display: grid;
    grid-template-columns: calc(50% - 5px) calc(50% - 5px);
    justify-content: flex-start;
    align-items: flex-start;
  }
`;

export const AddressFieldsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  max-width: 100%;

  @media ${breakpoints.md} {
    display: grid;
    grid-template-columns: calc(50% - 5px) calc(50% - 5px);
    justify-content: flex-start;
    align-items: flex-start;
  }
`;

export const ModalButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  width: 100%;

  @media ${breakpoints.sm} {
    flex-direction: row;
  }
`;

export const CardContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 15px;
  width: 100%;

  > svg {
    color: ${(props) => props.theme.colors.red_80};

    &:hover {
      cursor: pointer;
      color: ${(props) => props.theme.colors.red_100};
    }
  }

  @media ${breakpoints.sm} {
    flex-direction: row;
    justify-content: space-between;
    gap: 0;
  }
`;

export const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  gap: 15px;
`;
