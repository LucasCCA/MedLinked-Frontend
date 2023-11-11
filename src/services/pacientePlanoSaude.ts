import { medlinked } from "@medlinked/api";
import {
  PacientePlanoSaudeResponse,
  PlanosSaudeResponse,
} from "@medlinked/types";

export function associatePlanoSaudePaciente(
  idPlanoSaude: number,
  idPaciente: number,
  numeroCarteirinha: number,
  idTipoPlanoSaude: number,
) {
  return medlinked.put(
    `plano-saude/paciente/associate/${idPaciente}/${idPlanoSaude}`,
    {
      numeroCarteirinha: numeroCarteirinha,
      idTipoPlanoSaude: idTipoPlanoSaude,
    },
  );
}

export function removePlanoSaudePaciente(
  idPlanoSaude: number,
  idPaciente: number,
) {
  return medlinked.put(
    `plano-saude/paciente/disassociate/${idPaciente}/${idPlanoSaude}`,
  );
}

export function getAllPlanosSaudePaciente(idPaciente: number) {
  return medlinked.get<PacientePlanoSaudeResponse>(
    `plano-saude/paciente/${idPaciente}`,
  );
}

export function getAllPlanosSaudePacienteMedico(
  idPaciente: number,
  idMedico: number,
) {
  return medlinked.get<PlanosSaudeResponse>(
    `plano-saude/paciente/medico/${idPaciente}/${idMedico}`,
  );
}
