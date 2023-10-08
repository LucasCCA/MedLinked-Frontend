import styled, { keyframes } from "styled-components";

export const SpinnerContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 5rem 0;
`;

const spin = keyframes`
  from {
    transform: rotate(0);
  }

  to {
    transform: rotate(360deg);
  }
`;

export const SpinnerStyles = styled.div`
  border: 8px solid ${(props) => props.theme.colors.gray_60};
  border-top: 8px solid ${(props) => props.theme.colors.blue_100};
  border-radius: 50%;
  width: 80px;
  height: 80px;
  animation: ${spin} 1s linear infinite;
`;
