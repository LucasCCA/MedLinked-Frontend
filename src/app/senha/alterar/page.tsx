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
import { changePassword, verifyResetToken } from "@medlinked/services";
import { CreateNewPassword } from "@medlinked/types";
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
  LinkContainer,
  LogoContainer,
  PageContentContainer,
  WhiteContainer,
} from "../../styles";

export default function Page() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateNewPassword>({
    resolver: yupResolver(newPasswordSchema),
  });

  useEffect(() => {
    function verifyToken() {
      verifyResetToken(Cookies.get("resetToken") || "").catch(() => {
        toast.error(
          // eslint-disable-next-line max-len
          "Não é possível alterar sua senha no momento. Tente novamente mais tarde.",
        );
        router.push("/");
      });
    }

    verifyToken();
  }, []);

  const onSubmit: SubmitHandler<CreateNewPassword> = (data) => {
    setLoading(true);

    changePassword(data, Cookies.get("resetToken") || "")
      .then(() => {
        Cookies.remove("resetToken");
        toast.success("Senha alterada com sucesso!");
        router.push("/");
      })
      .catch(() => {
        toast.error(
          "Ocorreu um erro ao alterar sua senha. Tente novamente mais tarde.",
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
