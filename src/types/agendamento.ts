import { Maybe } from "yup";
import { Medico, PacienteData, Pageable, PlanoSaude } from ".";

export type AgendamentoData = {
  idAgendamento: number;
  dataHoraInicioAgendamento: string;
  dataHoraFimAgendamento: string;
  descricao: string;
  tipoAgendamento: string;
  medico: Medico;
  paciente: PacienteData;
  planoSaude: PlanoSaude;
};

export type AgendamentoResponse = AgendamentoData[];

export type CreateAgendamento = {
  idMedico: number;
  idPaciente: number;
  idPlanoSaude?: number;
  descricao?: Maybe<string | undefined>;
  tipoAgendamento: string;
  data: string;
  horaInicio: string;
  horaFim: string;
};

export type AgendamentoPaginatedResponse = {
  content: AgendamentoData[];
  pageable: Pageable;
  totalPages: number;
};
