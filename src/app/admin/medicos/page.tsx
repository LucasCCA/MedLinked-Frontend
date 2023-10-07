"use client";

import { medlinked } from "@medlinked/api";
import {
  Button,
  Card,
  CustomText,
  Input,
  Pagination,
  Select,
} from "@medlinked/components";
import {
  EspecializacaoResponse,
  Medico,
  MedicoResponse,
  PlanosSaudeResponse,
} from "@medlinked/types";
import { useEffect, useState } from "react";
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
  const [medicos, setMedicos] = useState<MedicoResponse>([]);
  const [currentMedico, setCurrentMedico] = useState<Medico>();
  const [planosSaude, setPlanosSaude] = useState<PlanosSaudeResponse>([]);
  const [especializacoes, setEspecializacoes] =
    useState<EspecializacaoResponse>([]);

  useEffect(() => {
    function getMedicos() {
      return medlinked.get<MedicoResponse>("medico");
    }

    function getEspecializacoes() {
      return medlinked.get<EspecializacaoResponse>("especialidade");
    }

    function getPlanosSaude() {
      return medlinked.get<PlanosSaudeResponse>("plano-saude");
    }

    getMedicos().then((response) => setMedicos(response.data));
    getEspecializacoes().then((response) => setEspecializacoes(response.data));
    getPlanosSaude().then((response) => setPlanosSaude(response.data));
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
      <FiltersContainer>
        <Button icon="plus" fullWidth>
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
        <Button
          icon="calendar"
          href={`/admin/medicos/agendamento/${currentMedico?.idMedico}`}
          fullWidth
          disabled={currentMedico == null}
        >
          Agendamentos
        </Button>
      </FiltersContainer>
      <FiltersContainer>
        <Select
          placeholder="Pesquise por especialização"
          options={especializacoesOptions}
          fullWidth
          disabled={especializacoes.length < 1}
        />
        <Select
          placeholder="Pesquise por convênio"
          options={planosSaudeOptions}
          fullWidth
          disabled={planosSaude.length < 1}
        />
        <Input placeholder="Pesquise por nome" fullWidth />
      </FiltersContainer>
      {medicos.length > 0 && (
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
      )}
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
    </>
  );
}
