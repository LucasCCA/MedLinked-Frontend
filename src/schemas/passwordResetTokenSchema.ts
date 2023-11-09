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
