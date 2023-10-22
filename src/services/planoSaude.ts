import { medlinked } from "@medlinked/api";
import { PlanosSaudeResponse } from "@medlinked/types";

export function getAllPlanosSaude() {
  return medlinked.get<PlanosSaudeResponse>("plano-saude");
}
