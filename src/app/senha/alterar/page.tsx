"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import {
  Button,
  Container,
  CustomLink,
  CustomText,
  Input,
} from "@medlinked/components";
import { newPasswordSchema } from "@medlinked/schemas";
import { CreateNewPassword } from "@medlinked/types";
import Image from "next/image";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  BlueBackground,
  Form,
  HeaderContainer,
  LinkContainer,
  LogoContainer,
  PageContentContainer,
  WhiteContainer,
} from "../../styles";

export default function Page() {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateNewPassword>({
    resolver: yupResolver(newPasswordSchema),
  });

  const onSubmit: SubmitHandler<CreateNewPassword> = (data) => {
    setLoading(true);
    console.log(data);

    // sendEmail(data)
    //   .then((response) => {
    //     Cookies.set("resetToken", response.data);
    //     toast.success("Email de recuperação enviado!");
    //   })
    //   .catch(() => {
    //     toast.error("Usuário não existe.");
    //   })
    //   .finally(() => setLoading(false));
  };

  return (
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
            <CustomText $size="h2" $align="center">
              Alterar senha
            </CustomText>
            <Form onSubmit={handleSubmit(onSubmit)}>
              <Input
                icon="KeyRound"
                placeholder="Digite sua nova senha *"
                fullWidth
                type="password"
                maxLength={200}
                register={{ ...register("password") }}
                hasError={Boolean(errors.password)}
                errorMessage={errors.password?.message}
                autoComplete="off"
              />
              <Input
                icon="KeyRound"
                placeholder="Repita sua nova senha *"
                fullWidth
                type="password"
                maxLength={200}
                register={{ ...register("repeatedPassword") }}
                hasError={Boolean(errors.repeatedPassword)}
                errorMessage={errors.repeatedPassword?.message}
                autoComplete="off"
              />
              <CustomText $weight={500} $align="center">
                * Campo Obrigatório
              </CustomText>
              <Button
                textAlign="center"
                fullWidth
                type="submit"
                disabled={loading}
              >
                Alterar senha
              </Button>
            </Form>
            <LinkContainer>
              <CustomLink href="/" $align="center">
                Voltar ao login
              </CustomLink>
            </LinkContainer>
          </WhiteContainer>
        </Container>
      </PageContentContainer>
    </BlueBackground>
  );
}
