import { Especializacao, Estado, Medico, Pageable } from ".";

export type SecretariaMedicoData = {
  medico: Medico;
  estado: Estado;
  numeroCrm: number;
  especialidades: Especializacao[];
};

export type SecretariaMedicoResponse = {
  content: SecretariaMedicoData[];
  pageable: Pageable;
  totalPages: number;
};
