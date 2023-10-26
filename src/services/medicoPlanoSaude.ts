import { medlinked } from "@medlinked/api";
import { MedicoPlanoSaudeResponse } from "@medlinked/types";

export function associatePlanoSaudeMedico(
  idPlanoSaude: number,
  idMedico: number,
) {
  return medlinked.put(
    `plano-saude/medico/adiciona-planos-medico/${idMedico}`,
    {
      idsPlanosSaude: [idPlanoSaude],
    },
  );
}

export function removePlanoSaudeMedico(idPlanoSaude: number, idMedico: number) {
  return medlinked.put(
    // eslint-disable-next-line max-len
    `plano-saude/medico/update-medico-remove-plano/${idMedico}/${idPlanoSaude}`,
  );
}

export function getAllPlanosSaudeMedico(
  idMedico: number,
  pageNumber: number,
  pageSize: number,
) {
  return medlinked.get<MedicoPlanoSaudeResponse>(
    `plano-saude/medico/${idMedico}?page=${pageNumber}&pageSize=${pageSize}`,
  );
}
