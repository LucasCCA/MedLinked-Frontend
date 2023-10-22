import {
  EspecializacaoResponse,
  Estado,
  Pageable,
  PlanosSaudeResponse,
} from ".";

export type SecretariaMedicoData = {
  idMedico: number;
  nome: string;
  cpf: number;
  email: string;
  celular: number;
  planosSaudeMedico: PlanosSaudeResponse;
  estado: Estado;
  numeroCrm: number;
  especialidades: EspecializacaoResponse;
};

export type SecretariaMedicoResponse = {
  content: SecretariaMedicoData[];
  pageable: Pageable;
  totalPages: number;
};
