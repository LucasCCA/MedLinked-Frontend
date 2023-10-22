"use client";

import {
  Button,
  Card,
  CustomText,
  Modal,
  NoResults,
  Pagination,
  Select,
  Spacing,
  Spinner,
} from "@medlinked/components";
import {
  deleteMedico,
  disassociateMedicoSecretaria,
  getAllMedicosSecretaria,
} from "@medlinked/services";
import { SecretariaMedicoResponse } from "@medlinked/types";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  CardInfoContainer,
  CardsContainer,
  FiltersContainer,
  ModalButtonContainer,
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
  const [openModal, setOpenModal] = useState(false);
  const [modalText, setModalText] = useState(0);

  function getMedicos() {
    setMedicos({
      content: [],
      pageable: { pageNumber: 0, pageSize: 0 },
      totalPages: 0,
    });
    setLoading(true);

    getAllMedicosSecretaria(pageNumber, Number(selectedPageSize.value))
      .then((response) => setMedicos(response.data))
      .catch(() =>
        toast.error(
          "Ocorreu um erro ao buscar médicos. Tente novamente mais tarde.",
        ),
      )
      .finally(() => setLoading(false));
  }

  function handleDisassociate() {
    disassociateMedicoSecretaria(currentIdMedico)
      .then(() => {
        setCurrentIdMedico(0);
        setOpenModal(false);
        getMedicos();
        toast.success("Médico desvinculado com sucesso!");
      })
      .catch(() =>
        toast.error(
          // eslint-disable-next-line max-len
          "Ocorreu um erro ao desvincular o médico. Tente novamente mais tarde.",
        ),
      );
  }

  function handleDelete() {
    deleteMedico(currentIdMedico)
      .then(() => {
        setCurrentIdMedico(0);
        setOpenModal(false);
        getMedicos();
        toast.success("Médico deletado com sucesso!");
      })
      .catch(() =>
        toast.error(
          "Ocorreu um erro ao deletar o médico. Tente novamente mais tarde.",
        ),
      );
  }

  useEffect(() => {
    getMedicos();
  }, [pageNumber, selectedPageSize]);

  function changePage(number: number) {
    setPageNumber(number);
  }

  return (
    <>
      <Modal title="Confirmação" open={openModal} setOpen={setOpenModal}>
        {modalText == 1 && (
          <>
            <CustomText $align="center">
              Você deseja criar um novo médico ou se vincular a um existente?
            </CustomText>
            <ModalButtonContainer>
              <Button fullWidth href="/admin/medicos/0" textAlign="center">
                Criar novo
              </Button>
              <Button
                fullWidth
                href="/admin/medicos/vincular"
                textAlign="center"
              >
                Vincular a existente
              </Button>
            </ModalButtonContainer>
          </>
        )}
        {modalText == 2 && (
          <>
            <CustomText $align="center">
              Você realmente deseja se desvincular desse médico? Caso ele não
              esteja vinculado a nenhuma outra secretária ele será deletado
            </CustomText>
            <ModalButtonContainer>
              <Button
                fullWidth
                textAlign="center"
                onClick={() => handleDisassociate()}
              >
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
            </ModalButtonContainer>
          </>
        )}
        {modalText == 3 && (
          <>
            <CustomText $align="center">
              Você realmente deseja deletar desse médico?
            </CustomText>
            <ModalButtonContainer>
              <Button
                fullWidth
                textAlign="center"
                onClick={() => handleDelete()}
              >
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
            </ModalButtonContainer>
          </>
        )}
      </Modal>
      <Spacing>
        <FiltersContainer>
          <Button
            icon="Plus"
            fullWidth
            onClick={() => {
              setOpenModal(true);
              setModalText(1);
            }}
          >
            Médico
          </Button>
          <Button
            icon="Pen"
            href={`/admin/medicos/${currentIdMedico}`}
            fullWidth
            disabled={currentIdMedico == 0}
          >
            Visualizar / Editar
          </Button>
          <Button
            icon="Unlink"
            color="red_80"
            fullWidth
            disabled={currentIdMedico == 0}
            onClick={() => {
              setOpenModal(true);
              setModalText(2);
            }}
          >
            Desvincular
          </Button>
          <Button
            icon="Trash"
            color="red_80"
            fullWidth
            disabled={currentIdMedico == 0}
            onClick={() => {
              setOpenModal(true);
              setModalText(3);
            }}
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
                    {`CRM/${medico.estado.uf} ${medico.numeroCrm.toString()}`}
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
