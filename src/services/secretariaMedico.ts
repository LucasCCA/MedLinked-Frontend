import { medlinked } from "@medlinked/api";
import { SecretariaMedicoResponse, TokenData } from "@medlinked/types";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";

export function getAllMedicosSecretaria(pageNumber: number, pageSize: number) {
  return medlinked.get<SecretariaMedicoResponse>(
    `secretaria/medico/${
      jwt_decode<TokenData>(Cookies.get("token")!).idUsuario
    }?page=${pageNumber}&pageSize=${pageSize}`,
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
