import { medlinked } from "@medlinked/api";
import { RegisterSecretaria, UsuarioResponse } from "@medlinked/types";
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
