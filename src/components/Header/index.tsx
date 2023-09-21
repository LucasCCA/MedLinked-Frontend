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

export function Header() {
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
          <Text color="white">Usuário</Text>
          <ChevronContainer
            openAnimation={openAnimation}
            closeAnimation={closeAnimation}
          >
            <ChevronDown />
          </ChevronContainer>
        </ClickableContainer>
        {openAnimation && (
          <OptionsContainer>
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
        )}
      </UserContainer>
    </HeaderContainer>
  );
}
