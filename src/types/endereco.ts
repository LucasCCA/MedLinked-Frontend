import { Estado } from "./estado";

export type Endereco = {
  idPaciente: number;
  cep: number;
  logradouro: string;
  cidade: string;
  bairro: string;
  numero: number;
  complemento: string;
  estado: Estado;
};

export type CreateEndereco = {
  cep: string;
  logradouro: string;
  cidade: string;
  bairro: string;
  numero: string;
  complemento?: string;
  ufEstado: string;
};
