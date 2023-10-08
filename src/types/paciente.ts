import { Pessoa } from ".";
import { Endereco } from "./endereco";

export type PacienteData = {
  idPaciente: number;
  pessoa: Pessoa;
};

export type Paciente = {
  paciente: PacienteData;
  endereco: Endereco;
};

export type PacienteResponse = Paciente[];
