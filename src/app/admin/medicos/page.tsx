"use client";

import { medlinked } from "@medlinked/api";
import {
  Button,
  Card,
  CustomText,
  NoResults,
  Pagination,
  Select,
  Spacing,
  Spinner,
} from "@medlinked/components";
import { SecretariaMedicoResponse, TokenData } from "@medlinked/types";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  CardInfoContainer,
  CardsContainer,
  FiltersContainer,
  PaginationAndRecordsContainer,
} from "./styles";

const records = [
  { label: "5", value: "5" },
  { label: "10", value: "10" },
  { label: "25", value: "25" },
];

export default function Page() {
  const [loading, setLoading] = useState(true);
  const [medicos, setMedicos] = useState<SecretariaMedicoResponse>({
    content: [],
    pageable: { pageNumber: 0, pageSize: 0 },
    totalPages: 0,
  });
  const [pageNumber, setPageNumber] = useState(0);
  const [selectedPageSize, setSelectedPageSize] = useState({
    label: "5",
    value: "5",
  });
  const [currentIdMedico, setCurrentIdMedico] = useState(0);

  const getMedicos = useCallback(() => {
    medlinked
      .get<SecretariaMedicoResponse>(
        `secretaria/medico/${
          jwt_decode<TokenData>(Cookies.get("token")!).idUsuario
        }?page=${pageNumber}&pageSize=${Number(selectedPageSize.value)}`,
      )
      .then((response) => setMedicos(response.data))
      .catch(() =>
        toast.error(
          "Ocorreu um erro ao buscar médicos. Tente novamente mais tarde.",
        ),
      )
      .finally(() => setLoading(false));
  }, [pageNumber, selectedPageSize]);

  useEffect(() => {
    getMedicos();
  }, [pageNumber, selectedPageSize]);

  function changePage(number: number) {
    setPageNumber(number);
  }

  return (
    <>
      <Spacing>
        <FiltersContainer>
          <Button icon="Plus" href="/admin/medicos/medico/0" fullWidth>
            Médico
          </Button>
          <Button
            icon="Pen"
            href={`/admin/medicos/medico/${currentIdMedico}`}
            fullWidth
            disabled={currentIdMedico == 0}
          >
            Visualizar / Editar
          </Button>
          <Button
            icon="Trash"
            color="red_80"
            fullWidth
            disabled={currentIdMedico == 0}
          >
            Deletar
          </Button>
        </FiltersContainer>
      </Spacing>
      {loading && <Spinner />}
      {medicos.content.length > 0 ? (
        <Spacing>
          <CardsContainer>
            {medicos?.content.map((medico) => (
              <Card
                $selectable
                key={medico.idMedico}
                onClick={() => setCurrentIdMedico(medico.idMedico)}
                $selected={currentIdMedico == medico.idMedico}
              >
                <CustomText $size="h2">{medico.nome}</CustomText>
                <CardInfoContainer>
                  <CustomText $size="h3">CRM:</CustomText>
                  <CustomText $size="h3" $weight={300}>
                    {`CRM/${medico.ufCrm} ${medico.numeroCrm.toString()}`}
                  </CustomText>
                </CardInfoContainer>
                <CardInfoContainer>
                  <CustomText $size="h3">Especialidades: </CustomText>
                  <CustomText $size="h3" $weight={300}>
                    {medico.especialidades.map((especialidade) =>
                      especialidade.idEspecialidade !=
                      medico.especialidades[medico.especialidades.length - 1]
                        .idEspecialidade
                        ? `${especialidade.descricao}, `
                        : `${especialidade.descricao}`,
                    )}
                  </CustomText>
                </CardInfoContainer>
              </Card>
            ))}
          </CardsContainer>
        </Spacing>
      ) : (
        !loading && <NoResults message={"Nenhum médico encontrado"} />
      )}
      {!loading && medicos.content.length > 0 && (
        <PaginationAndRecordsContainer>
          <Select
            outsideSelected={selectedPageSize}
            setOutsideSelected={setSelectedPageSize}
            options={records}
            fullWidth
            readOnly
          />
          <Pagination
            pageNumber={pageNumber}
            changePage={changePage}
            numberOfPages={medicos.totalPages}
          />
        </PaginationAndRecordsContainer>
      )}
    </>
  );
}
