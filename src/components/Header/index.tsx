import { ChevronDown, LogOut, UserCircle2, UserCog2 } from "lucide-react";
import { useState } from "react";
import { useDetectClickOutside } from "react-detect-click-outside";
import { CustomText } from "..";
import {
  ChevronContainer,
  ClickableContainer,
  DropdownContainer,
  HeaderContainer,
  NameContainer,
  Option,
  UserContainer,
} from "./styles";

type HeaderProps = {
  username: string;
};

export function Header({ username }: HeaderProps) {
  const [openAnimation, setOpenAnimation] = useState(false);
  const [closeAnimation, setCloseAnimation] = useState(false);
  const ref = useDetectClickOutside({
    onTriggered: () => {
      if (openAnimation) {
        setOpenAnimation(false);
        setCloseAnimation(true);
      }
    },
  });

  return (
    <HeaderContainer>
      <UserContainer ref={ref}>
        <ClickableContainer
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
          <UserCircle2 size={30} />
          <ChevronContainer
            $openAnimation={openAnimation}
            $closeAnimation={closeAnimation}
          >
            <ChevronDown />
          </ChevronContainer>
        </ClickableContainer>
        <DropdownContainer
          $openAnimation={openAnimation}
          $closeAnimation={closeAnimation}
        >
          <NameContainer>
            <CustomText $align="left">{username}</CustomText>
          </NameContainer>
          <Option href="">
            <UserCog2 />
            <CustomText $color="black_80">Perfil</CustomText>
          </Option>
          <Option href="">
            <LogOut />
            <CustomText $color="black_80">Sair</CustomText>
          </Option>
        </DropdownContainer>
      </UserContainer>
    </HeaderContainer>
  );
}
