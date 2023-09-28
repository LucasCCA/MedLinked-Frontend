import { breakpoints } from "@medlinked/config";
import styled, { css } from "styled-components";

type ContainerProps = {
  $header?: boolean;
};

export const ContainerStyles = styled.div<ContainerProps>`
  margin: 1rem 1rem;

  @media ${breakpoints.md} {
    margin: 1rem 1.5rem;
  }

  @media ${breakpoints.lg} {
    margin: 1rem 3rem;
  }

  ${({ $header }) =>
    $header &&
    css`
      margin-top: 0 !important;
      margin-bottom: 0 !important;
    `}
`;
