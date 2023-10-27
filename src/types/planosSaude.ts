import { Pageable } from ".";

export type PlanosSaude = {
  idPlanoSaude: number;
  descricao: string;
};

export type PlanosSaudeResponse = PlanosSaude[];

export type PlanosSaudePaginatedResponse = {
  content: PlanosSaude[];
  pageable: Pageable;
  totalPages: number;
};

export type CreatePlanoSaude = {
  descricao: string;
};
