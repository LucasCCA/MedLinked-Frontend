import { PacienteData, PlanosSaude, TipoPlanoSaude } from ".";

export type PacientePlanoSaude = {
  idPlanoSaudePaciente: {
    planoSaude: PlanosSaude;
    paciente: PacienteData;
  };
  numeroCarteirinha: number;
  tipoPlanoSaude: TipoPlanoSaude;
};

export type PacientePlanoSaudeResponse = PacientePlanoSaude[];
