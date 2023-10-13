import * as yup from "yup";

export const loginSchema = yup
  .object()
  .shape({
    username: yup
      .string()
      .required("O campo usuário é obrigatório")
      .min(3, "O tamanho mínimo do usuário deve ser de 3 caracteres")
      .max(120, "O tamanho máximo do usuário deve ser de 120 caracteres"),
    password: yup
      .string()
      .required("O campo senha é obrigatório")
      .min(5, "O tamanho mínimo da senha deve ser de 5 caracteres")
      .max(200, "O tamanho máximo da senha deve ser de 120 caracteres"),
  })
  .required();
