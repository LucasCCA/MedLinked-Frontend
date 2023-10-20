import { Pessoa, RegisterPessoa } from "./pessoa";
import { PlanosSaude } from "./planosSaude";

export type Medico = {
  idMedico: number;
  pessoa: Pessoa;
  planosSaude: PlanosSaude[];
};

export type MedicoResponse = Medico[];

export type CreateMedico = {
  registerPessoa: RegisterPessoa;
  ufCrm: string;
  numeroCrm: number;
  idsEspecialidades: number[];
};
