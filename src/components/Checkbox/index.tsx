"use client";

import { X } from "lucide-react";
import { Dispatch, InputHTMLAttributes, SetStateAction, useState } from "react";
import { UseFormRegisterReturn } from "react-hook-form";
import { CustomText } from "..";
import {
  CheckboxAndErrorContainer,
  CheckboxAndLabelContainer,
  CheckboxContainer,
  ErrorMessageContainer,
  StyledCheckbox,
} from "./styles";

interface CheckboxProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  errorMessage?: string;
  hasError?: boolean;
  register?: UseFormRegisterReturn<string>;
  label: string;
  outsideSelected?: boolean;
  setOutsideSelected?: Dispatch<SetStateAction<boolean>>;
}

export function Checkbox({
  errorMessage,
  hasError,
  disabled,
  register,
  label,
  outsideSelected,
  setOutsideSelected,
  ...props
}: CheckboxProps) {
  const [checked, setChecked] = useState(outsideSelected || false);

  return (
    <>
      <StyledCheckbox type="checkbox" {...props} {...register} />
      <CheckboxAndErrorContainer>
        <CheckboxAndLabelContainer>
          <CheckboxContainer
            $error={hasError}
            $disabled={disabled}
            $checked={checked}
            onClick={() => {
              setChecked(!checked);
              if (setOutsideSelected != undefined)
                setOutsideSelected(!outsideSelected);
            }}
          >
            {checked && <X size={20} />}
          </CheckboxContainer>
          <CustomText $size="h5">{label}</CustomText>
        </CheckboxAndLabelContainer>
        {hasError && (
          <ErrorMessageContainer>
            <CustomText $size="h5" $color="red_80">
              {errorMessage}
            </CustomText>
          </ErrorMessageContainer>
        )}
      </CheckboxAndErrorContainer>
    </>
  );
}
