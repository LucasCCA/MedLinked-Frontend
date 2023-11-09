import * as yup from "yup";

export const passwordResetTokenSchema = yup
  .object()
  .shape({
    username: yup
      .string()
      .required("O campo usuário é obrigatório")
      .max(120, "O tamanho máximo do usuário é de 120 caracteres"),
  })
  .required();

export const newPasswordSchema = yup
  .object()
  .shape({
    password: yup
      .string()
      .required("O campo nova senha é obrigatório")
      .min(5, "O tamanho mínimo da nova senha deve ser de 5 caracteres")
      .max(200, "O tamanho máximo da nova senha deve ser de 120 caracteres"),
    repeatedPassword: yup
      .string()
      .required("O campo repita sua nova senha é obrigatório")
      .oneOf([yup.ref("password")], "Os campos de nova senha devem ser iguais"),
  })
  .required();
