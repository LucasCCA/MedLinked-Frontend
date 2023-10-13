import { Pessoa, RegisterPessoa, Usuario } from ".";

export type Secretaria = {
  pessoa: Pessoa;
};

export type RegisterSecretaria = {
  pessoa: RegisterPessoa;
  usuario: Usuario;
};
