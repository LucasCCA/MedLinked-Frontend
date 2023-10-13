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
import { SubmitHandler, useForm } from "react-hook-form";
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

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Usuario>({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit: SubmitHandler<Usuario> = (data) => {
    medlinked
      .post<UsuarioResponse>("usuario/authenticate", {
        username: data.username,
        password: data.password,
      })
      .then((response) => {
        console.log(response.data);
        localStorage.setItem("token", response.data.token);
        router.push("/admin");
      })
      .catch((response) => console.log(response));
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
              <Button textAlign="center" fullWidth type="submit">
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
