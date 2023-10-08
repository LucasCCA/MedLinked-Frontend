import { breakpoints } from "@medlinked/config";
import styled from "styled-components";

export const CPFContainer = styled.div`
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
  }
`;
