import Link from "next/link";
import styled from "styled-components";
import { TextStylesProps, baseTextStyles } from "../styles";

export const StyledLink = styled(Link)<TextStylesProps>`
  text-decoration: none;
  color: ${(props) => props.theme.colors.light_blue_80};

  &:hover {
    color: ${(props) => props.theme.colors.light_blue_100};
  }

  ${baseTextStyles}
`;
