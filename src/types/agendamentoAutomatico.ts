export type CreateAgendamentoAutomatico = {
  idMedico: number;
  dataInicio: string;
  dataFim: string;
  horaInicio: string;
  horaFim: string;
  tempoIntervalo: string;
  apenasSegundaASexta: boolean;
};

export type FailedAgendamentoAutomatico = {
  dataHoraInicioAgendamento: string;
  dataHoraFimAgendamento: string;
};

export type AgendamentoAutomaticoResponse = FailedAgendamentoAutomatico[];
