"use client";

import { ChevronDown } from "lucide-react";
import { HTMLAttributes, useState } from "react";
import { useDetectClickOutside } from "react-detect-click-outside";
import { CustomText } from "..";
import {
  ErrorMessageContainer,
  NoOptionContainer,
  Option,
  OptionText,
  OptionsContainer,
  SelectContainer,
  StyledInput,
  StyledSelect,
} from "./styles";

type OptionData = {
  label: string;
  value: string;
};

interface SelectProps extends HTMLAttributes<HTMLSelectElement> {
  fullWidth?: boolean;
  errorMessage?: string;
  options: OptionData[];
  hasError?: boolean;
  disabled?: boolean;
  defaultSelected?: OptionData;
  readOnly?: boolean;
}

export function Select({
  fullWidth,
  errorMessage,
  options,
  hasError,
  disabled,
  defaultSelected,
  readOnly,
  placeholder,
  ...props
}: SelectProps) {
  const [openAnimation, setOpenAnimation] = useState(false);
  const [closeAnimation, setCloseAnimation] = useState(false);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<OptionData | undefined>(
    defaultSelected,
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
    <>
      <StyledSelect {...props} defaultValue={selected?.value}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </StyledSelect>
      <SelectContainer
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
          placeholder={placeholder}
          value={selected ? selected.label : search}
          onChange={(e) => {
            setSearch(e.currentTarget.value);
            setSelected(undefined);
          }}
          readOnly={readOnly}
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
              <CustomText>Nenhuma opção encontrada</CustomText>
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
                  $selected={selected?.value == option.value}
                  onClick={() => {
                    setSelected(option);
                    setSearch("");
                    if (openAnimation) {
                      setOpenAnimation(false);
                      setCloseAnimation(true);
                    }
                  }}
                >
                  <OptionText $selected={selected?.value == option.value}>
                    {option.label}
                  </OptionText>
                </Option>
              ))}
        </OptionsContainer>
      </SelectContainer>
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
