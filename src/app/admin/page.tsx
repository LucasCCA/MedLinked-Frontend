"use client";

import {
  Button,
  Calendar,
  Card,
  CustomText,
  Input,
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
  StyledForm,
} from "./styles";

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
  const [currentMedico, setCurrentMedico] = useState({ label: "", value: "" });
  const [currentPaciente, setCurrentPaciente] = useState({
    label: "",
    value: "",
  });
  const [agendamentos, setAgendamentos] = useState<AgendamentoResponse>([]);
  const [allAgendamentos, setAllAgendamentos] = useState<AgendamentoResponse>(
    [],
  );

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

  useEffect(() => {
    function getAgendamentos() {
      setLoading(true);

      getAllAgendamentos(
        Number(currentMedico.value),
        Number(currentPaciente.value),
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

    getAgendamentos();
  }, [currentMedico, currentPaciente]);

  useEffect(() => {
    function getFilteredAgendamentos() {
      setLoading(true);

      getAllAgendamentos(
        Number(currentMedico.value),
        Number(currentPaciente.value),
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

    getFilteredAgendamentos();
  }, [year, month, day, currentMedico, currentPaciente]);

  const pacientesOptions: OptionData[] = [];

  for (let i = 0; i < pacientes.length; i++) {
    pacientesOptions.push({
      label: `${pacientes[i].pessoa.nome} - CPF ${cpfMask(
        formatCpf(pacientes[i].pessoa.cpf),
      )}`,
      value: pacientes[i].idPaciente.toString(),
    });
  }

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

  const medicosOptions: OptionData[] = [];

  for (let i = 0; i < medicos.length; i++) {
    medicosOptions.push({
      label: `${medicos[i].nome} - CPF ${cpfMask(formatCpf(medicos[i].cpf))}`,
      value: medicos[i].idMedico.toString(),
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

  return (
    <>
      <Modal
        title={
          modalText == 1
            ? "Novo agendamento"
            : modalText == 2
            ? "Visualizar agendamento"
            : "Confirmação"
        }
        open={openModal}
        setOpen={setOpenModal}
      >
        {(modalText == 1 || modalText == 2) && (
          <StyledForm>
            <Select
              options={medicosOptions}
              fullWidth
              placeholder="Selecione um médico *"
              disabled={loading}
            />
            <Select
              options={pacientesOptions}
              fullWidth
              placeholder="Selecione um paciente *"
              disabled={loading}
            />
            <Input
              placeholder="Data *"
              fullWidth
              autoComplete="off"
              disabled={loading}
            />
            <ModalFieldsContainer>
              <Input
                placeholder="Horário Início *"
                fullWidth
                autoComplete="off"
                disabled={loading}
              />
              <Input
                placeholder="Horário Fim *"
                fullWidth
                autoComplete="off"
                disabled={loading}
              />
            </ModalFieldsContainer>
            <Select
              options={[]}
              fullWidth
              placeholder="Selecione um tipo de consulta *"
              disabled={loading}
            />
            <Select
              options={[]}
              fullWidth
              placeholder="Selecione um convênio *"
              disabled={loading}
            />
            <Input
              placeholder="Descrição *"
              fullWidth
              maxLength={130}
              autoComplete="off"
              disabled={loading}
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
        {modalText == 3 && (
          <>
            <CustomText $align="center">
              Você realmente deseja deletar esse agendamento?
            </CustomText>
            <ModalFieldsContainer>
              <Button
                fullWidth
                textAlign="center"
                // onClick={() => handleDelete()}
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
              setOpenModal(true);
              setModalText(1);
            }}
          >
            Agendamento
          </Button>
          <Select
            options={medicosFilterOptions}
            fullWidth
            placeholder="Pesquise por médico"
            disabled={loading}
            outsideSelected={currentMedico}
            setOutsideSelected={setCurrentMedico}
          />
          <Select
            options={pacientesFilterOptions}
            fullWidth
            placeholder="Pesquise por paciente"
            disabled={loading}
            outsideSelected={currentPaciente}
            setOutsideSelected={setCurrentPaciente}
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
                      <Pen
                        onClick={() => {
                          setOpenModal(true);
                          setModalText(2);
                        }}
                      />
                      <Trash
                        onClick={() => {
                          setOpenModal(true);
                          setModalText(3);
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
