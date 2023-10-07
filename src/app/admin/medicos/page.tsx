"use client";

import {
  Button,
  Card,
  CustomText,
  Input,
  Pagination,
  Select,
} from "@medlinked/components";
import { useState } from "react";
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

  function changePage(number: number) {
    setPageNumber(number);
  }

  return (
    <>
      <FiltersContainer>
        <Button icon="plus" fullWidth>
          Médico
        </Button>
        <Button icon="pen" href="/admin/medicos/medico" fullWidth disabled>
          Visualizar / Editar
        </Button>
        <Button icon="trash" color="red_80" fullWidth disabled>
          Deletar
        </Button>
        <Button
          icon="calendar"
          href="/admin/medicos/agendamento"
          fullWidth
          disabled
        >
          Agendamentos
        </Button>
      </FiltersContainer>
      <FiltersContainer>
        <Select
          placeholder="Pesquise por especialização"
          options={[]}
          fullWidth
        />
        <Select placeholder="Pesquise por convênio" options={[]} fullWidth />
        <Input placeholder="Pesquise por nome" fullWidth />
      </FiltersContainer>
      <CardsContainer>
        <Card $selectable>
          <CustomText $size="h2">Dr. Fulano</CustomText>
          <CustomText $size="h3">CRM: PR-36730</CustomText>
          <CustomText $size="h3">
            Especialidades: Oftalmologista, Pediatra
          </CustomText>
        </Card>
        <Card $selectable>
          <CustomText $size="h2">Dr. Fulano</CustomText>
          <CustomText $size="h3">CRM: PR-36730</CustomText>
          <CustomText $size="h3">
            Especialidades: Oftalmologista, Pediatra
          </CustomText>
        </Card>
      </CardsContainer>
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
