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
import { Paciente, PacienteResponse } from "@medlinked/types";
import { cpfMask } from "@medlinked/utils";
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
  const [pacientes, setPacientes] = useState<PacienteResponse>([]);
  const [currentPaciente, setCurrentPaciente] = useState<Paciente>();
  const [cpf, setCpf] = useState("");

  function changePage(number: number) {
    setPageNumber(number);
  }

  useEffect(() => {
    function getPacientes() {
      medlinked
        .get<Paciente>("paciente/4")
        .then((response) => {
          setPacientes([response.data]);
          setLoading(false);
        })
        .catch(() => {
          setLoading(false);
          toast.error(
            "Ocorreu um erro ao buscar pacientes. Tente novamente mais tarde.",
          );
        });
    }

    getPacientes();
  }, []);

  return (
    <>
      <Spacing>
        <FiltersContainer>
          <Button icon="Plus" href="/admin/pacientes/0" fullWidth>
            Paciente
          </Button>
          <Button
            icon="Pen"
            href={`/admin/pacientes/${currentPaciente?.paciente.idPaciente}`}
            fullWidth
            disabled={currentPaciente == null}
          >
            Visualizar / Editar
          </Button>
          <Button
            icon="Trash"
            color="red_80"
            fullWidth
            disabled={currentPaciente == null}
          >
            Deletar
          </Button>
          <Button
            icon="Calendar"
            // eslint-disable-next-line max-len
            href={`/admin/pacientes/agendamento/${currentPaciente?.paciente.idPaciente}`}
            fullWidth
            disabled={currentPaciente == null}
          >
            Agendamentos
          </Button>
        </FiltersContainer>
      </Spacing>
      <Spacing>
        <FiltersContainer>
          <Input
            placeholder="Pesquise por nome"
            fullWidth
            disabled={loading}
            maxLength={120}
          />
          <Input
            placeholder="Digite o CPF *"
            fullWidth
            maxLength={14}
            value={cpf}
            onChange={(e) => setCpf(cpfMask(e.currentTarget.value))}
            disabled={loading}
          />
        </FiltersContainer>
      </Spacing>
      {loading && <Spinner />}
      {pacientes.length > 0 ? (
        <Spacing>
          <CardsContainer>
            {pacientes.map((paciente) => (
              <Card
                $selectable
                key={paciente.paciente.idPaciente}
                onClick={() => setCurrentPaciente(paciente)}
                $selected={
                  currentPaciente?.paciente.idPaciente ==
                  paciente.paciente.idPaciente
                }
              >
                <CustomText $size="h2">
                  {paciente.paciente.pessoa.nome}
                </CustomText>
                <CustomText $size="h3">
                  CPF: {cpfMask(paciente.paciente.pessoa.cpf.toString())}
                </CustomText>
                <CustomText $size="h3">
                  Convênios: Convênio X, Convênio Y
                </CustomText>
              </Card>
            ))}
          </CardsContainer>
        </Spacing>
      ) : (
        !loading && <NoResults message={"Nenhum paciente encontrado"} />
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
