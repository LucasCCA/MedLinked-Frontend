"use client";

import {
  Button,
  Container,
  CustomLink,
  CustomText,
  Input,
} from "@medlinked/components";
import { cpfMask, phoneNumberMask } from "@medlinked/utils";
import Image from "next/image";
import { useState } from "react";
import {
  BlueBackground,
  FormContainer,
  HeaderContainer,
  LogoContainer,
  PageContentContainer,
  WhiteContainer,
} from "../styles";

export default function Page() {
  const [cpf, setCpf] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

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
                maxLength={120}
              />
              <Input
                icon="Asterisk"
                placeholder="Digite seu CPF *"
                fullWidth
                maxLength={14}
                value={cpf}
                onChange={(e) => setCpf(cpfMask(e.currentTarget.value))}
                type="text"
              />
              <Input
                icon="Mail"
                placeholder="Digite seu email *"
                fullWidth
                type="email"
                maxLength={120}
              />
              <Input
                icon="Phone"
                type="tel"
                placeholder="Digite seu telefone"
                fullWidth
                maxLength={17}
                value={phoneNumber}
                onChange={(e) =>
                  setPhoneNumber(phoneNumberMask(e.currentTarget.value))
                }
              />
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
