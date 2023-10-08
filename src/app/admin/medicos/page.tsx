"use client";

import { medlinked } from "@medlinked/api";
import {
  Button,
  Card,
  CustomText,
  Input,
  NoResults,
  Pagination,
  Select,
  Spacing,
  Spinner,
} from "@medlinked/components";
import {
  EspecializacaoResponse,
  Medico,
  MedicoResponse,
  PlanosSaudeResponse,
} from "@medlinked/types";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
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
  const [pageNumber, setPageNumber] = useState(1);
  const [loading, setLoading] = useState(true);
  const [medicos, setMedicos] = useState<MedicoResponse>([]);
  const [currentMedico, setCurrentMedico] = useState<Medico>();
  const [planosSaude, setPlanosSaude] = useState<PlanosSaudeResponse>([]);
  const [especializacoes, setEspecializacoes] =
    useState<EspecializacaoResponse>([]);

  useEffect(() => {
    function getMedicos() {
      medlinked
        .get<MedicoResponse>("medico")
        .then((response) => {
          setMedicos(response.data);
          setLoading(false);
        })
        .catch(() => {
          setLoading(false);
          toast.error(
            "Ocorreu um erro ao buscar médicos. Tente novamente mais tarde.",
          );
        });
    }

    function getEspecializacoes() {
      medlinked
        .get<EspecializacaoResponse>("especialidade")
        .then((response) => setEspecializacoes(response.data));
    }

    function getPlanosSaude() {
      medlinked
        .get<PlanosSaudeResponse>("plano-saude")
        .then((response) => setPlanosSaude(response.data));
    }

    getMedicos();
    getEspecializacoes();
    getPlanosSaude();
  }, []);

  const especializacoesOptions = [];

  for (let i = 0; i < especializacoes.length; i++) {
    especializacoesOptions.push({
      label: especializacoes[i].descricao,
      value: especializacoes[i].idEspecialidade.toString(),
    });
  }

  const planosSaudeOptions = [];

  for (let i = 0; i < planosSaude.length; i++) {
    planosSaudeOptions.push({
      label: planosSaude[i].descricao,
      value: planosSaude[i].idPlanoSaude.toString(),
    });
  }

  function changePage(number: number) {
    setPageNumber(number);
  }

  return (
    <>
      <Spacing>
        <FiltersContainer>
          <Button icon="plus" href="/admin/medicos/medico/0" fullWidth>
            Médico
          </Button>
          <Button
            icon="pen"
            href={`/admin/medicos/medico/${currentMedico?.idMedico}`}
            fullWidth
            disabled={currentMedico == null}
          >
            Visualizar / Editar
          </Button>
          <Button
            icon="trash"
            color="red_80"
            fullWidth
            disabled={currentMedico == null}
          >
            Deletar
          </Button>
          {/* <Button
            icon="calendar"
            href={`/admin/medicos/agendamento/${currentMedico?.idMedico}`}
            fullWidth
            disabled={currentMedico == null}
          >
            Agendamentos
          </Button> */}
        </FiltersContainer>
      </Spacing>
      <Spacing>
        <FiltersContainer>
          <Select
            placeholder="Pesquise por especialização"
            options={especializacoesOptions}
            fullWidth
            disabled={loading}
          />
          <Select
            placeholder="Pesquise por convênio"
            options={planosSaudeOptions}
            fullWidth
            disabled={loading}
          />
          <Input
            placeholder="Pesquise por nome"
            fullWidth
            disabled={loading}
            maxLength={120}
          />
        </FiltersContainer>
      </Spacing>
      {loading && <Spinner />}
      {medicos.length > 0 ? (
        <Spacing>
          <CardsContainer>
            {medicos.map((medico) => (
              <Card
                $selectable
                key={medico.idMedico}
                onClick={() => setCurrentMedico(medico)}
                $selected={currentMedico?.idMedico == medico.idMedico}
              >
                <CustomText $size="h2">{medico.pessoa.nome}</CustomText>
                <CustomText $size="h3">CRM: PR-36730</CustomText>
                <CustomText $size="h3">
                  Especialidades: Oftalmologista, Pediatra
                </CustomText>
              </Card>
            ))}
          </CardsContainer>
        </Spacing>
      ) : (
        !loading && <NoResults message={"Nenhum médico encontrado"} />
      )}
      {!loading && (
        <PaginationAndRecordsContainer>
          <Select
            options={records}
            defaultSelected={records[0]}
            fullWidth
            readOnly
          />
          <Pagination
            pageNumber={pageNumber}
            changePage={changePage}
            numberOfPages={15}
          />
        </PaginationAndRecordsContainer>
      )}
    </>
  );
}
