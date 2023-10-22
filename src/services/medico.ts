import { medlinked } from "@medlinked/api";
import {
  CreateMedico,
  SecretariaMedicoData,
  TokenData,
} from "@medlinked/types";
import { onlyNumbers } from "@medlinked/utils";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";

export function getMedico(idMedico: number) {
  return medlinked.get<SecretariaMedicoData>(`medico/${idMedico}`);
}

export function createMedico(data: CreateMedico) {
  return medlinked.post<SecretariaMedicoData>(
    `medico/create/${jwt_decode<TokenData>(Cookies.get("token")!).idUsuario}`,
    {
      nome: data.registerPessoa.nome,
      cpf: onlyNumbers(data.registerPessoa.cpf),
      celular: Number(onlyNumbers(data.registerPessoa.celular)),
      email: data.registerPessoa.email,
      ufCrm: data.ufCrm,
      numeroCrm: Number(data.numeroCrm),
      idsEspecialidades: data.idsEspecialidades,
    },
  );
}

export function updateMedico(data: CreateMedico, idMedico: number) {
  return medlinked.put<SecretariaMedicoData>(`medico/update/${idMedico}`, {
    nome: data.registerPessoa.nome,
    cpf: onlyNumbers(data.registerPessoa.cpf),
    celular: Number(onlyNumbers(data.registerPessoa.celular)),
    email: data.registerPessoa.email,
    ufCrm: data.ufCrm,
    numeroCrm: Number(data.numeroCrm),
    idsEspecialidades: data.idsEspecialidades,
  });
}

export function deleteMedico(idMedico: number) {
  return medlinked.delete(`medico/delete/${idMedico}`);
}
