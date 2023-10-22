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
import { registerSchema } from "@medlinked/schemas";
import { RegisterSecretaria, UsuarioResponse } from "@medlinked/types";
import { cpfMask, onlyNumbers, phoneNumberMask } from "@medlinked/utils";
import Cookies from "js-cookie";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import {
  BlueBackground,
  Form,
  HeaderContainer,
  LogoContainer,
  PageContentContainer,
  WhiteContainer,
} from "../styles";

export default function Page() {
  const router = useRouter();
  const [signingUp, setSigningUp] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<RegisterSecretaria>({ resolver: yupResolver(registerSchema) });

  const onSubmit: SubmitHandler<RegisterSecretaria> = (data) => {
    setSigningUp(true);

    medlinked
      .post<UsuarioResponse>("secretaria/create", {
        nome: data.pessoa.nome,
        cpf: onlyNumbers(data.pessoa.cpf),
        celular: Number(onlyNumbers(data.pessoa.celular)),
        email: data.pessoa.email,
        usuarioRegisterDto: {
          username: data.usuario.username,
          password: data.usuario.password,
        },
      })
      .then((response) => {
        Cookies.set("token", response.data.token);
        router.push("/admin");
      })
      .catch(() => toast.error("Ocorreu um erro, tente novamente mais tarde."))
      .finally(() => setSigningUp(false));
  };

  const cpfValue = watch("pessoa.cpf");
  const phoneNumberValue = watch("pessoa.celular");

  useEffect(() => {
    setValue("pessoa.cpf", cpfMask(cpfValue));
    setValue("pessoa.celular", phoneNumberMask(phoneNumberValue));
  }, [cpfValue, phoneNumberValue]);

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
            <Form onSubmit={handleSubmit(onSubmit)}>
              <Input
                icon="User2"
                placeholder="Digite seu nome *"
                fullWidth
                type="text"
                maxLength={120}
                register={{ ...register("pessoa.nome") }}
                hasError={Boolean(errors.pessoa?.nome)}
                errorMessage={errors.pessoa?.nome?.message}
                autoComplete="off"
              />
              <Input
                icon="Asterisk"
                placeholder="Digite seu CPF *"
                fullWidth
                maxLength={14}
                type="text"
                register={{
                  ...register("pessoa.cpf"),
                }}
                hasError={Boolean(errors.pessoa?.cpf)}
                errorMessage={errors.pessoa?.cpf?.message}
                autoComplete="off"
              />
              <Input
                icon="Mail"
                placeholder="Digite seu email *"
                fullWidth
                type="text"
                maxLength={120}
                register={{ ...register("pessoa.email") }}
                hasError={Boolean(errors.pessoa?.email)}
                errorMessage={errors.pessoa?.email?.message}
                autoComplete="on"
              />
              <Input
                icon="Phone"
                type="text"
                placeholder="Digite seu telefone"
                fullWidth
                maxLength={17}
                register={{ ...register("pessoa.celular") }}
                hasError={Boolean(errors.pessoa?.celular)}
                errorMessage={errors.pessoa?.celular?.message}
                autoComplete="on"
              />
              <Input
                icon="UserCircle2"
                placeholder="Digite seu usuário *"
                fullWidth
                type="text"
                maxLength={120}
                register={{ ...register("usuario.username") }}
                hasError={Boolean(errors.usuario?.username)}
                errorMessage={errors.usuario?.username?.message}
                autoComplete="off"
              />
              <Input
                icon="KeyRound"
                placeholder="Digite sua senha *"
                fullWidth
                type="password"
                maxLength={200}
                register={{ ...register("usuario.password") }}
                hasError={Boolean(errors.usuario?.password)}
                errorMessage={errors.usuario?.password?.message}
              />
              <CustomText $weight={500} $align="center">
                * Campo Obrigatório
              </CustomText>
              <Button
                textAlign="center"
                fullWidth
                type="submit"
                disabled={signingUp}
              >
                Cadastrar
              </Button>
            </Form>
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
