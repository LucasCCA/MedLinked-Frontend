import styled, { css, keyframes } from "styled-components";
import { CustomText } from "..";

type WidthProps = {
  $fullWidth?: boolean;
};

type ErrorProps = {
  $error?: boolean;
};

type AnimationProps = {
  $openAnimation: boolean;
  $closeAnimation: boolean;
};

type SelectContainerProps = WidthProps & ErrorProps & AnimationProps;

type OptionsContainerProps = WidthProps & AnimationProps;

export const StyledInput = styled.input`
  border: none;
  outline: none;
  width: 100%;
  font-family: inherit;
  padding: 0.75rem 0 0.75rem 0.5rem;

  &::placeholder {
    color: ${(props) => props.theme.colors.black_60};
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

const removeBorderBottom = keyframes`
  from {
    border-bottom-left-radius: ${(props) => props.theme.border_radius};
    border-bottom-right-radius: ${(props) => props.theme.border_radius};
  }

  to {
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  }
`;

const resetBorderBottom = keyframes`
  from {
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
    
  }

  to {
    border-bottom-left-radius: ${(props) => props.theme.border_radius};
    border-bottom-right-radius: ${(props) => props.theme.border_radius};
  }
`;

export const SelectContainer = styled.div<SelectContainerProps>`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 0 0.5rem;
  color: ${(props) => props.theme.colors.black_100};
  gap: 5px;
  border: 1px solid ${(props) => props.theme.colors.blue_60};
  border-radius: ${(props) => props.theme.border_radius};
  width: ${(props) => (props.$fullWidth ? "100%" : "240px")};
  position: relative;
  user-select: text;

  > svg {
    color: ${(props) => props.theme.colors.black_80};
  }

  &:hover {
    border: 1px solid ${(props) => props.theme.colors.blue_100};

    > svg {
      cursor: pointer;
    }
  }

  ${({ $error }) =>
    $error &&
    css`
      border: 1px solid ${(props) => props.theme.colors.red_60};

      &:hover {
        border: 1px solid ${(props) => props.theme.colors.red_100};
      }
    `}

  ${({ $openAnimation }) =>
    $openAnimation &&
    css`
      animation: ${removeBorderBottom} 200ms;
      animation-fill-mode: forwards;

      > svg {
        animation: ${openChevron} 200ms;
        animation-fill-mode: forwards;
      }
    `}

  ${({ $closeAnimation }) =>
    $closeAnimation &&
    css`
      animation: ${resetBorderBottom} 600ms;
      animation-fill-mode: forwards;

      > svg {
        animation: ${closeChevron} 200ms;
        animation-fill-mode: forwards;
      }
    `}
`;

export const ErrorMessageContainer = styled.div<WidthProps>`
  margin-top: 5px;
  width: ${(props) => (props.$fullWidth ? "100%" : "240px")};
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

export const OptionsContainer = styled.div<OptionsContainerProps>`
  position: absolute;
  width: ${(props) => (props.$fullWidth ? "100%" : "240px")};
  background: ${(props) => props.theme.colors.white};
  border-bottom-left-radius: ${(props) => props.theme.border_radius};
  border-bottom-right-radius: ${(props) => props.theme.border_radius};
  overflow: hidden;
  top: 0;
  left: 0;
  right: 0;
  max-height: 0;
  margin-top: 41px;
  transform: translateX(-1px);
  -moz-box-shadow: 0 2px 6px ${(props) => props.theme.colors.blue_60};
  -webkit-box-shadow: 0 2px 6px ${(props) => props.theme.colors.blue_60};
  box-shadow: 0 2px 6px ${(props) => props.theme.colors.blue_60};

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

export const Option = styled.div`
  border-bottom: 1px solid ${(props) => props.theme.colors.gray_80};
  width: 100%;
  height: 100%;

  > p {
    padding: 0.5rem 1rem;
  }

  &:hover {
    background: ${(props) => props.theme.colors.blue_80};
    color: ${(props) => props.theme.colors.white} !important;
    cursor: pointer;
  }

  &:last-child {
    border-bottom: none;
  }
`;

export const OptionText = styled(CustomText)`
  &:hover {
    color: ${(props) => props.theme.colors.white};
  }
`;
