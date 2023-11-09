import { breakpoints } from "@medlinked/config";
import styled from "styled-components";

export const BlueBackground = styled.section`
  background: ${(props) => props.theme.colors.dark_blue_100};
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const HeaderContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;
  padding-top: 1.5rem;
  padding-left: 1rem;

  @media ${breakpoints.sm} {
    padding-left: 2rem;
  }
`;

export const LogoContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;

  &:hover {
    cursor: pointer;
  }
`;

export const PageContentContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const WhiteContainer = styled.div`
  padding: 2rem 1rem;
  width: 290px;
  align-self: center;
  background: ${(props) => props.theme.colors.white};

  @media ${breakpoints.xs} {
    padding: 2rem;
    width: 380px;
  }

  @media ${breakpoints.sm} {
    padding: 2rem;
    width: 500px;
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin: 2.5rem 0 2rem 0;
  gap: 20px;
  width: 100%;
`;

export const PasswordContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 5px;

  a {
    width: fit-content;
  }
`;

export const LinkContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;

  a {
    width: fit-content;
  }
`;
