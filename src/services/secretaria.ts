import { medlinked } from "@medlinked/api";
import {
  RegisterPessoa,
  RegisterSecretaria,
  Secretaria,
  UsuarioResponse,
} from "@medlinked/types";
import { onlyNumbers } from "@medlinked/utils";

export function createSecretaria(data: RegisterSecretaria) {
  return medlinked.post<UsuarioResponse>("secretaria/create", {
    nome: data.pessoa.nome,
    cpf: onlyNumbers(data.pessoa.cpf),
    celular: Number(onlyNumbers(data.pessoa.celular)),
    email: data.pessoa.email,
    usuarioRegisterDto: {
      username: data.usuario.username,
      password: data.usuario.password,
    },
  });
}

export function getSecretaria(idSecretaria: number) {
  return medlinked.get<Secretaria>(`secretaria/${idSecretaria}`);
}

export function updateSecretaria(data: RegisterPessoa, idSecretaria: number) {
  return medlinked.put(`secretaria/update/${idSecretaria}`, {
    nome: data.nome,
    cpf: onlyNumbers(data.cpf),
    celular: Number(onlyNumbers(data.celular)),
    email: data.email,
  });
}
