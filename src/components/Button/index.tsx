"use client";

import { Calendar, Pen, Plus, Trash } from "lucide-react";
import { CustomLink, CustomText } from "..";
import { StyledButton } from "./styles";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  href?: string;
  children: React.ReactNode;
  color?: "red_80";
  icon?: "plus" | "pen" | "trash" | "calendar";
  fullWidth?: boolean;
}

export function Button({
  href,
  children,
  color,
  icon,
  fullWidth,
  ...props
}: ButtonProps) {
  return (
    <>
      {!href && (
        <StyledButton $color={color} $fullWidth={fullWidth} {...props}>
          {icon == "plus" && <Plus size={25} />}
          {icon == "pen" && <Pen size={25} />}
          {icon == "trash" && <Trash size={25} />}
          {icon == "calendar" && <Calendar size={25} />}
          <CustomText $color="white">{children}</CustomText>
        </StyledButton>
      )}
      {href && (
        <StyledButton
          $color={color}
          $fullWidth={fullWidth}
          {...props}
          $hasLink={href != ""}
        >
          {icon == "plus" && <Plus size={25} />}
          {icon == "pen" && <Pen size={25} />}
          {icon == "trash" && <Trash size={25} />}
          {icon == "calendar" && <Calendar size={25} />}
          <CustomLink $color="white" href={href}>
            {children}
          </CustomLink>
        </StyledButton>
      )}
    </>
  );
}
