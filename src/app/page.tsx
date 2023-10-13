"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import { medlinked } from "@medlinked/api";
import {
  Button,
  Container,
  CustomLink,
  CustomText,
  Input,
} from "@medlinked/components";
import { loginSchema } from "@medlinked/schemas";
import { Usuario, UsuarioResponse } from "@medlinked/types";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import {
  BlueBackground,
  Form,
  HeaderContainer,
  LogoContainer,
  PageContentContainer,
  WhiteContainer,
} from "./styles";

export default function Page() {
  const router = useRouter();
  const [loggingIn, setLoggingIn] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Usuario>({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit: SubmitHandler<Usuario> = (data) => {
    setLoggingIn(true);

    medlinked
      .post<UsuarioResponse>("usuario/authenticate", {
        username: data.username,
        password: data.password,
      })
      .then((response) => {
        localStorage.setItem("token", response.data.token);
        router.push("/admin");
      })
      .catch(() => {
        toast.error("Usuário ou senha incorretos.");
      })
      .finally(() => setLoggingIn(false));
  };

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
            <Form onSubmit={handleSubmit(onSubmit)}>
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
              <Input
                icon="KeyRound"
                placeholder="Digite sua senha *"
                fullWidth
                type="password"
                maxLength={200}
                register={{ ...register("password") }}
                hasError={Boolean(errors.password)}
                errorMessage={errors.password?.message}
              />
              <CustomText $weight={500} $align="center">
                * Campo Obrigatório
              </CustomText>
              <Button
                textAlign="center"
                fullWidth
                type="submit"
                disabled={loggingIn}
              >
                Entrar
              </Button>
            </Form>
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
