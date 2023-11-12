"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import {
  Button,
  Container,
  CustomLink,
  CustomText,
  Input,
} from "@medlinked/components";
import { passwordResetTokenSchema } from "@medlinked/schemas";
import { sendEmail } from "@medlinked/services";
import { CreateResetToken } from "@medlinked/types";
import Cookies from "js-cookie";
import Image from "next/image";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import {
  BlueBackground,
  Form,
  HeaderContainer,
  LinkContainer,
  LogoContainer,
  PageContentContainer,
  WhiteContainer,
} from "../styles";

export default function Page() {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateResetToken>({
    resolver: yupResolver(passwordResetTokenSchema),
  });

  const onSubmit: SubmitHandler<CreateResetToken> = (data) => {
    setLoading(true);

    sendEmail(data)
      .then((response) => {
        Cookies.set("resetToken", response.data);
        toast.success("Email de recuperação enviado!");
      })
      .catch((error) => {
        if (error.response?.data) toast.error(error.response.data);
        else
          toast.error(
            "Ocorreu um erro no envio do email. Tente novamente mais tarde.",
          );
      })
      .finally(() => setLoading(false));
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
              Recuperar senha
            </CustomText>
            <Form onSubmit={handleSubmit(onSubmit)}>
              <CustomText $align="center">
                Para recuperar sua senha informe o usuário cadastrado na sua
                conta. Um email com o link de recuperação será enviado para a
                conta de email vinculada a esse usuário
              </CustomText>
              <Input
                icon="UserCircle2"
                placeholder="Digite seu usuário *"
                fullWidth
                type="text"
                maxLength={120}
                register={{ ...register("username") }}
                hasError={Boolean(errors.username)}
                errorMessage={errors.username?.message}
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
                Enviar email
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
