import React from "react";
import { StyledText } from "./styles";

type TextProps = {
  color?: "black_80" | "white";
  fontWeight?: number;
  fontSize?: "h1" | "h2" | "h3" | "h5" | "h6";
  children: React.ReactNode;
};

export function Text({ color, fontWeight, fontSize, children }: TextProps) {
  return (
    <StyledText color={color} fontWeight={fontWeight} fontSize={fontSize}>
      {children}
    </StyledText>
  );
}
