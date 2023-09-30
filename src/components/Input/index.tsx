import {
  Asterisk,
  KeyRound,
  Mail,
  Phone,
  User2,
  UserCircle2,
} from "lucide-react";
import { InputHTMLAttributes } from "react";
import { InputContainer, StyledInput } from "./styles";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  icon?: "User2" | "Asterisk" | "Mail" | "Phone" | "UserCircle2" | "KeyRound";
  fullWidth?: boolean;
}

export function Input({ icon, fullWidth, ...props }: InputProps) {
  return (
    <InputContainer $fullWidth={fullWidth}>
      {icon == "User2" && <User2 />}
      {icon == "Asterisk" && <Asterisk />}
      {icon == "Mail" && <Mail />}
      {icon == "Phone" && <Phone />}
      {icon == "UserCircle2" && <UserCircle2 />}
      {icon == "KeyRound" && <KeyRound />}
      <StyledInput {...props} />
    </InputContainer>
  );
}
