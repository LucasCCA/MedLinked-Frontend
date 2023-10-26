import { medlinked } from "@medlinked/api";
import { CreatePaciente, Paciente, PacienteResponse } from "@medlinked/types";
import { onlyNumbers } from "@medlinked/utils";

export function getAllPacientes(
  pageNumber: number,
  pageSize: number,
  nome?: string,
  cpf?: string,
) {
  const nameFilter = nome ? `&nomePaciente=${nome}` : "";
  const cpfFilter = cpf && cpf.length == 11 ? `&cpf=${Number(cpf)}` : "";

  return medlinked.get<PacienteResponse>(
    `paciente?pageSize=${pageSize}&page=${pageNumber}${nameFilter}${cpfFilter}`,
  );
}

export function getPaciente(idPaciente: number) {
  return medlinked.get<Paciente>(`paciente/${idPaciente}`);
}

export function deletePaciente(idPaciente: number) {
  return medlinked.delete(`paciente/delete/${idPaciente}`);
}

export function createPaciente(data: CreatePaciente) {
  return medlinked.post<Paciente>("paciente/create", {
    nome: data.registerPessoa.nome,
    cpf: onlyNumbers(data.registerPessoa.cpf),
    celular: Number(onlyNumbers(data.registerPessoa.celular)),
    email: data.registerPessoa.email,
    enderecoDto: {
      cep: onlyNumbers(data.createEndereco.cep),
      logradouro: data.createEndereco.logradouro,
      bairro: data.createEndereco.bairro,
      cidade: data.createEndereco.cidade,
      ufEstado: data.createEndereco.ufEstado,
      numero: data.createEndereco.numero,
      complemento: data.createEndereco.complemento,
    },
  });
}

export function updatePaciente(data: CreatePaciente, idPaciente: number) {
  return medlinked.put<Paciente>(`paciente/update/${idPaciente}`, {
    nome: data.registerPessoa.nome,
    cpf: onlyNumbers(data.registerPessoa.cpf),
    celular: Number(onlyNumbers(data.registerPessoa.celular)),
    email: data.registerPessoa.email,
    enderecoDto: {
      cep: onlyNumbers(data.createEndereco.cep),
      logradouro: data.createEndereco.logradouro,
      bairro: data.createEndereco.bairro,
      cidade: data.createEndereco.cidade,
      ufEstado: data.createEndereco.ufEstado,
      numero: data.createEndereco.numero,
      complemento: data.createEndereco.complemento,
    },
  });
}
