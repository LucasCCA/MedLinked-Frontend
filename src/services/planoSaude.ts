import { medlinked } from "@medlinked/api";
import {
  CreatePlanoSaude,
  PlanosSaudePaginatedResponse,
  PlanosSaudeResponse,
} from "@medlinked/types";

export function getAllPlanosSaude() {
  return medlinked.get<PlanosSaudeResponse>("plano-saude");
}

export function getAllPlanosSaudePaginated(
  pageNumber: number,
  pageSize: number,
) {
  return medlinked.get<PlanosSaudePaginatedResponse>(
    `plano-saude/paginado?page=${pageNumber}&pageSize=${pageSize}`,
  );
}

export function deletePlanoSaude(idPlanoSaude: number) {
  return medlinked.delete(`plano-saude/delete/${idPlanoSaude}`);
}

export function createPlanoSaude(data: CreatePlanoSaude) {
  return medlinked.post("plano-saude/create", {
    descricao: data.descricao,
  });
}
