"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import {
  Button,
  Container,
  CustomLink,
  CustomText,
  Input,
} from "@medlinked/components";
import { registerSchema } from "@medlinked/schemas";
import { createSecretaria, getPessoaByCpf } from "@medlinked/services";
import { RegisterSecretaria } from "@medlinked/types";
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
  const [loading, setLoading] = useState(false);
  const [filledCpf, setFilledCpf] = useState(false);
  const [personAlreadyRegistered, setPersonAlreadyRegistered] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    resetField,
  } = useForm<RegisterSecretaria>({ resolver: yupResolver(registerSchema) });

  const onSubmit: SubmitHandler<RegisterSecretaria> = (data) => {
    setLoading(true);

    createSecretaria(data)
      .then((response) => {
        Cookies.set("token", response.data.token);
        router.push("/admin/agenda");
      })
      .catch((error) => {
        if (error.response?.data) toast.error(error.response.data);
        else
          toast.error(
            "Ocorreu um erro durante o cadastro. Tente novamente mais tarde.",
          );
      })
      .finally(() => setLoading(false));
  };

  const cpfValue = watch("pessoa.cpf");
  const phoneNumberValue = watch("pessoa.celular");

  useEffect(() => {
    setValue("pessoa.cpf", cpfMask(cpfValue));
    setValue("pessoa.celular", phoneNumberMask(phoneNumberValue));
    setFilledCpf(watch("pessoa.cpf").length == 14);
  }, [cpfValue, phoneNumberValue]);

  useEffect(() => {
    if (filledCpf) {
      setPersonAlreadyRegistered(false);
      resetField("pessoa.nome");
      resetField("pessoa.email");
      resetField("pessoa.celular");

      setLoading(true);

      getPessoaByCpf(Number(onlyNumbers(cpfValue)))
        .then((response) => {
          if (response.data.idPessoa) {
            toast.info("Pessoa já cadastrada no sistema");
            setPersonAlreadyRegistered(true);
            setValue("pessoa.nome", response.data.nome);
            setValue("pessoa.email", response.data.email);
            setValue("pessoa.celular", String(response.data.celular));
          }
        })
        .finally(() => setLoading(false));
    }
  }, [filledCpf, cpfValue]);

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
              Cadastro
            </CustomText>
            <Form onSubmit={handleSubmit(onSubmit)}>
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
                icon="User2"
                placeholder="Digite seu nome *"
                fullWidth
                type="text"
                maxLength={120}
                register={{ ...register("pessoa.nome") }}
                hasError={Boolean(errors.pessoa?.nome)}
                errorMessage={errors.pessoa?.nome?.message}
                autoComplete="off"
                disabled={personAlreadyRegistered || !filledCpf}
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
                disabled={personAlreadyRegistered || !filledCpf}
              />
              <Input
                icon="Phone"
                type="text"
                placeholder="Digite seu telefone *"
                fullWidth
                maxLength={17}
                register={{ ...register("pessoa.celular") }}
                hasError={Boolean(errors.pessoa?.celular)}
                errorMessage={errors.pessoa?.celular?.message}
                autoComplete="on"
                disabled={personAlreadyRegistered || !filledCpf}
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
                disabled={!filledCpf}
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
                autoComplete="off"
                disabled={!filledCpf}
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
