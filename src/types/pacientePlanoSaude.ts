import { PacienteData, PlanoSaude, TipoPlanoSaude } from ".";

export type PlanoSaudePaciente = {
  planoSaude: PlanoSaude;
  numeroCarteirinha: number;
  tipoPlanoSaude: TipoPlanoSaude;
};

export type PacientePlanoSaudeResponse = {
  paciente: PacienteData;
  planosSaudePaciente: PlanoSaudePaciente[];
};
