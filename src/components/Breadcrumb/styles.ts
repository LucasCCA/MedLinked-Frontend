import styled from "styled-components";

export const BreadcrumbItemsContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: fit-content;
  gap: 5px;

  > svg {
    color: ${(props) => props.theme.colors.black_80};

    &:hover {
      color: ${(props) => props.theme.colors.black_100};
    }
  }

  > a {
    &:hover {
      color: ${(props) => props.theme.colors.black_100};
    }
  }
`;
