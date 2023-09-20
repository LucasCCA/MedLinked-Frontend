import styled from "styled-components";

export const HeaderContainer = styled.section`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  background: ${(props) => props.theme.colors.dark_blue_100};
  color: ${(props) => props.theme.colors.white};
  padding: 1.75rem 3.5rem;
`;

export const UserContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;

  :hover {
    cursor: pointer;
  }
`;
