import * as yup from "yup";

export const loginSchema = yup
  .object()
  .shape({
    username: yup
      .string()
      .required("O campo usuário é obrigatório")
      .max(120, "O tamanho máximo do usuário é de 120 caracteres"),
    password: yup
      .string()
      .required("O campo senha é obrigatório")
      .max(200, "O tamanho máximo da senha é de 120 caracteres"),
  })
  .required();
