import React from "react";
import { StyledText } from "./styles";

type TextProps = {
  color?: "black_80" | "white";
  fontWeight?: number;
  children: React.ReactNode;
};

export function Text({ color, fontWeight, children }: TextProps) {
  return (
    <StyledText color={color} fontWeight={fontWeight}>
      {children}
    </StyledText>
  );
}
