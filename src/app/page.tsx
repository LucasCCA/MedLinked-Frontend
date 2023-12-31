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
  LogoContainer,
  PageContentContainer,
  PasswordContainer,
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

    authenticate(data)
      .then((response) => {
        Cookies.set("token", response.data.token);
        router.push("/admin/agenda");
      })
      .catch(() => {
        toast.error("Usuário ou senha incorretos.");
      })
      .finally(() => setLoggingIn(false));
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
              <PasswordContainer>
                <Input
                  icon="KeyRound"
                  placeholder="Digite sua senha *"
                  fullWidth
                  type="password"
                  maxLength={200}
                  register={{ ...register("password") }}
                  hasError={Boolean(errors.password)}
                  errorMessage={errors.password?.message}
                  autoComplete="off"
                />
                <CustomLink href="/senha">Esqueceu sua senha?</CustomLink>
              </PasswordContainer>
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
