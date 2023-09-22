import styled, { css, keyframes } from "styled-components";

export const HeaderContainer = styled.section`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  background: ${(props) => props.theme.colors.dark_blue_100};
  padding: 1.75rem 3.5rem;
  user-select: none;
`;

export const UserContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  position: relative;
  color: ${(props) => props.theme.colors.black_80};

  p {
    padding-right: 0.25rem;
  }
`;

export const ClickableContainer = styled.div`
  display: flex;
  align-items: center;

  :hover {
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

export const ChevronContainer = styled.div<{
  openAnimation: boolean;
  closeAnimation: boolean;
}>`
  color: ${(props) => props.theme.colors.white};
  ${({ openAnimation }) =>
    openAnimation &&
    css`
      animation: ${openChevron} 200ms;
      animation-fill-mode: forwards;
    `}

  ${({ closeAnimation }) =>
    closeAnimation &&
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

export const OptionsContainer = styled.div<{
  openAnimation: boolean;
  closeAnimation: boolean;
}>`
  position: absolute;
  margin-top: 30px;
  width: 150px;
  border-radius: ${(props) => props.theme.border_radius};
  animation-fill-mode: forwards;
  max-height: 0;
  overflow: hidden;
  -webkit-transition: max-width 2s;
  -moz-transition: max-width 2s;
  -ms-transition: max-width 2s;
  -o-transition: max-width 2s;
  transition: max-width 2s;
  top: 0;

  > div:first-child {
    -moz-box-shadow: 0 0 6px ${(props) => props.theme.colors.black_60};
    -webkit-box-shadow: 0 0 6px ${(props) => props.theme.colors.black_60};
    box-shadow: 0 0 6px ${(props) => props.theme.colors.black_60};
  }

  &:hover {
    cursor: pointer;
  }

  ${({ openAnimation }) =>
    openAnimation &&
    css`
      animation: ${showOptions} 2s;
      animation-fill-mode: forwards;
    `}

  ${({ closeAnimation }) =>
    closeAnimation &&
    css`
      animation: ${hideOptions} 200ms;
      animation-fill-mode: forwards;
    `}
`;

export const Option = styled.div`
  display: flex;
  align-items: center;
  border-bottom: 1px solid ${(props) => props.theme.colors.gray_80};
  padding: 5px 1rem 5px 8px;
  background: ${(props) => props.theme.colors.white};

  p {
    padding-left: 5px;
  }

  &:hover {
    p,
    svg {
      color: ${(props) => props.theme.colors.black_100};
    }
  }
`;
