import styled, { css, keyframes } from "styled-components";

export const HeaderContainer = styled.section`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  background: ${(props) => props.theme.colors.dark_blue_100};
  padding: 1.75rem 3.5rem;
`;

export const UserContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
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

const open = keyframes`
  from {
    transform: rotate(0);
  }

  to {
    transform: rotate(180deg);
  }
`;

const close = keyframes`
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
      animation: ${open} 200ms;
      animation-fill-mode: forwards;
    `}

  ${({ closeAnimation }) =>
    closeAnimation &&
    css`
      animation: ${close} 200ms;
      animation-fill-mode: forwards;
    `}
`;

const height = keyframes`
  from {
    max-height: 0;
  }

  to {
    max-height: 1000px;
  }
`;

export const OptionsContainer = styled.div`
  position: absolute;
  margin-top: 100px;
  width: 110px;
  border-radius: ${(props) => props.theme.border_radius};
  animation: ${height} 2s;

  > div:first-child {
    -moz-box-shadow: 0 0 6px ${(props) => props.theme.colors.black_60};
    -webkit-box-shadow: 0 0 6px ${(props) => props.theme.colors.black_60};
    box-shadow: 0 0 6px ${(props) => props.theme.colors.black_60};
  }

  :hover {
    cursor: pointer;
  }
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
