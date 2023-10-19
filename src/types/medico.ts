import { Pessoa } from "./pessoa";
import { PlanosSaude } from "./planosSaude";

export type Medico = {
  idMedico: number;
  pessoa: Pessoa;
  planosSaude: PlanosSaude[];
};

export type MedicoResponse = Medico[];

export type CreateMedico = {
  nome: string;
  cpf: string;
  celular: string;
  email: string;
  ufCrm: string;
  numeroCrm: number;
  idsEspecialidades: number[];
};
