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

type OptionProps = {
  $selected: boolean;
};

type SelectContainerProps = WidthProps & ErrorProps & AnimationProps;

type OptionsContainerProps = WidthProps & AnimationProps;

export const StyledInput = styled.input`
  border: none;
  outline: none;
  width: 100%;
  font-family: inherit;
  padding: 0.75rem 0 0.75rem 0.5rem;
  background: none;

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
  z-index: 7;

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
      z-index: 8;
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
    max-height: 180px;
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
  -moz-box-shadow: 0 2px 6px ${(props) => props.theme.colors.blue_60};
  -webkit-box-shadow: 0 2px 6px ${(props) => props.theme.colors.blue_60};
  box-shadow: 0 2px 6px ${(props) => props.theme.colors.blue_60};
  overflow-y: scroll;

  &::-webkit-scrollbar {
    width: 5px;
  }

  &::-webkit-scrollbar-track {
    background-color: ${(props) => props.theme.colors.gray_60};
    border-bottom-right-radius: ${(props) => props.theme.border_radius};
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${(props) => props.theme.colors.gray_100};
    border-bottom-right-radius: ${(props) => props.theme.border_radius};
  }

  ${({ $openAnimation }) =>
    $openAnimation &&
    css`
      animation: ${showOptions} 400ms;
      animation-fill-mode: forwards;
    `}

  ${({ $closeAnimation }) =>
    $closeAnimation &&
    css`
      max-height: 0;
    `}
`;

export const Option = styled.div<OptionProps>`
  width: 100%;
  height: 100%;

  > p {
    padding: 0.75rem 1rem;
  }

  &:hover {
    background: ${(props) => props.theme.colors.blue_60};
    cursor: pointer;
  }

  &:last-child {
    border-bottom: none;
  }

  ${({ $selected }) =>
    $selected &&
    css`
      background: ${(props) => props.theme.colors.blue_80};
    `}
`;

export const NoOptionContainer = styled.div`
  width: 100%;
  height: 100%;
  user-select: none;

  > p {
    padding: 0.5rem 1rem;
  }
`;

export const OptionText = styled(CustomText)<OptionProps>`
  &:hover {
    color: ${(props) => props.theme.colors.white};
  }

  ${({ $selected }) =>
    $selected &&
    css`
      color: ${(props) => props.theme.colors.white};
    `}
`;

export const StyledSelect = styled.select`
  display: none;
`;
