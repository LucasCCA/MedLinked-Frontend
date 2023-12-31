import styled, { css, keyframes } from "styled-components";
import { CustomLink } from "..";

type HeaderStylesProps = {
  $openAnimation: boolean;
  $closeAnimation: boolean;
};

export const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

export const HeaderContainer = styled.section`
  position: fixed;
  max-width: 100%;
  width: 100%;
  top: 0;
  left: 0;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  background: ${(props) => props.theme.colors.dark_blue_100};
  -moz-box-shadow: 0 2px 6px ${(props) => props.theme.colors.black_60};
  -webkit-box-shadow: 0 2px 6px ${(props) => props.theme.colors.black_60};
  box-shadow: 0 2px 6px ${(props) => props.theme.colors.black_60};
  padding: 1.5rem 0;
  user-select: none;
  z-index: 997;
`;

export const UserContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  position: relative;
`;

export const ClickableContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  color: ${(props) => props.theme.colors.white};

  &:hover {
    cursor: pointer;
  }
`;

const openChevron = keyframes`
  from {
    transform: rotate(0);
  }

  to {
    transform: rotate(180deg);
  }
`;

const closeChevron = keyframes`
  from {
    transform: rotate(180deg);
  }

  to {
    transform: rotate(0);
  }
`;

export const ChevronContainer = styled.div<HeaderStylesProps>`
  ${({ $openAnimation }) =>
    $openAnimation &&
    css`
      animation: ${openChevron} 200ms;
      animation-fill-mode: forwards;
    `}

  ${({ $closeAnimation }) =>
    $closeAnimation &&
    css`
      animation: ${closeChevron} 200ms;
      animation-fill-mode: forwards;
    `}
`;

const showOptions = keyframes`
  from {
    max-height: 0;
  }

  to {
    max-height: 1000px;
  }
`;

const hideOptions = keyframes`
  from {
    max-height: 1000px;
  }

  to {
    max-height: 0;
  }
`;

export const DropdownContainer = styled.div<HeaderStylesProps>`
  position: absolute;
  margin-top: 35px;
  width: 180px;
  border-radius: ${(props) => props.theme.border_radius};
  max-height: 0;
  overflow: hidden;
  top: 0;
  -moz-box-shadow: 0 0 6px ${(props) => props.theme.colors.black_60};
  -webkit-box-shadow: 0 0 6px ${(props) => props.theme.colors.black_60};
  box-shadow: 0 0 6px ${(props) => props.theme.colors.black_60};
  background: ${(props) => props.theme.colors.white};

  ${({ $openAnimation }) =>
    $openAnimation &&
    css`
      animation: ${showOptions} 2s;
      animation-fill-mode: forwards;
    `}

  ${({ $closeAnimation }) =>
    $closeAnimation &&
    css`
      animation: ${hideOptions} 200ms;
      animation-fill-mode: forwards;
    `}
`;

export const Option = styled(CustomLink)`
  display: flex;
  align-items: center;
  width: 100%;
  border-bottom: 1px solid ${(props) => props.theme.colors.gray_80};
  padding: 5px 1rem 5px 8px;
  gap: 5px;

  svg {
    color: ${(props) => props.theme.colors.black_80};
  }

  &:hover {
    cursor: pointer;

    p,
    svg {
      color: ${(props) => props.theme.colors.black_100};
    }
  }
`;

export const NameContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  box-sizing: border-box;
  border-bottom: 1px solid ${(props) => props.theme.colors.gray_80};
  padding: 1rem;
  user-select: text;
`;
