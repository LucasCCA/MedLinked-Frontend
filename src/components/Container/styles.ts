import { breakpoints } from "@medlinked/config";
import styled, { css } from "styled-components";

type ContainerProps = {
  $header?: boolean;
};

export const ContainerStyles = styled.div<ContainerProps>`
  margin: calc(1rem + 78px) 1rem;

  @media ${breakpoints.md} {
    margin: calc(1rem + 78px) 1.5rem;
  }

  @media ${breakpoints.lg} {
    margin: calc(1rem + 78px) 3rem;
  }

  ${({ $header }) =>
    $header &&
    css`
      margin-top: 0 !important;
      margin-bottom: 0 !important;
    `}
`;
