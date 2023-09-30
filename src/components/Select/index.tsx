import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { CustomText } from "..";
import {
  ErrorMessageContainer,
  Option,
  OptionText,
  OptionsContainer,
  SelectContainer,
  StyledInput,
} from "./styles";

type SelectProps = {
  fullWidth?: boolean;
  errorMessage?: string;
};

export function Select({ fullWidth, errorMessage, ...props }: SelectProps) {
  const [openAnimation, setOpenAnimation] = useState(false);
  const [closeAnimation, setCloseAnimation] = useState(false);

  return (
    <>
      <SelectContainer
        $fullWidth={fullWidth}
        $error={errorMessage != null}
        $openAnimation={openAnimation}
        $closeAnimation={closeAnimation}
        onClick={() => {
          if (openAnimation) {
            setOpenAnimation(false);
            setCloseAnimation(true);
          } else {
            setOpenAnimation(true);
            setCloseAnimation(false);
          }
        }}
      >
        <StyledInput {...props} />
        <ChevronDown size={30} />
        <OptionsContainer
          $openAnimation={openAnimation}
          $closeAnimation={closeAnimation}
        >
          <Option>
            <OptionText>teste</OptionText>
          </Option>
          <Option>
            <OptionText>teste</OptionText>
          </Option>
        </OptionsContainer>
      </SelectContainer>
      {errorMessage != null && (
        <ErrorMessageContainer>
          <CustomText $size="h5" $color="red_80">
            {errorMessage}
          </CustomText>
        </ErrorMessageContainer>
      )}
    </>
  );
}
