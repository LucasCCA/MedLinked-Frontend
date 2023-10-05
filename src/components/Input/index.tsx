"use client";

import {
  Asterisk,
  KeyRound,
  Mail,
  Phone,
  User2,
  UserCircle2,
} from "lucide-react";
import { InputHTMLAttributes } from "react";
import { CustomText } from "..";
import { ErrorMessageContainer, InputContainer, StyledInput } from "./styles";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  icon?: "User2" | "Asterisk" | "Mail" | "Phone" | "UserCircle2" | "KeyRound";
  fullWidth?: boolean;
  errorMessage?: string;
  hasError?: boolean;
}

export function Input({
  icon,
  fullWidth,
  errorMessage,
  hasError,
  ...props
}: InputProps) {
  return (
    <>
      <InputContainer $fullWidth={fullWidth} $error={hasError}>
        {icon == "User2" && <User2 />}
        {icon == "Asterisk" && <Asterisk />}
        {icon == "Mail" && <Mail />}
        {icon == "Phone" && <Phone />}
        {icon == "UserCircle2" && <UserCircle2 />}
        {icon == "KeyRound" && <KeyRound />}
        <StyledInput {...props} />
      </InputContainer>
      {hasError && (
        <ErrorMessageContainer>
          <CustomText $size="h5" $color="red_80">
            {errorMessage}
          </CustomText>
        </ErrorMessageContainer>
      )}
    </>
  );
}
