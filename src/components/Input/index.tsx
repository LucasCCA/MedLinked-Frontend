"use client";

import {
  Asterisk,
  KeyRound,
  Mail,
  Phone,
  Search,
  User2,
  UserCircle2,
} from "lucide-react";
import { InputHTMLAttributes } from "react";
import { UseFormRegisterReturn } from "react-hook-form";
import { CustomText } from "..";
import {
  ErrorMessageContainer,
  InputAndErrorContainer,
  InputContainer,
  StyledInput,
} from "./styles";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  icon?:
    | "User2"
    | "Asterisk"
    | "Mail"
    | "Phone"
    | "UserCircle2"
    | "KeyRound"
    | "Search";
  fullWidth?: boolean;
  errorMessage?: string;
  hasError?: boolean;
  register?: UseFormRegisterReturn<string>;
}

export function Input({
  icon,
  fullWidth,
  errorMessage,
  hasError,
  disabled,
  register,
  ...props
}: InputProps) {
  return (
    <InputAndErrorContainer $fullWidth={fullWidth}>
      <InputContainer
        $fullWidth={fullWidth}
        $error={hasError}
        $disabled={disabled}
      >
        {icon == "User2" && <User2 />}
        {icon == "Asterisk" && <Asterisk />}
        {icon == "Mail" && <Mail />}
        {icon == "Phone" && <Phone />}
        {icon == "UserCircle2" && <UserCircle2 />}
        {icon == "KeyRound" && <KeyRound />}
        {icon == "Search" && <Search />}
        <StyledInput {...props} {...register} />
      </InputContainer>
      {hasError && (
        <ErrorMessageContainer $fullWidth={fullWidth}>
          <CustomText $size="h5" $color="red_80">
            {errorMessage}
          </CustomText>
        </ErrorMessageContainer>
      )}
    </InputAndErrorContainer>
  );
}
