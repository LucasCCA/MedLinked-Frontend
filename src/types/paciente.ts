import { Pageable, Pessoa, RegisterPessoa } from ".";
import { CreateEndereco, Endereco } from "./endereco";

export type PacienteData = {
  idPaciente: number;
  pessoa: Pessoa;
};

export type Paciente = {
  paciente: PacienteData;
  endereco: Endereco;
};

export type PacienteResponse = PacienteData[];

export type PacientePaginatedResponse = {
  content: PacienteData[];
  pageable: Pageable;
  totalPages: number;
};

export type CreatePaciente = {
  registerPessoa: RegisterPessoa;
  createEndereco: CreateEndereco;
};
