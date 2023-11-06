import { Medico, PacienteData, PlanosSaude } from ".";

export type AgendamentoData = {
  idAgendamento: number;
  dataHoraInicioAgendamento: string;
  dataHoraFimAgendamento: string;
  descricao: string;
  tipoAgendamento: string;
  medico: Medico;
  paciente: PacienteData;
  planoSaude: PlanosSaude;
};

export type AgendamentoResponse = AgendamentoData[];
