import { breakpoints } from "@medlinked/config";
import styled from "styled-components";

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

export const CardContentContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;

  > svg {
    color: ${(props) => props.theme.colors.red_80};

    &:hover {
      cursor: pointer;
      color: ${(props) => props.theme.colors.red_100};
    }
  }
`;
