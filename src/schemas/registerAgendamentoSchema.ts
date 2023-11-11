import * as yup from "yup";

export const registerAgendamentoSchema = yup
  .object()
  .shape({
    idMedico: yup
      .number()
      .required("O campo médico é obrigatório")
      .min(1, "O campo médico é obrigatório"),
    idPaciente: yup
      .number()
      .required("O campo paciente é obrigatório")
      .min(1, "O campo paciente é obrigatório"),
    idPlanoSaude: yup.number(),
    descricao: yup
      .string()
      .notRequired()
      .max(200, "O tamanho máximo da descrição deve ser de 200 caracteres"),
    tipoAgendamento: yup
      .string()
      .required("O campo tipo de agendamento é obrigatório"),
    data: yup
      .string()
      .required("O campo data é obrigatório")
      .length(10, "A data deve seguir o formato DD/MM/AAAA"),
    horaInicio: yup
      .string()
      .required("O campo horário início é obrigatório")
      .length(5, "O horário início deve seguir o formato HH:MM"),
    horaFim: yup
      .string()
      .required("O campo horário fim é obrigatório")
      .length(5, "O horário fim deve seguir o formato HH:MM"),
  })
  .required();
