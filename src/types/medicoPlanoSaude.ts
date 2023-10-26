import { Pageable, PlanosSaude } from ".";

export type MedicoPlanoSaudeResponse = {
  content: PlanosSaude[];
  pageable: Pageable;
  totalPages: number;
};
