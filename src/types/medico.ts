import { Pessoa, RegisterPessoa } from "./pessoa";
import { PlanosSaudeResponse } from "./planosSaude";

export type Medico = {
  idMedico: number;
  pessoa: Pessoa;
  planosSaude: PlanosSaudeResponse;
};

export type MedicoResponse = Medico[];

export type CreateMedico = {
  registerPessoa: RegisterPessoa;
  ufCrm: string;
  numeroCrm: string;
  idsEspecialidades: number[];
};
