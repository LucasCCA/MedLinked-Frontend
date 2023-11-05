"use client";

import {
  Button,
  Card,
  CustomText,
  Input,
  Modal,
  NoResults,
  Pagination,
  Select,
  Spacing,
  Spinner,
} from "@medlinked/components";
import { deletePaciente, getAllPacientes } from "@medlinked/services";
import { PacienteResponse } from "@medlinked/types";
import {
  cpfMask,
  formatCpf,
  formatPhoneNumber,
  onlyNumbers,
} from "@medlinked/utils";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  CardInfoContainer,
  CardsContainer,
  FiltersContainer,
  ModalFieldsContainer,
  PaginationAndRecordsContainer,
} from "../styles";

const records = [
  { label: "5", value: "5" },
  { label: "10", value: "10" },
  { label: "25", value: "25" },
];

export default function Page() {
  const [loading, setLoading] = useState(true);
  const [pacientes, setPacientes] = useState<PacienteResponse>({
    content: [],
    pageable: { pageNumber: 0, pageSize: 0 },
    totalPages: 0,
  });
  const [pageNumber, setPageNumber] = useState(0);
  const [selectedPageSize, setSelectedPageSize] = useState({
    label: "5",
    value: "5",
  });
  const [name, setName] = useState("");
  const [cpf, setCpf] = useState("");
  const [filledCpf, setFilledCpf] = useState(false);
  const [currentIdPaciente, setCurrentIdPaciente] = useState(0);
  const [openModal, setOpenModal] = useState(false);

  function getPacientes() {
    setPacientes({
      content: [],
      pageable: { pageNumber: 0, pageSize: 0 },
      totalPages: 0,
    });
    setLoading(true);

    getAllPacientes(
      pageNumber,
      Number(selectedPageSize.value),
      name,
      onlyNumbers(cpf),
    )
      .then((response) => setPacientes(response.data))
      .catch(() =>
        toast.error(
          "Ocorreu um erro ao buscar pacientes. Tente novamente mais tarde.",
        ),
      )
      .finally(() => setLoading(false));
  }

  function handleDelete() {
    deletePaciente(currentIdPaciente)
      .then(() => {
        setCurrentIdPaciente(0);
        setOpenModal(false);
        getPacientes();
        toast.success("Paciente deletado com sucesso!");
      })
      .catch(() =>
        toast.error(
          "Ocorreu um erro ao deletar o paciente. Tente novamente mais tarde.",
        ),
      );
  }

  useEffect(() => {
    getPacientes();
  }, [pageNumber, selectedPageSize, name, filledCpf]);

  useEffect(() => {
    if (cpf.length == 14) setFilledCpf(true);
    else setFilledCpf(false);
  }, [cpf]);

  function changePage(number: number) {
    setPageNumber(number);
  }

  return (
    <>
      <Modal title="Confirmação" open={openModal} setOpen={setOpenModal}>
        <>
          <CustomText $align="center">
            Você realmente deseja deletar esse paciente?
          </CustomText>
          <ModalFieldsContainer>
            <Button fullWidth textAlign="center" onClick={() => handleDelete()}>
              Sim
            </Button>
            <Button
              fullWidth
              textAlign="center"
              onClick={() => setOpenModal(false)}
              color="red_80"
            >
              Não
            </Button>
          </ModalFieldsContainer>
        </>
      </Modal>
      <Spacing>
        <FiltersContainer>
          <Button icon="Plus" href="/admin/pacientes/0" fullWidth>
            Paciente
          </Button>
          <Button
            icon="Pen"
            href={`/admin/pacientes/${currentIdPaciente}`}
            fullWidth
            disabled={currentIdPaciente == 0}
          >
            Visualizar / Editar
          </Button>
          <Button
            icon="Trash"
            color="red_80"
            fullWidth
            disabled={currentIdPaciente == 0}
            onClick={() => setOpenModal(true)}
          >
            Deletar
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
            onChange={(e) => {
              if (e.currentTarget.value.length > 2)
                setName(e.currentTarget.value);
              else if (e.currentTarget.value.length == 0) setName("");
            }}
          />
          <Input
            placeholder="Pesquise por CPF"
            fullWidth
            maxLength={14}
            value={cpf}
            onChange={(e) => setCpf(cpfMask(e.currentTarget.value))}
            disabled={loading}
          />
        </FiltersContainer>
      </Spacing>
      {loading && <Spinner />}
      {pacientes.content.length > 0 ? (
        <Spacing>
          <CardsContainer>
            {pacientes.content.map((paciente) => (
              <Card
                $selectable
                key={paciente.idPaciente}
                onClick={() => setCurrentIdPaciente(paciente.idPaciente)}
                $selected={currentIdPaciente == paciente.idPaciente}
              >
                <CustomText $size="h2">{paciente.pessoa.nome}</CustomText>
                <CardInfoContainer>
                  <CustomText $size="h3">CPF:</CustomText>
                  <CustomText $size="h3" $weight={300}>
                    {cpfMask(formatCpf(paciente.pessoa.cpf))}
                  </CustomText>
                </CardInfoContainer>
                <CardInfoContainer>
                  <CustomText $size="h3">Telefone:</CustomText>
                  <CustomText $size="h3" $weight={300}>
                    {formatPhoneNumber(paciente.pessoa.celular.toString())}
                  </CustomText>
                </CardInfoContainer>
              </Card>
            ))}
          </CardsContainer>
        </Spacing>
      ) : (
        !loading && <NoResults message={"Nenhum paciente encontrado"} />
      )}
      {!loading && pacientes.content.length > 0 && (
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
            numberOfPages={pacientes.totalPages}
          />
        </PaginationAndRecordsContainer>
      )}
    </>
  );
}
