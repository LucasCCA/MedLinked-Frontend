"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import {
  Button,
  CustomText,
  Input,
  Modal,
  Spacing,
} from "@medlinked/components";
import { updateSecretariaSchema } from "@medlinked/schemas";
import {
  deleteSecretaria,
  getSecretaria,
  updateSecretaria,
  updateUsuario,
} from "@medlinked/services";
import { RegisterPessoa, TokenData } from "@medlinked/types";
import { cpfMask, formatCpf, phoneNumberMask } from "@medlinked/utils";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import {
  FieldsContainer,
  ModalFieldsContainer,
  SingleFieldContainer,
} from "../styles";

export default function Page() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [idSecretaria, setIdSecretaria] = useState(0);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [repeatedNewPassword, setRepeatedNewPassword] = useState("");
  const [newPasswordError, setNewPasswordError] = useState("");
  const [openModal, setOpenModal] = useState(false);

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
      .catch((error) => {
        if (error.response?.data) toast.error(error.response.data);
        else
          toast.error(
            // eslint-disable-next-line max-len
            "Ocorreu um erro ao atualizar seus dados. Tente novamente mais tarde.",
          );
      })
      .finally(() => setLoading(false));
  };

  function changePassword() {
    setLoading(true);

    if (newPassword != repeatedNewPassword)
      setNewPasswordError("Os campos de nova senha devem ser iguais");
    else {
      setNewPasswordError("");

      updateUsuario(oldPassword, newPassword, idSecretaria)
        .then(() => {
          toast.success("Senha alterada com sucesso!");
        })
        .catch((error) => {
          if (error.response?.data) toast.error(error.response.data);
          else
            toast.error(
              "Ocorreu um erro ao alterar a senha. Tente novamente mais tarde.",
            );
        });
    }

    setLoading(false);
  }

  function handleDelete() {
    setLoading(true);

    deleteSecretaria(idSecretaria)
      .then(() => {
        Cookies.remove("token");
        toast.success("Conta deletada com sucesso!");
        router.push("/");
      })
      .catch((error) => {
        setOpenModal(false);
        if (error.response?.data) toast.error(error.response.data);
        else
          toast.error(
            "Ocorreu um erro ao deletar sua conta. Tente novamente mais tarde.",
          );
      })
      .finally(() => setLoading(false));
  }

  return (
    <>
      <Modal title="Confirmação" open={openModal} setOpen={setOpenModal}>
        <>
          <CustomText $align="center">
            Você realmente deseja deletar sua conta?
          </CustomText>
          <ModalFieldsContainer>
            <Button fullWidth textAlign="center" onClick={() => handleDelete()}>
              Sim
            </Button>
            <Button
              fullWidth
              textAlign="center"
              onClick={() => setOpenModal(false)}
              color="red_80"
            >
              Não
            </Button>
          </ModalFieldsContainer>
        </>
      </Modal>
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
            placeholder="Digite sua atual senha *"
            fullWidth
            maxLength={200}
            type="password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.currentTarget.value)}
          />
        </SingleFieldContainer>
        <FieldsContainer>
          <Input
            placeholder="Digite sua nova senha *"
            fullWidth
            maxLength={200}
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.currentTarget.value)}
            hasError={newPasswordError != ""}
            errorMessage={newPasswordError}
          />
          <Input
            placeholder="Repita sua nova senha *"
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
      <Spacing>
        <CustomText $size="h2">Deletar Conta</CustomText>
      </Spacing>
      <Spacing>
        <SingleFieldContainer>
          <Button
            textAlign="center"
            color="red_80"
            fullWidth
            disabled={loading}
            onClick={() => setOpenModal(true)}
          >
            Deletar
          </Button>
        </SingleFieldContainer>
      </Spacing>
    </>
  );
}
