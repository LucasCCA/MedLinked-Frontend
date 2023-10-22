import { medlinked } from "@medlinked/api";
import { EspecializacaoResponse } from "@medlinked/types";

export function getAllEspecialidades() {
  return medlinked.get<EspecializacaoResponse>("especialidade");
}
