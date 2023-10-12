"use client";

import {
  Button,
  Container,
  CustomLink,
  CustomText,
  Input,
} from "@medlinked/components";
import Image from "next/image";
import {
  BlueBackground,
  FormContainer,
  HeaderContainer,
  LogoContainer,
  PageContentContainer,
  WhiteContainer,
} from "./styles";

export default function Page() {
  return (
    <BlueBackground>
      <HeaderContainer>
        <CustomLink href="">
          <LogoContainer>
            <Image
              src="/images/icon.png"
              alt="Logo Medlinked"
              width={31}
              height={31}
              quality={100}
              priority
            />
            <CustomText $color="white" $size="h3" $weight={500}>
              MedLinked
            </CustomText>
          </LogoContainer>
        </CustomLink>
      </HeaderContainer>
      <PageContentContainer>
        <Container>
          <WhiteContainer>
            <CustomText $size="h2" $align="center">
              Login
            </CustomText>
            <FormContainer>
              <Input
                icon="UserCircle2"
                placeholder="Digite seu usuário *"
                fullWidth
                type="text"
                maxLength={120}
              />
              <Input
                icon="KeyRound"
                placeholder="Digite sua senha *"
                fullWidth
                type="password"
                maxLength={200}
              />
              <CustomText $weight={500} $align="center">
                * Campo Obrigatório
              </CustomText>
              <Button textAlign="center" fullWidth type="submit">
                Entrar
              </Button>
            </FormContainer>
            <CustomText $weight={500} $align="center">
              Ainda não possui cadastro?{" "}
              <CustomLink href="/cadastro">Cadastre-se agora!</CustomLink>
            </CustomText>
          </WhiteContainer>
        </Container>
      </PageContentContainer>
    </BlueBackground>
  );
}
