import * as yup from "yup";

export const registerPlanoSaudeSchema = yup
  .object()
  .shape({
    descricao: yup
      .string()
      .required("O campo nome é obrigatório")
      .max(130, "O tamanho máximo do nome é de 130 caracteres"),
  })
  .required();
