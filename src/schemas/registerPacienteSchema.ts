import { onlyNumbers } from "@medlinked/utils";
import { cpf } from "cpf-cnpj-validator";
import * as EmailValidator from "email-validator";
import * as yup from "yup";

export const registerPacienteSchema = yup
  .object()
  .shape({
    registerPessoa: yup.object({
      nome: yup
        .string()
        .required("O campo nome é obrigatório")
        .min(2, "O tamanho mínimo do nome deve ser de 2 caracteres")
        .max(120, "O tamanho máximo do nome deve ser de 120 caracteres"),
      cpf: yup
        .string()
        .required("O campo CPF é obrigatório")
        .test("test-cpf", "O CPF é inválido", (value) =>
          cpf.isValid(onlyNumbers(value)),
        ),
      email: yup
        .string()
        .required("O campo email é obrigatório")
        .max(120, "O tamanho máximo do email deve ser de 120 caracteres")
        .test("test-email", "O email é inválido", (value) =>
          EmailValidator.validate(value),
        ),
      celular: yup
        .string()
        .required("O campo telefone é obrigatório")
        .min(16, "O telefone deve seguir o formato (99) 9999 - 9999")
        .max(17, "O telefone deve seguir o formato (99) 9999 - 9999"),
    }),
    createEndereco: yup.object({
      cep: yup
        .string()
        .required("O campo CEP é obrigatório")
        .length(11, "O CEP é inválido"),
      logradouro: yup
        .string()
        .required("O campo logradouro é obrigatório")
        .max(100, "O tamanho máximo do logradouro deve ser de 120 caracteres"),
      cidade: yup
        .string()
        .required("O campo cidade é obrigatório")
        .max(100, "O tamanho máximo da cidade deve ser de 100 caracteres"),
      bairro: yup
        .string()
        .required("O campo bairro é obrigatório")
        .max(120, "O tamanho máximo do bairro deve ser de 120 caracteres"),
      numero: yup.string().required("O campo número é obrigatório"),
      complemento: yup
        .string()
        .max(100, "O tamanho máximo do complemento deve ser de 100 caracteres"),
      ufEstado: yup
        .string()
        .required("O campo estado é obrigatório")
        .length(2, "Estado inválido"),
    }),
  })
  .required();
