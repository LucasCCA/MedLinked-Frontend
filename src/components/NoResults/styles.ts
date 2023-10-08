import styled from "styled-components";

export const NoResultsContainer = styled.div`
  margin: 5rem 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 15px;

  > svg {
    color: ${(props) => props.theme.colors.black_80};
  }
`;
