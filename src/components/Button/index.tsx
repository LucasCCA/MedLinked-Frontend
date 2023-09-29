import { Calendar, Pen, Plus, Trash } from "lucide-react";
import { CustomLink, CustomText } from "..";
import { StyledButton } from "./styles";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  href?: string;
  children: React.ReactNode;
  color?: "red_80";
  icon?: "plus" | "pen" | "trash" | "calendar";
}

export function Button({ href, children, color, icon, ...props }: ButtonProps) {
  return (
    <>
      {!href && (
        <StyledButton $color={color} {...props}>
          {icon == "plus" && <Plus size={25} />}
          {icon == "pen" && <Pen size={25} />}
          {icon == "trash" && <Trash size={25} />}
          {icon == "calendar" && <Calendar size={25} />}
          <CustomText $color="white" $weight={500}>
            {children}
          </CustomText>
        </StyledButton>
      )}
      {href && (
        <StyledButton $color={color} {...props}>
          {icon == "plus" && <Plus size={25} />}
          {icon == "pen" && <Pen size={25} />}
          {icon == "trash" && <Trash size={25} />}
          {icon == "calendar" && <Calendar size={25} />}
          <CustomLink $color="white" $weight={500} href={href}>
            {children}
          </CustomLink>
        </StyledButton>
      )}
    </>
  );
}