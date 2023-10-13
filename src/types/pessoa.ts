export type Pessoa = {
  idPessoa: number;
  nome: string;
  cpf: number;
  email: string;
  celular: number;
};

export type RegisterPessoa = {
  nome: string;
  cpf: string;
  email: string;
  celular: string;
};
