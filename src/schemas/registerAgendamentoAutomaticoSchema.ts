import * as yup from "yup";

export const registerAgendamentoAutomaticoSchema = yup
  .object()
  .shape({
    idMedico: yup
      .number()
      .required("O campo médico é obrigatório")
      .min(1, "O campo médico é obrigatório"),
    dataInicio: yup
      .string()
      .required("O campo data início é obrigatório")
      .length(10, "A data deve seguir o formato DD/MM/AAAA"),
    dataFim: yup
      .string()
      .required("O campo data fim é obrigatório")
      .length(10, "A data deve seguir o formato DD/MM/AAAA"),
    horaInicio: yup
      .string()
      .required("O campo horário início é obrigatório")
      .length(5, "O horário início deve seguir o formato HH:MM"),
    horaFim: yup
      .string()
      .required("O campo horário fim é obrigatório")
      .length(5, "O horário fim deve seguir o formato HH:MM"),
    tempoIntervalo: yup
      .string()
      .required("O campo tempo de consulta é obrigatório"),
    apenasDiasUteis: yup
      .boolean()
      .required("O campo apenas dias úteis é obrigatório"),
  })
  .required();
