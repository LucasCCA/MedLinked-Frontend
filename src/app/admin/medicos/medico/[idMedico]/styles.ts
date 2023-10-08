import styled from "styled-components";

export const CPFContainer = styled.div`
  width: calc(50% - 5px);
  margin-bottom: 10px;
`;

export const FieldsContainer = styled.div`
  display: grid;
  grid-template-columns: calc(50% - 5px) calc(50% - 5px);
  gap: 10px;
  justify-content: flex-start;
  align-items: center;
  max-width: 100%;
`;
