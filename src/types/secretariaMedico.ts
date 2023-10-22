import { EspecializacaoResponse, Pageable, PlanosSaudeResponse } from ".";

export type SecretariaMedicoData = {
  idMedico: number;
  nome: string;
  cpf: number;
  email: string;
  celular: number;
  planosSaudeMedico: PlanosSaudeResponse;
  ufCrm: string;
  numeroCrm: number;
  especialidades: EspecializacaoResponse;
};

export type SecretariaMedicoResponse = {
  content: SecretariaMedicoData[];
  pageable: Pageable;
  totalPages: number;
};
