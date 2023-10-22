import { medlinked } from "@medlinked/api";
import { SecretariaMedicoResponse, TokenData } from "@medlinked/types";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";

export function getAllMedicosSecretaria(
  pageNumber: number,
  selectedPageSize: number,
) {
  return medlinked.get<SecretariaMedicoResponse>(
    `secretaria/medico/${
      jwt_decode<TokenData>(Cookies.get("token")!).idUsuario
    }?page=${pageNumber}&pageSize=${selectedPageSize}`,
  );
}
