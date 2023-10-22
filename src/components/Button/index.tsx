"use client";

import { Calendar, Pen, Plus, Search, Trash, Unlink } from "lucide-react";
import { CustomLink, CustomText } from "..";
import { StyledButton } from "./styles";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  href?: string;
  children: React.ReactNode;
  color?: "red_80";
  icon?: "Plus" | "Pen" | "Trash" | "Calendar" | "Search" | "Unlink";
  fullWidth?: boolean;
  textAlign?: "center";
}

export function Button({
  href,
  children,
  color,
  icon,
  fullWidth,
  textAlign,
  ...props
}: ButtonProps) {
  return (
    <>
      {!href && (
        <StyledButton
          $color={color}
          $fullWidth={fullWidth}
          $textAlign={textAlign}
          {...props}
        >
          <CustomText $color="white">
            {icon == "Plus" && <Plus size={25} />}
            {icon == "Pen" && <Pen size={25} />}
            {icon == "Trash" && <Trash size={25} />}
            {icon == "Calendar" && <Calendar size={25} />}
            {icon == "Search" && <Search size={25} />}
            {icon == "Unlink" && <Unlink size={25} />}
            {children}
          </CustomText>
        </StyledButton>
      )}
      {href && (
        <StyledButton
          $color={color}
          $fullWidth={fullWidth}
          $hasLink={href != ""}
          $textAlign={textAlign}
          {...props}
        >
          <CustomLink $color="white" href={href}>
            {icon == "Plus" && <Plus size={25} />}
            {icon == "Pen" && <Pen size={25} />}
            {icon == "Trash" && <Trash size={25} />}
            {icon == "Calendar" && <Calendar size={25} />}
            {icon == "Search" && <Search size={25} />}
            {icon == "Unlink" && <Unlink size={25} />}
            {children}
          </CustomLink>
        </StyledButton>
      )}
    </>
  );
}
