import { medlinked } from "@medlinked/api";
import {
  SecretariaMedicoPaginatedResponse,
  SecretariaMedicoResponse,
  TokenData,
} from "@medlinked/types";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";

export function getAllMedicosSecretariaPaginated(
  pageNumber: number,
  pageSize: number,
) {
  return medlinked.get<SecretariaMedicoPaginatedResponse>(
    `secretaria/medico/${
      jwt_decode<TokenData>(Cookies.get("token")!).idUsuario
    }/paginado?page=${pageNumber}&pageSize=${pageSize}`,
  );
}

export function getAllMedicosSecretaria() {
  return medlinked.get<SecretariaMedicoResponse>(
    `secretaria/medico/${
      jwt_decode<TokenData>(Cookies.get("token")!).idUsuario
    }`,
  );
}

export function associateMedicoSecretaria(idMedico: number) {
  return medlinked.put(
    `secretaria/medico/associate/${
      jwt_decode<TokenData>(Cookies.get("token")!).idUsuario
    }/${idMedico}`,
  );
}

export function disassociateMedicoSecretaria(idMedico: number) {
  return medlinked.put(
    `secretaria/medico/disassociate/${
      jwt_decode<TokenData>(Cookies.get("token")!).idUsuario
    }/${idMedico}`,
  );
}
