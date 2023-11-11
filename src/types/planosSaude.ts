import { Pageable } from ".";

export type PlanoSaude = {
  idPlanoSaude: number;
  descricao: string;
};

export type PlanosSaudeResponse = PlanoSaude[];

export type PlanosSaudePaginatedResponse = {
  content: PlanoSaude[];
  pageable: Pageable;
  totalPages: number;
};

export type CreatePlanoSaude = {
  descricao: string;
};
