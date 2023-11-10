import { medlinked } from "@medlinked/api";
import {
  AgendamentoAutomaticoResponse,
  CreateAgendamentoAutomatico,
} from "@medlinked/types";
import { onlyNumbers } from "@medlinked/utils";

export function createAgendamentoAutomatico(data: CreateAgendamentoAutomatico) {
  const startDateWithoutSlash = onlyNumbers(data.dataInicio);
  const endDateWithoutSlash = onlyNumbers(data.dataFim);

  const formattedStartDate = `${startDateWithoutSlash.slice(
    4,
    8,
  )}-${startDateWithoutSlash.slice(2, 4)}-${startDateWithoutSlash.slice(0, 2)}`;
  const formattedEndDate = `${endDateWithoutSlash.slice(
    4,
    8,
  )}-${endDateWithoutSlash.slice(2, 4)}-${endDateWithoutSlash.slice(0, 2)}`;

  return medlinked.post<AgendamentoAutomaticoResponse>(
    "agendamento-automatico",
    {
      idMedico: data.idMedico,
      dataInicioAgendamentoAutomatico: formattedStartDate,
      dataFimAgendamentoAutomatico: formattedEndDate,
      horaInicioGeracao: `${data.horaInicio}:00`,
      horaFimGeracao: `${data.horaFim}:00`,
      tempoIntervalo: Number(data.tempoIntervalo),
      isApenasSegundaASexta: data.apenasSegundaASexta,
    },
  );
}
