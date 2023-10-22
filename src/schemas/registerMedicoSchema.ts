import { onlyNumbers } from "@medlinked/utils";
import { cpf } from "cpf-cnpj-validator";
import * as EmailValidator from "email-validator";
import * as yup from "yup";

export const registerMedicoSchema = yup
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
    ufCrm: yup
      .string()
      .required("O campo estado do CRM é obrigatório")
      .length(2, "Estado inválido"),
    numeroCrm: yup
      .string()
      .required("O campo número do CRM é obrigatório")
      .length(6, "Número de CRM inválido"),
    idsEspecialidades: yup
      .array<number[]>()
      .required("É necessário informar no mínimo 1 especialização")
      .min(1, "É necessário informar no mínimo 1 especialização")
      .max(2, "É possível informar no máximo 2 especializações"),
  })
  .required();
