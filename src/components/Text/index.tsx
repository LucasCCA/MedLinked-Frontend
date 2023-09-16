import React from "react";
import { StyledText } from "./styles";

type TextProps = {
  color?:
    | "black_100"
    | "black_80"
    | "black_60"
    | "white"
    | "blue_100"
    | "blue_80"
    | "blue_60";
  children: React.ReactNode;
};

export function Text({ color, children }: TextProps) {
  return <StyledText color={color}>{children}</StyledText>;
}
