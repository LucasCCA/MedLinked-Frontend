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
} from "../styles";

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
              Cadastro
            </CustomText>
            <FormContainer>
              <Input
                icon="User2"
                placeholder="Digite seu nome *"
                fullWidth
                type="text"
              />
              <Input
                icon="Asterisk"
                placeholder="Digite seu CPF *"
                fullWidth
                type="text"
              />
              <Input
                icon="Mail"
                placeholder="Digite seu email *"
                fullWidth
                type="email"
              />
              <Input
                icon="Phone"
                placeholder="Digite seu telefone"
                fullWidth
                type="tel"
              />
              <Input
                icon="UserCircle2"
                placeholder="Digite seu usuário *"
                fullWidth
                type="text"
              />
              <Input
                icon="KeyRound"
                placeholder="Digite sua senha *"
                fullWidth
                type="password"
              />
              <CustomText $weight={500} $align="center">
                * Campo Obrigatório
              </CustomText>
              <Button textAlign="center" fullWidth type="submit">
                Cadastrar
              </Button>
            </FormContainer>
            <CustomText $weight={500} $align="center">
              Já possui um cadastro?{" "}
              <CustomLink href="/">Faça login!</CustomLink>
            </CustomText>
          </WhiteContainer>
        </Container>
      </PageContentContainer>
    </BlueBackground>
  );
}
