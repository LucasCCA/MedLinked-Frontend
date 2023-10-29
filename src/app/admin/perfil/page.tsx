"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import { Button, CustomText, Input, Spacing } from "@medlinked/components";
import { updateSecretariaSchema } from "@medlinked/schemas";
import {
  getSecretaria,
  updateSecretaria,
  updateUsuario,
} from "@medlinked/services";
import { RegisterPessoa, TokenData } from "@medlinked/types";
import { cpfMask, formatCpf, phoneNumberMask } from "@medlinked/utils";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { FieldsContainer, SingleFieldContainer } from "../styles";

export default function Page() {
  const [loading, setLoading] = useState(true);
  const [idSecretaria, setIdSecretaria] = useState(0);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [repeatedNewPassword, setRepeatedNewPassword] = useState("");
  const [oldPasswordError, setOldPasswordError] = useState("");
  const [newPasswordError, setNewPasswordError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<RegisterPessoa>({
    resolver: yupResolver(updateSecretariaSchema),
  });

  const cpfValue = watch("cpf");
  const phoneNumberValue = watch("celular");

  useEffect(() => {
    if (Cookies.get("token"))
      setIdSecretaria(jwt_decode<TokenData>(Cookies.get("token")!).idUsuario);

    if (idSecretaria != 0)
      getSecretaria(idSecretaria)
        .then((response) => {
          setValue("nome", response.data.pessoa.nome);
          setValue("email", response.data.pessoa.email);
          setValue("cpf", cpfMask(formatCpf(response.data.pessoa.cpf)));
          setValue(
            "celular",
            phoneNumberMask(response.data.pessoa.celular.toString()),
          );
        })
        .catch(() =>
          toast.error(
            "Ocorreu um erro ao buscar seus dados. Tente novamente mais tarde.",
          ),
        )
        .finally(() => setLoading(false));
  }, [idSecretaria]);

  useEffect(() => {
    setValue("cpf", cpfMask(cpfValue));
    setValue("celular", phoneNumberMask(phoneNumberValue));
  }, [cpfValue, phoneNumberValue]);

  const onSubmit: SubmitHandler<RegisterPessoa> = (data) => {
    setLoading(true);

    updateSecretaria(data, idSecretaria)
      .then(() => toast.success("Dados atualizados com sucesso!"))
      .catch((error) => toast.error(error.response.data))
      .finally(() => setLoading(false));
  };

  function changePassword() {
    setLoading(true);

    if (newPassword != repeatedNewPassword)
      setNewPasswordError("Os campos de nova senha não batem");
    else {
      setNewPasswordError("");
      setOldPasswordError("");

      updateUsuario(oldPassword, newPassword, idSecretaria)
        .then(() => {
          toast.success("Senha alterada com sucesso!");
        })
        .catch((error) => setOldPasswordError(error.response.data));
    }

    setLoading(false);
  }

  return (
    <>
      <Spacing>
        <CustomText $size="h2">Dados da Conta</CustomText>
      </Spacing>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Spacing>
          <FieldsContainer>
            <Input
              placeholder="Digite o nome *"
              fullWidth
              maxLength={120}
              register={{
                ...register("nome"),
              }}
              hasError={Boolean(errors.nome)}
              errorMessage={errors.nome?.message}
              autoComplete="off"
            />
            <Input
              placeholder="Digite o CPF *"
              fullWidth
              maxLength={14}
              register={{
                ...register("cpf"),
              }}
              hasError={Boolean(errors.cpf)}
              errorMessage={errors.cpf?.message}
              autoComplete="off"
            />
            <Input
              placeholder="Digite o email *"
              fullWidth
              maxLength={120}
              register={{
                ...register("email"),
              }}
              hasError={Boolean(errors.email)}
              errorMessage={errors.email?.message}
            />
            <Input
              placeholder="Digite o telefone *"
              fullWidth
              maxLength={17}
              register={{
                ...register("celular"),
              }}
              hasError={Boolean(errors.celular)}
              errorMessage={errors.celular?.message}
            />
          </FieldsContainer>
        </Spacing>
        <Spacing>
          <SingleFieldContainer>
            <Button
              textAlign="center"
              fullWidth
              type="submit"
              disabled={loading}
            >
              Atualizar Informações
            </Button>
          </SingleFieldContainer>
        </Spacing>
      </form>
      <Spacing>
        <CustomText $size="h2">Alterar Senha</CustomText>
      </Spacing>
      <Spacing>
        <SingleFieldContainer>
          <Input
            placeholder="Senha antiga *"
            fullWidth
            maxLength={200}
            type="password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.currentTarget.value)}
            hasError={oldPasswordError != ""}
            errorMessage={oldPasswordError}
          />
        </SingleFieldContainer>
        <FieldsContainer>
          <Input
            placeholder="Senha nova *"
            fullWidth
            maxLength={200}
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.currentTarget.value)}
            hasError={newPasswordError != ""}
            errorMessage={newPasswordError}
          />
          <Input
            placeholder="Repetir senha nova *"
            fullWidth
            maxLength={200}
            type="password"
            value={repeatedNewPassword}
            onChange={(e) => setRepeatedNewPassword(e.currentTarget.value)}
            hasError={newPasswordError != ""}
            errorMessage={newPasswordError}
          />
        </FieldsContainer>
      </Spacing>
      <Spacing>
        <CustomText $weight={500}>* Campo Obrigatório</CustomText>
      </Spacing>
      <Spacing>
        <SingleFieldContainer>
          <Button
            textAlign="center"
            fullWidth
            disabled={
              loading ||
              oldPassword == "" ||
              newPassword == "" ||
              repeatedNewPassword == ""
            }
            onClick={() => changePassword()}
          >
            Atualizar Senha
          </Button>
        </SingleFieldContainer>
      </Spacing>
    </>
  );
}
