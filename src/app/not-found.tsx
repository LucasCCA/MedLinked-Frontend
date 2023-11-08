"use client";

import {
  Button,
  Container,
  CustomLink,
  CustomText,
  NoResults,
} from "@medlinked/components";
import Image from "next/image";
import {
  BlueBackground,
  HeaderContainer,
  LogoContainer,
  PageContentContainer,
  WhiteContainer,
} from "./styles";

export default function NotFound() {
  return (
    <>
      <BlueBackground>
        <HeaderContainer>
          <CustomLink href="/">
            <LogoContainer>
              <Image
                src="/images/icon.png"
                alt="Logo Medlinked"
                width={30}
                height={30}
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
              <NoResults message="Erro 404 - Página não encontrada" />
              <Button href="/" textAlign="center" fullWidth>
                Voltar para o início
              </Button>
            </WhiteContainer>
          </Container>
        </PageContentContainer>
      </BlueBackground>
    </>
  );
}
