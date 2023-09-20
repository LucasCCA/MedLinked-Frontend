import { ChevronDown } from "lucide-react";
import { Text } from "../Text";
import { HeaderContainer, UserContainer } from "./styles";

export function Header() {
  return (
    <HeaderContainer>
      <UserContainer>
        <Text color="white">Usuário</Text>
        <ChevronDown />
      </UserContainer>
    </HeaderContainer>
  );
}
