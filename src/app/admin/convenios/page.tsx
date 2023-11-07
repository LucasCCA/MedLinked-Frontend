"use client";

import { yupResolver } from "@hookform/resolvers/yup";
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
import { registerPlanoSaudeSchema } from "@medlinked/schemas";
import {
  createPlanoSaude,
  deletePlanoSaude,
  getAllPlanosSaudePaginated,
} from "@medlinked/services";
import {
  CreatePlanoSaude,
  PlanosSaudePaginatedResponse,
} from "@medlinked/types";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import {
  CardsContainer,
  FiltersContainer,
  ModalFieldsContainer,
  PaginationAndRecordsContainer,
  StyledForm,
} from "../styles";

const records = [
  { label: "5", value: "5" },
  { label: "10", value: "10" },
  { label: "25", value: "25" },
];

export default function Page() {
  const [loading, setLoading] = useState(true);
  const [convenios, setConvenios] = useState<PlanosSaudePaginatedResponse>({
    content: [],
    pageable: { pageNumber: 0, pageSize: 0 },
    totalPages: 0,
  });
  const [pageNumber, setPageNumber] = useState(0);
  const [selectedPageSize, setSelectedPageSize] = useState({
    label: "5",
    value: "5",
  });
  const [currentIdConvenio, setCurrentIdConvenio] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const [modalText, setModalText] = useState(0);

  const {
    register,
    handleSubmit,
    formState: { errors },
    resetField,
  } = useForm<CreatePlanoSaude>({
    resolver: yupResolver(registerPlanoSaudeSchema),
  });

  function getConvenios() {
    setConvenios({
      content: [],
      pageable: { pageNumber: 0, pageSize: 0 },
      totalPages: 0,
    });
    setLoading(true);

    getAllPlanosSaudePaginated(pageNumber, Number(selectedPageSize.value))
      .then((response) => setConvenios(response.data))
      .catch(() =>
        toast.error(
          "Ocorreu um erro ao buscar convênios. Tente novamente mais tarde.",
        ),
      )
      .finally(() => setLoading(false));
  }

  function handleDelete() {
    deletePlanoSaude(currentIdConvenio)
      .then(() => {
        setCurrentIdConvenio(0);
        setOpenModal(false);
        getConvenios();
        toast.success("Convênio deletado com sucesso!");
      })
      .catch(() =>
        toast.error(
          "Ocorreu um erro ao deletar o convênio. Tente novamente mais tarde.",
        ),
      );
  }

  useEffect(() => {
    getConvenios();
  }, [pageNumber, selectedPageSize]);

  const onSubmit: SubmitHandler<CreatePlanoSaude> = (data) => {
    setLoading(true);

    createPlanoSaude(data)
      .then(() => {
        toast.success("Convênio cadastrado com sucesso!");
        getConvenios();
      })
      .catch((error) => toast.error(error.response.data))
      .finally(() => {
        setOpenModal(false);
        resetField("descricao");
        setLoading(false);
      });
  };

  function changePage(number: number) {
    setPageNumber(number);
  }

  return (
    <>
      <Modal
        title={modalText == 1 ? "Novo convênio" : "Confirmação"}
        open={openModal}
        setOpen={setOpenModal}
      >
        {modalText == 1 && (
          <StyledForm onSubmit={handleSubmit(onSubmit)}>
            <Input
              placeholder="Nome *"
              fullWidth
              maxLength={130}
              register={{ ...register("descricao") }}
              hasError={Boolean(errors.descricao)}
              errorMessage={errors.descricao?.message}
              autoComplete="off"
            />
            <CustomText $weight={500}>* Campo Obrigatório</CustomText>
            <ModalFieldsContainer>
              <Button
                fullWidth
                textAlign="center"
                type="submit"
                disabled={loading}
              >
                Cadastrar
              </Button>
            </ModalFieldsContainer>
          </StyledForm>
        )}
        {modalText == 2 && (
          <>
            <CustomText $align="center">
              Você realmente deseja deletar esse convênio?
            </CustomText>
            <ModalFieldsContainer>
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
            </ModalFieldsContainer>
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
            Convênio
          </Button>
          <Button
            icon="Trash"
            color="red_80"
            fullWidth
            disabled={currentIdConvenio == 0}
            onClick={() => {
              setOpenModal(true);
              setModalText(2);
            }}
          >
            Deletar
          </Button>
        </FiltersContainer>
      </Spacing>
      {loading && <Spinner />}
      {convenios.content.length > 0 ? (
        <Spacing>
          <CardsContainer>
            {convenios.content.map((convenio) => (
              <Card
                $selectable
                key={convenio.idPlanoSaude}
                onClick={() => setCurrentIdConvenio(convenio.idPlanoSaude)}
                $selected={currentIdConvenio == convenio.idPlanoSaude}
              >
                <CustomText $size="h2">{convenio.descricao}</CustomText>
              </Card>
            ))}
          </CardsContainer>
        </Spacing>
      ) : (
        !loading && <NoResults message={"Nenhum convênio encontrado"} />
      )}
      {!loading && convenios.content.length > 0 && (
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
            numberOfPages={convenios.totalPages}
          />
        </PaginationAndRecordsContainer>
      )}
    </>
  );
}
