import { medlinked } from "@medlinked/api";
import { TipoPlanoSaudeResponse } from "@medlinked/types";

export function getAllTiposPlanoSaude() {
  return medlinked.get<TipoPlanoSaudeResponse>("tipo-plano-saude");
}
