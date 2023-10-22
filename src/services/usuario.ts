import { medlinked } from "@medlinked/api";
import { Usuario, UsuarioResponse } from "@medlinked/types";

export function authenticate(data: Usuario) {
  return medlinked.post<UsuarioResponse>("usuario/authenticate", {
    username: data.username,
    password: data.password,
  });
}
