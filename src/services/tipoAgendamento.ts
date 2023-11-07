import { medlinked } from "@medlinked/api";

export function getAllTiposAgendamento() {
  return medlinked.get<string[]>("tipo-agendamento");
}
