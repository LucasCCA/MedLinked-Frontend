"use client";

import {
  Button,
  Calendar,
  Card,
  CustomLink,
  CustomText,
  Modal,
  NoResults,
  OptionData,
  Select,
  Spinner,
  daysOfTheWeek,
  monthsName,
} from "@medlinked/components";
import { theme } from "@medlinked/config";
import {
  deleteAgendamento,
  getAllAgendamentos,
  getAllMedicosSecretaria,
  getAllPacientes,
} from "@medlinked/services";
import {
  AgendamentoResponse,
  PacienteResponse,
  SecretariaMedicoResponse,
} from "@medlinked/types";
import { cpfMask, formatCpf } from "@medlinked/utils";
import { Bookmark, Circle, Pen, Square, Trash } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  CalendarAndResultsContainer,
  CalendarFiltersContainer,
  CalendarLegendContainer,
  CalendarPageContainer,
  CalendarResultContentContainer,
  CardInfoContainer,
  ModalFieldsContainer,
  ResultsContainer,
} from "../styles";

export default function Page() {
  const [loading, setLoading] = useState(true);
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [day, setDay] = useState(new Date().getDate());
  const [monthFilter, setMonthFilter] = useState(new Date().getMonth() + 1);
  const [yearFilter, setYearFilter] = useState(new Date().getFullYear());
  const [openModal, setOpenModal] = useState(false);
  const [modalText, setModalText] = useState(0);
  const [pacientes, setPacientes] = useState<PacienteResponse>([]);
  const [medicos, setMedicos] = useState<SecretariaMedicoResponse>([]);
  const [currentMedicoFilter, setCurrentMedicoFilter] = useState({
    label: "",
    value: "",
  });
  const [currentPacienteFilter, setCurrentPacienteFilter] = useState({
    label: "",
    value: "",
  });
  const [agendamentos, setAgendamentos] = useState<AgendamentoResponse>([]);
  const [allAgendamentos, setAllAgendamentos] = useState<AgendamentoResponse>(
    [],
  );
  const [currentAgendamento, setCurrentAgendamento] = useState(0);

  useEffect(() => {
    function getPacientes() {
      setLoading(true);

      getAllPacientes()
        .then((response) => setPacientes(response.data))
        .catch(() =>
          toast.error(
            "Ocorreu um erro ao buscar pacientes. Tente novamente mais tarde.",
          ),
        )
        .finally(() => setLoading(false));
    }

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

    getPacientes();
    getMedicos();
  }, []);

  function getAgendamentos() {
    setLoading(true);

    getAllAgendamentos(
      Number(currentMedicoFilter.value),
      Number(currentPacienteFilter.value),
    )
      .then((response) => setAllAgendamentos(response.data))
      .catch(() =>
        toast.error(
          // eslint-disable-next-line max-len
          "Ocorreu um erro ao buscar agendamentos. Tente novamente mais tarde.",
        ),
      )
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    getAgendamentos();
  }, [currentMedicoFilter, currentPacienteFilter]);

  function getFilteredAgendamentos() {
    setLoading(true);

    getAllAgendamentos(
      Number(currentMedicoFilter.value),
      Number(currentPacienteFilter.value),
      month,
      year,
      day,
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
    getFilteredAgendamentos();
  }, [year, month, day, currentMedicoFilter, currentPacienteFilter]);

  const pacientesFilterOptions: OptionData[] = [
    { label: "Todos os pacientes", value: "0" },
  ];

  for (let i = 0; i < pacientes.length; i++) {
    pacientesFilterOptions.push({
      label: `${pacientes[i].pessoa.nome} - CPF ${cpfMask(
        formatCpf(pacientes[i].pessoa.cpf),
      )}`,
      value: pacientes[i].idPaciente.toString(),
    });
  }

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
        getFilteredAgendamentos();
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
        {modalText == 1 && (
          <>
            <CustomText $align="center">
              Você deseja criar um único agendamento ou gerar uma agenda para um
              médico?
            </CustomText>
            <ModalFieldsContainer>
              <Button fullWidth href="/admin/agenda/0" textAlign="center">
                Criar único
              </Button>
              <Button fullWidth href="/admin/agenda/gerar" textAlign="center">
                Gerar agenda
              </Button>
            </ModalFieldsContainer>
          </>
        )}
        {modalText == 2 && (
          <>
            <CustomText $align="center">
              Você realmente deseja deletar esse agendamento?
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
      <CalendarPageContainer>
        <CalendarFiltersContainer>
          <Button
            icon="Plus"
            fullWidth
            onClick={() => {
              setModalText(1);
              setOpenModal(true);
            }}
          >
            Agendamento
          </Button>
          <Select
            options={medicosFilterOptions}
            fullWidth
            placeholder="Pesquise por médico"
            disabled={loading}
            outsideSelected={currentMedicoFilter}
            setOutsideSelected={setCurrentMedicoFilter}
          />
          <Select
            options={pacientesFilterOptions}
            fullWidth
            placeholder="Pesquise por paciente"
            disabled={loading}
            outsideSelected={currentPacienteFilter}
            setOutsideSelected={setCurrentPacienteFilter}
          />
          <CalendarLegendContainer>
            <CustomText $size="h3" $align="left">
              Legenda
            </CustomText>
            <CustomText $align="left">
              <Bookmark
                fill={theme.colors.yellow}
                color={theme.colors.yellow}
                size={15}
              />{" "}
              Dia/Mês com consulta marcada
            </CustomText>
            <CustomText $align="left">
              <Circle
                fill={theme.colors.red_80}
                color={theme.colors.red_80}
                size={15}
              />{" "}
              Dia/Mês atual
            </CustomText>
            <CustomText $align="left">
              <Square
                fill={theme.colors.blue_80}
                color={theme.colors.blue_80}
                size={15}
              />{" "}
              Dia/Mês selecionado
            </CustomText>
          </CalendarLegendContainer>
        </CalendarFiltersContainer>
        <CalendarAndResultsContainer>
          <Calendar
            year={year}
            setYear={setYear}
            month={month}
            setMonth={setMonth}
            day={day}
            setDay={setDay}
            monthFilter={monthFilter}
            setMonthFilter={setMonthFilter}
            yearFilter={yearFilter}
            setYearFilter={setYearFilter}
            scheduledDates={allAgendamentos}
          />
          <CustomText $size="h2">
            {`${
              daysOfTheWeek[new Date(year, month - 1, day).getDay()]
            }, ${day} de ${monthsName[month - 1]} de ${year}`}
          </CustomText>
          {loading && <Spinner />}
          {agendamentos.length > 0 ? (
            <ResultsContainer>
              {agendamentos.map((agendamento) => (
                <Card key={agendamento.idAgendamento}>
                  <CalendarResultContentContainer>
                    <div>
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
                            agendamento.tipoAgendamento
                              .charAt(0)
                              .toUpperCase() +
                            agendamento.tipoAgendamento.slice(1).toLowerCase()
                          })`}
                        </CustomText>
                      </CardInfoContainer>
                      <CardInfoContainer>
                        <CustomText $size="h3">Paciente:</CustomText>
                        <CustomText $size="h3" $weight={300}>
                          {agendamento.paciente.pessoa.nome}
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
                          setModalText(2);
                          setOpenModal(true);
                        }}
                      />
                    </div>
                  </CalendarResultContentContainer>
                </Card>
              ))}
            </ResultsContainer>
          ) : (
            !loading && <NoResults message={"Nenhum agendamento encontrado"} />
          )}
        </CalendarAndResultsContainer>
      </CalendarPageContainer>
    </>
  );
}
