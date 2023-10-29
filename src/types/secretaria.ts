import { Pessoa, RegisterPessoa, Usuario } from ".";

export type Secretaria = {
  idSecretaria: number;
  pessoa: Pessoa;
};

export type RegisterSecretaria = {
  pessoa: RegisterPessoa;
  usuario: Usuario;
};
