"use client";

import { Button } from "@medlinked/components";
import { ButtonsContainer } from "./styles";

export default function Page() {
  return (
    <>
      <ButtonsContainer>
        <Button icon="plus">Médico</Button>
        <Button icon="pen" href="/admin/medicos/medico">
          Visualizar / Editar
        </Button>
        <Button icon="trash" color="red_80">
          Deletar
        </Button>
        <Button icon="calendar" href="/admin/medicos/agendamento">
          Agendamentos
        </Button>
      </ButtonsContainer>
    </>
  );
}
