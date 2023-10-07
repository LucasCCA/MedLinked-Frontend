import { Pessoa } from "./pessoa";
import { PlanosSaude } from "./planosSaude";

export type Medico = {
  idMedico: number;
  pessoa: Pessoa;
  planosSaude: PlanosSaude[];
};

export type MedicoResponse = Medico[];
