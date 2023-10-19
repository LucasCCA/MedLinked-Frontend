"use client";

import { ChevronDown } from "lucide-react";
import { Dispatch, HTMLAttributes, SetStateAction, useState } from "react";
import { useDetectClickOutside } from "react-detect-click-outside";
import { CustomText, Input } from "..";
import {
  ErrorMessageContainer,
  NoOptionContainer,
  Option,
  OptionText,
  OptionsContainer,
  SearchContainer,
  SelectAndErrorContainer,
  SelectContainer,
  StyledInput,
  StyledSelect,
} from "./styles";

type OptionData = {
  label: string;
  value: number;
};

interface SelectProps extends HTMLAttributes<HTMLSelectElement> {
  fullWidth?: boolean;
  errorMessage?: string;
  options: OptionData[];
  hasError?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  selected: number;
  setSelected: Dispatch<SetStateAction<number>>;
}

export function Select({
  fullWidth,
  errorMessage,
  options,
  hasError,
  disabled,
  readOnly,
  placeholder,
  selected,
  setSelected,
  ...props
}: SelectProps) {
  const [openAnimation, setOpenAnimation] = useState(false);
  const [closeAnimation, setCloseAnimation] = useState(false);
  const [search, setSearch] = useState("");
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
      <StyledSelect {...props} defaultValue={selected}>
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
          value={
            options.find((option) => option.value == selected) == undefined
              ? ""
              : options.find((option) => option.value == selected)!.label
          }
          readOnly
          onClick={() => {
            if (openAnimation) {
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
          <SearchContainer $readOnly={readOnly}>
            <Input
              icon={"Search"}
              value={search}
              placeholder="Pesquisar..."
              onChange={(e) => {
                setSearch(e.currentTarget.value);
              }}
              fullWidth
            />
          </SearchContainer>
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
                  $selected={selected == option.value}
                  onClick={() => {
                    setSelected(option.value);
                    setSearch("");
                    if (openAnimation) {
                      setOpenAnimation(false);
                      setCloseAnimation(true);
                    }
                  }}
                >
                  <OptionText
                    $selected={selected == option.value}
                    $align="left"
                  >
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
    </SelectAndErrorContainer>
  );
}
