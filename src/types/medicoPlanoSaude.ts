import { Pageable, PlanoSaude } from ".";

export type MedicoPlanoSaudeResponse = {
  content: PlanoSaude[];
  pageable: Pageable;
  totalPages: number;
};
