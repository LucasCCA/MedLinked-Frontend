"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import {
  Button,
  Container,
  CustomLink,
  CustomText,
  Input,
} from "@medlinked/components";
import { loginSchema } from "@medlinked/schemas";
import { authenticate } from "@medlinked/services";
import { Usuario } from "@medlinked/types";
import Cookies from "js-cookie";
import Image from "next/image";
import { useRouter } from "next/navigation";
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
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Usuario>({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit: SubmitHandler<Usuario> = (data) => {
    setLoading(true);

    authenticate(data)
      .then((response) => {
        Cookies.set("token", response.data.token);
        router.push("/admin/agenda");
      })
      .catch(() => {
        toast.error("Usuário ou senha incorretos.");
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
                conta. Um email com instruções de recuperação será enviado para
                a conta de email vinculada a esse usuário
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
