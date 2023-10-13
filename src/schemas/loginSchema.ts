import * as yup from "yup";

export const loginSchema = yup
  .object()
  .shape({
    username: yup
      .string()
      .max(120, "O tamanho máximo do usuário é de 120 caracteres")
      .required("O campo usuário é obrigatório"),
    password: yup
      .string()
      .max(200, "O tamanho máximo da senha é de 120 caracteres")
      .required("O campo senha é obrigatório"),
  })
  .required();
