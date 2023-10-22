"use client";

import { ChevronDown } from "lucide-react";
import { Dispatch, HTMLAttributes, SetStateAction, useState } from "react";
import { useDetectClickOutside } from "react-detect-click-outside";
import { UseFormRegisterReturn } from "react-hook-form";
import { CustomText } from "..";
import {
  ErrorMessageContainer,
  NoOptionContainer,
  Option,
  OptionText,
  OptionsContainer,
  SelectAndErrorContainer,
  SelectContainer,
  StyledInput,
  StyledSelect,
} from "./styles";

export type OptionData = {
  label: string;
  value: string;
};

interface SelectProps extends HTMLAttributes<HTMLSelectElement> {
  fullWidth?: boolean;
  errorMessage?: string;
  options: OptionData[];
  hasError?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  outsideSelected?: OptionData;
  setOutsideSelected?: Dispatch<SetStateAction<OptionData>>;
  register?: UseFormRegisterReturn<string>;
}

export function Select({
  fullWidth,
  errorMessage,
  options,
  hasError,
  disabled,
  readOnly,
  placeholder,
  outsideSelected,
  setOutsideSelected,
  register,
  ...props
}: SelectProps) {
  const [openAnimation, setOpenAnimation] = useState(false);
  const [closeAnimation, setCloseAnimation] = useState(false);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<OptionData>(
    outsideSelected || { label: "", value: "" },
  );
  const ref = useDetectClickOutside({
    onTriggered: () => {
      if (openAnimation) {
        setOpenAnimation(false);
        setCloseAnimation(true);
      }
    },
  });

  return (
    <SelectAndErrorContainer $fullWidth={fullWidth}>
      <StyledSelect {...props} {...register}>
        <option value={""} />
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </StyledSelect>
      <SelectContainer
        {...register}
        $fullWidth={fullWidth}
        $error={hasError}
        $openAnimation={openAnimation}
        $closeAnimation={closeAnimation}
        $disabled={disabled}
        $readOnly={readOnly}
        onClick={() => {
          if (!openAnimation) {
            setOpenAnimation(true);
            setCloseAnimation(false);
          }
        }}
        ref={ref}
      >
        <StyledInput
          autoComplete="off"
          placeholder={placeholder}
          value={selected.value != "" ? selected.label : search}
          readOnly={readOnly}
          onChange={(e) => {
            setSearch(e.currentTarget.value);
            setSelected({ label: "", value: "" });
            if (setOutsideSelected != undefined)
              setOutsideSelected({ label: "", value: "" });
          }}
          onClick={() => {
            if (readOnly && openAnimation) {
              setOpenAnimation(false);
              setCloseAnimation(true);
            }
          }}
        />
        <ChevronDown
          size={30}
          onClick={() => {
            if (openAnimation) {
              setOpenAnimation(false);
              setCloseAnimation(true);
            } else {
              setOpenAnimation(true);
              setCloseAnimation(false);
            }
          }}
        />
        <OptionsContainer
          $openAnimation={openAnimation}
          $closeAnimation={closeAnimation}
          $fullWidth={fullWidth}
        >
          {options?.filter((option) =>
            option.label
              .toLowerCase()
              .trimEnd()
              .includes(search.toLowerCase().trimEnd()),
          ).length == 0 && (
            <NoOptionContainer>
              <CustomText $align="left">Nenhuma opção encontrada</CustomText>
            </NoOptionContainer>
          )}
          {options?.length > 0 &&
            options
              .filter((option) =>
                option.label
                  .toLowerCase()
                  .trimEnd()
                  .includes(search.toLowerCase().trimEnd()),
              )
              .map((option) => (
                <Option
                  key={option.value}
                  $selected={selected.value == option.value}
                  onClick={() => {
                    setSearch("");
                    setSelected(option);
                    if (setOutsideSelected != undefined)
                      setOutsideSelected(option);
                    if (openAnimation) {
                      setOpenAnimation(false);
                      setCloseAnimation(true);
                    }
                  }}
                >
                  <OptionText
                    $selected={selected?.value == option.value}
                    $align="left"
                  >
                    {option.label}
                  </OptionText>
                </Option>
              ))}
        </OptionsContainer>
      </SelectContainer>
      {hasError && (
        <ErrorMessageContainer $fullWidth={fullWidth}>
          <CustomText $size="h5" $color="red_80">
            {errorMessage}
          </CustomText>
        </ErrorMessageContainer>
      )}
    </SelectAndErrorContainer>
  );
}
