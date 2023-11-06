import { medlinked } from "@medlinked/api";
import { AgendamentoResponse, TokenData } from "@medlinked/types";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";

export function getAllAgendamentos(
  idMedico?: number,
  idPaciente?: number,
  mes?: number,
  ano?: number,
  dia?: number,
) {
  const anoFilter = ano ? `ano=${ano}` : "";
  const mesFilter = mes ? `&mes=${mes}` : "";
  const diaFilter = dia ? `&dia=${dia}` : "";
  const medicoFilter = idMedico && idMedico != 0 ? `&idMedico=${idMedico}` : "";
  const pacienteFilter =
    idPaciente && idPaciente != 0 ? `&idPaciente=${idPaciente}` : "";

  return medlinked.get<AgendamentoResponse>(
    `agendamento/${
      jwt_decode<TokenData>(Cookies.get("token")!).idUsuario
    }?${anoFilter}${mesFilter}${diaFilter}${medicoFilter}${pacienteFilter}`,
  );
}
