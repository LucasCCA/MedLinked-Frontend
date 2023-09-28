import { breakpoints } from "@medlinked/config";
import styled from "styled-components";

type ExpansionProps = {
  $expanded: boolean;
};

type ColorProps = {
  $color?: "black_80";
};

type NavigationContainerProps = ColorProps & ExpansionProps;

export const Overlay = styled.div<ExpansionProps>`
  display: ${(props) => (props.$expanded ? "block" : "none")};
  position: absolute;
  width: 100%;
  height: 100%;
  background: ${(props) => props.theme.colors.black_60};
  z-index: 9;

  @media ${breakpoints.md} {
    display: none;
  }
`;

export const AvoidNavbarContainer = styled.div<ExpansionProps>`
  margin-left: 62px;
  transition: margin-left ease 200ms;

  @media ${breakpoints.md} {
    margin-left: ${(props) => (props.$expanded ? "250px" : "62px")};
  }
`;

export const NavbarContainer = styled.aside<ExpansionProps>`
  display: flex;
  flex-direction: column;
  background: ${(props) => props.theme.colors.white};
  width: 100%;
  max-width: ${(props) => (props.$expanded ? "250px" : "62px")};
  transition: max-width ease 200ms;
  position: fixed;
  top: 0;
  height: 100%;
  z-index: 10;
`;

export const BlueContainer = styled.div<ExpansionProps>`
  background: ${(props) => props.theme.colors.blue_100};
  padding: ${(props) => (props.$expanded ? "1.5rem 2rem" : "1.5rem 1rem")};
  display: flex;
  justify-content: space-between;
  align-items: center;
  user-select: none;
  color: ${(props) => props.theme.colors.white};

  svg {
    &:hover {
      cursor: pointer;
    }
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

export const NavigationContainer = styled.div<NavigationContainerProps>`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  padding: ${(props) => (props.$expanded ? "0rem 2rem" : "0rem 1rem")};
  padding-top: 1.5rem;
  gap: 0.75rem;
  -moz-box-shadow: 2px 0 6px ${(props) => props.theme.colors.black_60};
  -webkit-box-shadow: 2px 0 6px ${(props) => props.theme.colors.black_60};
  box-shadow: 2px 0 6px ${(props) => props.theme.colors.black_60};
  height: 100vh;

  > a {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: ${(props) => (props.$expanded ? "flex-start" : "center")};
    border-bottom: 1px dotted ${(props) => props.theme.colors.gray_100};
    padding-bottom: 8px;
    gap: 8px;
    user-select: none;

    &:hover {
      cursor: pointer;

      svg {
        color: ${(props) => props.theme.colors.light_blue_100};
      }
    }
  }
`;
