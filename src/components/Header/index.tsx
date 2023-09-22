import { ChevronDown, LogOut, UserCircle2 } from "lucide-react";
import { useState } from "react";
import { Text } from "..";
import {
  ChevronContainer,
  ClickableContainer,
  HeaderContainer,
  Option,
  OptionsContainer,
  UserContainer,
} from "./styles";

type HeaderProps = {
  username: string;
};

export function Header({ username }: HeaderProps) {
  const [openAnimation, setOpenAnimation] = useState(false);
  const [closeAnimation, setCloseAnimation] = useState(false);

  return (
    <HeaderContainer>
      <UserContainer>
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
          <Text color="white">{username}</Text>
          <ChevronContainer
            openAnimation={openAnimation}
            closeAnimation={closeAnimation}
          >
            <ChevronDown />
          </ChevronContainer>
        </ClickableContainer>
        {/* {openAnimation && ( */}
        <OptionsContainer
          openAnimation={openAnimation}
          closeAnimation={closeAnimation}
        >
          <div>
            <Option>
              <UserCircle2 />
              <Text color="black_80">Perfil</Text>
            </Option>
            <Option>
              <LogOut />
              <Text color="black_80">Sair</Text>
            </Option>
          </div>
        </OptionsContainer>
        {/* )} */}
      </UserContainer>
    </HeaderContainer>
  );
}
