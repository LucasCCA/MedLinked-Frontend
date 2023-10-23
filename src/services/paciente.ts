import { medlinked } from "@medlinked/api";
import { PacienteResponse } from "@medlinked/types";

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

export function deletePaciente(idPaciente: number) {
  return medlinked.delete(`paciente/delete/${idPaciente}`);
}
