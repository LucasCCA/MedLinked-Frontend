import { medlinked } from "@medlinked/api";
import { EstadoResponse } from "@medlinked/types";

export function getAllEstados() {
  return medlinked.get<EstadoResponse>("estado");
}
