import { medlinked } from "@medlinked/api";
import { Pessoa } from "@medlinked/types";

export function getPessoaByCpf(cpf: number) {
  return medlinked.post<Pessoa>("pessoa/cpf", {
    cpf: cpf,
  });
}
