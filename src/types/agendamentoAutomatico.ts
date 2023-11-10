export type CreateAgendamentoAutomatico = {
  idMedico: number;
  dataInicio: string;
  dataFim: string;
  horaInicio: string;
  horaFim: string;
  tempoIntervalo: string;
  apenasDiasUteis: boolean;
};
