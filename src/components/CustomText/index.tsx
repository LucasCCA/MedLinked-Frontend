import React from "react";
import { StyledText } from "./styles";

type TextProps = {
  color?: "black_80" | "black_60" | "white";
  weight?: number;
  size?: "h1" | "h2" | "h3" | "h5" | "h6";
  align?: "center" | "left";
  children: React.ReactNode;
};

export function CustomText({
  color,
  weight,
  size,
  align,
  children,
}: TextProps) {
  return (
    <StyledText $color={color} $weight={weight} $size={size} $align={align}>
      {children}
    </StyledText>
  );
}
