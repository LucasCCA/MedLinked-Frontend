import { medlinked } from "@medlinked/api";
import {
  AgendamentoData,
  AgendamentoResponse,
  CreateAgendamento,
  TokenData,
} from "@medlinked/types";
import { onlyNumbers } from "@medlinked/utils";
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

export function getAgendamento(idAgendamento: number) {
  return medlinked.get<AgendamentoData>(
    `agendamento/detalhes/${idAgendamento}`,
  );
}

export function deleteAgendamento(idAgendamento: number) {
  return medlinked.delete(`agendamento/delete/${idAgendamento}`);
}

export function createAgendamento(data: CreateAgendamento) {
  const dateWithoutSlash = onlyNumbers(data.data);
  const startTimeWithoutColon = onlyNumbers(data.horaInicio);
  const endTimeWithoutColon = onlyNumbers(data.horaFim);
  const startDateString = `${dateWithoutSlash.slice(
    4,
    8,
  )}-${dateWithoutSlash.slice(2, 4)}-${dateWithoutSlash.slice(
    0,
    2,
  )} ${startTimeWithoutColon.slice(0, 2)}:${startTimeWithoutColon.slice(
    2,
    4,
  )}:00`;
  const endDateString = `${dateWithoutSlash.slice(
    4,
    8,
  )}-${dateWithoutSlash.slice(2, 4)}-${dateWithoutSlash.slice(
    0,
    2,
  )} ${endTimeWithoutColon.slice(0, 2)}:${endTimeWithoutColon.slice(2, 4)}:00`;

  return medlinked.post<AgendamentoData>("agendamento/create", {
    idMedico: data.idMedico,
    idPaciente: data.idPaciente,
    idPlanoSaude:
      data.idPlanoSaude != 0 && data.idPlanoSaude != undefined
        ? data.idPlanoSaude
        : null,
    descricao: data.descricao,
    tipoAgendamento: data.tipoAgendamento,
    dataHoraInicioAgendamento: startDateString,
    dataHoraFimAgendamento: endDateString,
  });
}

export function updateAgendamento(
  data: CreateAgendamento,
  idAgendamento: number,
) {
  const dateWithoutSlash = onlyNumbers(data.data);
  const startTimeWithoutColon = onlyNumbers(data.horaInicio);
  const endTimeWithoutColon = onlyNumbers(data.horaFim);
  const startDateString = `${dateWithoutSlash.slice(
    4,
    8,
  )}-${dateWithoutSlash.slice(2, 4)}-${dateWithoutSlash.slice(
    0,
    2,
  )} ${startTimeWithoutColon.slice(0, 2)}:${startTimeWithoutColon.slice(
    2,
    4,
  )}:00`;
  const endDateString = `${dateWithoutSlash.slice(
    4,
    8,
  )}-${dateWithoutSlash.slice(2, 4)}-${dateWithoutSlash.slice(
    0,
    2,
  )} ${endTimeWithoutColon.slice(0, 2)}:${endTimeWithoutColon.slice(2, 4)}:00`;

  return medlinked.put<AgendamentoData>(`agendamento/update/${idAgendamento}`, {
    idMedico: data.idMedico,
    idPaciente: data.idPaciente,
    idPlanoSaude:
      data.idPlanoSaude != 0 && data.idPlanoSaude != undefined
        ? data.idPlanoSaude
        : null,
    descricao: data.descricao,
    tipoAgendamento: data.tipoAgendamento,
    dataHoraInicioAgendamento: startDateString,
    dataHoraFimAgendamento: endDateString,
  });
}
