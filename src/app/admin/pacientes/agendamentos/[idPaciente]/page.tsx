"use client";

import {
  Breadcrumb,
  Button,
  Card,
  CustomLink,
  CustomText,
  Modal,
  NoResults,
  OptionData,
  Select,
  Spacing,
  Spinner,
} from "@medlinked/components";
import {
  deleteAgendamento,
  getAllAgendamentos,
  getAllMedicosSecretaria,
} from "@medlinked/services";
import {
  AgendamentoResponse,
  SecretariaMedicoResponse,
} from "@medlinked/types";
import { cpfMask, formatCpf } from "@medlinked/utils";
import { Pen, Trash } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  CalendarResultContentContainer,
  CardInfoContainer,
  CardsContainer,
  ModalFieldsContainer,
  SingleFilterContainer,
} from "../../../styles";

const breadcrumbItems = [
  {
    label: "Paciente",
    href: "/admin/pacientes",
  },
  {
    label: "Agendamentos",
    href: "",
  },
];

export default function Page() {
  const params = useParams();
  const [medicos, setMedicos] = useState<SecretariaMedicoResponse>([]);
  const [currentMedicoFilter, setCurrentMedicoFilter] = useState({
    label: "",
    value: "",
  });
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [agendamentos, setAgendamentos] = useState<AgendamentoResponse>([]);
  const [currentAgendamento, setCurrentAgendamento] = useState(0);

  function getAgendamentos() {
    setLoading(true);

    getAllAgendamentos(
      Number(currentMedicoFilter.value),
      Number(params.idPaciente),
    )
      .then((response) => setAgendamentos(response.data))
      .catch(() =>
        toast.error(
          // eslint-disable-next-line max-len
          "Ocorreu um erro ao buscar agendamentos. Tente novamente mais tarde.",
        ),
      )
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    function getMedicos() {
      setLoading(true);

      getAllMedicosSecretaria()
        .then((response) => setMedicos(response.data))
        .catch(() =>
          toast.error(
            "Ocorreu um erro ao buscar médicos. Tente novamente mais tarde.",
          ),
        )
        .finally(() => setLoading(false));
    }

    getMedicos();
  }, []);

  useEffect(() => {
    getAgendamentos();
  }, [currentMedicoFilter]);

  const medicosFilterOptions: OptionData[] = [
    { label: "Todos os médicos", value: "0" },
  ];

  for (let i = 0; i < medicos.length; i++) {
    medicosFilterOptions.push({
      label: `${medicos[i].nome} - CPF ${cpfMask(formatCpf(medicos[i].cpf))}`,
      value: medicos[i].idMedico.toString(),
    });
  }

  function handleDelete() {
    deleteAgendamento(currentAgendamento)
      .then(() => {
        setOpenModal(false);
        getAgendamentos();
        toast.success("Agendamento deletado com sucesso!");
      })
      .catch(() =>
        toast.error(
          // eslint-disable-next-line max-len
          "Ocorreu um erro ao deletar o agendamento. Tente novamente mais tarde.",
        ),
      );
  }

  return (
    <>
      <Modal title="Confirmação" open={openModal} setOpen={setOpenModal}>
        <CustomText $align="center">
          Você realmente deseja deletar esse agendamento?
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
      </Modal>
      <Spacing>
        <Breadcrumb items={breadcrumbItems} />
      </Spacing>
      <Spacing>
        <SingleFilterContainer>
          <Select
            options={medicosFilterOptions}
            fullWidth
            placeholder="Pesquise por médico"
            disabled={loading}
            outsideSelected={currentMedicoFilter}
            setOutsideSelected={setCurrentMedicoFilter}
          />
        </SingleFilterContainer>
      </Spacing>
      {loading && <Spinner />}
      {agendamentos.length > 0 ? (
        <Spacing>
          <CardsContainer>
            {agendamentos.map((agendamento) => (
              <Card key={agendamento.idAgendamento}>
                <CalendarResultContentContainer>
                  <div>
                    <CardInfoContainer>
                      <CustomText $size="h2">
                        {`${agendamento.dataHoraInicioAgendamento.slice(
                          8,
                          10,
                        )}/${agendamento.dataHoraFimAgendamento.slice(
                          5,
                          7,
                        )}/${agendamento.dataHoraFimAgendamento.slice(0, 4)}`}
                      </CustomText>
                    </CardInfoContainer>
                    <CardInfoContainer>
                      <CustomText $size="h2">
                        {`${agendamento.dataHoraInicioAgendamento.slice(
                          11,
                          16,
                        )} - 
                          ${agendamento.dataHoraFimAgendamento.slice(11, 16)}`}
                      </CustomText>
                      <CustomText $size="h3" $weight={300}>
                        {`(${
                          agendamento.tipoAgendamento.charAt(0).toUpperCase() +
                          agendamento.tipoAgendamento.slice(1).toLowerCase()
                        })`}
                      </CustomText>
                    </CardInfoContainer>
                    <CardInfoContainer>
                      <CustomText $size="h3">Paciente:</CustomText>
                      <CustomText $size="h3" $weight={300}>
                        {agendamento.paciente?.pessoa?.nome || ""}
                      </CustomText>
                    </CardInfoContainer>
                    <CardInfoContainer>
                      <CustomText $size="h3">Médico:</CustomText>
                      <CustomText $size="h3" $weight={300}>
                        {agendamento.medico.pessoa.nome}
                      </CustomText>
                    </CardInfoContainer>
                  </div>
                  <div>
                    <CustomLink
                      href={`/admin/agenda/${agendamento.idAgendamento}`}
                    >
                      <Pen />
                    </CustomLink>
                    <Trash
                      onClick={() => {
                        setCurrentAgendamento(agendamento.idAgendamento);
                        setOpenModal(true);
                      }}
                    />
                  </div>
                </CalendarResultContentContainer>
              </Card>
            ))}
          </CardsContainer>
        </Spacing>
      ) : (
        !loading && (
          <NoResults
            message={"Nenhum agendamento encontrado para esse paciente"}
          />
        )
      )}
    </>
  );
}
