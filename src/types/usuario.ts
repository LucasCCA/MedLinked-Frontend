export type Usuario = {
  username: string;
  password: string;
};

export type UsuarioResponse = {
  token: string;
};

export type TokenData = {
  idUsuario: number;
  nome: string;
  sub: string;
  iat: number;
  exp: number;
};
