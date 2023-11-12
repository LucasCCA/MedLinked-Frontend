import { medlinked } from "@medlinked/api";
import { Usuario, UsuarioResponse } from "@medlinked/types";

export function authenticate(data: Usuario) {
  return medlinked.post<UsuarioResponse>("usuario/authenticate", {
    username: data.username,
    password: data.password,
  });
}

export function updateUsuario(
  oldPassword: string,
  newPassword: string,
  idUsuario: number,
) {
  return medlinked.put(`usuario/update-senha/${idUsuario}`, {
    oldPassword: oldPassword,
    newPassword: newPassword,
  });
}
