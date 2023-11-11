"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import {
  Breadcrumb,
  Button,
  CustomText,
  Input,
  OptionData,
  Select,
  Spacing,
} from "@medlinked/components";
import { registerAgendamentoSchema } from "@medlinked/schemas";
import {
  createAgendamento,
  getAgendamento,
  getAllMedicosSecretaria,
  getAllPacientes,
  getAllPlanosSaudePacienteMedico,
  getAllTiposAgendamento,
  updateAgendamento,
} from "@medlinked/services";
import {
  CreateAgendamento,
  PacienteResponse,
  PlanosSaudeResponse,
  SecretariaMedicoResponse,
} from "@medlinked/types";
import { cpfMask, dateMask, formatCpf, timeMask } from "@medlinked/utils";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { FieldsContainer, SingleFieldContainer } from "../../styles";

const breadcrumbItems = [
  {
    label: "Agenda",
    href: "/admin/agenda",
  },
  {
    label: "Cadastro",
    href: "",
  },
];

export default function Page() {
  const params = useParams();
  const router = useRouter();
  const [idAgendamento, setidAgendamento] = useState(
    Number(params.idAgendamento),
  );
  const [loading, setLoading] = useState(true);
  const [pacientes, setPacientes] = useState<PacienteResponse>([]);
  const [medicos, setMedicos] = useState<SecretariaMedicoResponse>([]);
  const [currentMedico, setCurrentMedico] = useState({
    label: "",
    value: "",
  });
  const [currentPaciente, setCurrentPaciente] = useState({
    label: "",
    value: "",
  });
  const [conveniosPacienteMedico, setConveniosPacienteMedico] =
    useState<PlanosSaudeResponse>([]);
  const [currentConvenio, setCurrentConvenio] = useState({
    label: "",
    value: "",
  });
  const [tiposAgendamento, setTiposAgendamento] = useState<string[]>([]);
  const [currentTipoAgendamento, setCurrentTipoAgendamento] = useState({
    label: "",
    value: "",
  });
  const [isInformationReady, setIsInformationReady] = useState(false);

  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
    watch,
  } = useForm<CreateAgendamento>({
    resolver: yupResolver(registerAgendamentoSchema),
  });

  useEffect(() => {
    function getExistingAgendamento() {
      setLoading(true);

      getAgendamento(idAgendamento)
        .then((response) => {
          setValue(
            "data",
            `${response.data.dataHoraInicioAgendamento.slice(
              8,
              10,
            )}${response.data.dataHoraInicioAgendamento.slice(
              5,
              7,
            )}${response.data.dataHoraInicioAgendamento.slice(0, 4)}`,
          );
          setValue("descricao", response.data.descricao);
          setValue(
            "horaFim",
            `${response.data.dataHoraFimAgendamento.slice(
              11,
              13,
            )}${response.data.dataHoraFimAgendamento.slice(14, 16)}`,
          );
          setValue(
            "horaInicio",
            `${response.data.dataHoraInicioAgendamento.slice(
              11,
              13,
            )}${response.data.dataHoraInicioAgendamento.slice(14, 16)}`,
          );
          setValue("idMedico", response.data.medico.idMedico);
          setCurrentMedico({
            label: `${response.data.medico.pessoa.nome} - CPF ${cpfMask(
              formatCpf(response.data.medico.pessoa.cpf),
            )}`,
            value: response.data.medico.idMedico.toString(),
          });
          if (response.data.paciente != null) {
            setValue("idPaciente", response.data.paciente.idPaciente);
            setCurrentPaciente({
              label: `${response.data.paciente.pessoa.nome} - CPF ${cpfMask(
                formatCpf(response.data.paciente.pessoa.cpf),
              )}`,
              value: response.data.paciente.idPaciente.toString(),
            });
          }
          if (response.data.planoSaude != null) {
            setValue("idPlanoSaude", response.data.planoSaude.idPlanoSaude);
            setCurrentConvenio({
              label: response.data.planoSaude.descricao,
              value: response.data.planoSaude.idPlanoSaude.toString(),
            });
          }
          setValue(
            "tipoAgendamento",
            `${response.data.tipoAgendamento
              .charAt(0)
              .toUpperCase()}${response.data.tipoAgendamento
              .slice(1)
              .toLowerCase()}`,
          );
          setCurrentTipoAgendamento({
            label: `${response.data.tipoAgendamento
              .charAt(0)
              .toUpperCase()}${response.data.tipoAgendamento
              .slice(1)
              .toLowerCase()}`,
            value: response.data.tipoAgendamento,
          });
        })
        .catch(() => {
          toast.error(
            // eslint-disable-next-line max-len
            "Ocorreu um erro ao buscar os dados do agendamento. Tente novamente mais tarde.",
          );
          router.push("/admin/agenda");
        })
        .finally(() => {
          setLoading(false);
          setIsInformationReady(true);
        });
    }

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

    function getTiposAgendamento() {
      setLoading(true);

      getAllTiposAgendamento()
        .then((response) => setTiposAgendamento(response.data))
        .catch(() =>
          toast.error(
            // eslint-disable-next-line max-len
            "Ocorreu um erro ao buscar tipos de agendamento. Tente novamente mais tarde.",
          ),
        )
        .finally(() => setLoading(false));
    }

    getTiposAgendamento();
    getPacientes();
    getMedicos();
    if (idAgendamento != 0) getExistingAgendamento();
    else setIsInformationReady(true);
  }, []);

  useEffect(() => {
    function getConvenios() {
      setLoading(true);

      getAllPlanosSaudePacienteMedico(
        Number(currentPaciente.value),
        Number(currentMedico.value),
      )
        .then((response) => setConveniosPacienteMedico(response.data))
        .catch(() =>
          toast.error(
            // eslint-disable-next-line max-len
            "Ocorreu um erro ao buscar convênios do paciente. Tente novamente mais tarde.",
          ),
        )
        .finally(() => setLoading(false));
    }

    if (currentPaciente.value != "" && currentMedico.value != "")
      getConvenios();
  }, [currentPaciente, currentMedico]);

  const pacientesOptions: OptionData[] = [];

  for (let i = 0; i < pacientes.length; i++) {
    pacientesOptions.push({
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

  const conveniosOptions: OptionData[] = [
    { label: "Sem convênio", value: "0" },
  ];

  for (let i = 0; i < conveniosPacienteMedico.length; i++) {
    conveniosOptions.push({
      label: conveniosPacienteMedico[i].descricao,
      value: conveniosPacienteMedico[i].idPlanoSaude.toString(),
    });
  }

  const tiposAgendamentoOptions: OptionData[] = [];

  for (let i = 0; i < tiposAgendamento.length; i++) {
    if (tiposAgendamento[i] == "AUTOMATICO") continue;

    tiposAgendamentoOptions.push({
      label:
        tiposAgendamento[i].charAt(0).toUpperCase() +
        tiposAgendamento[i].slice(1).toLowerCase(),
      value: tiposAgendamento[i],
    });
  }

  const dateValue = watch("data");
  const startTimeValue = watch("horaInicio");
  const endTimeValue = watch("horaFim");

  useEffect(() => {
    setValue("idMedico", Number(currentMedico?.value));
    setValue("idPaciente", Number(currentPaciente?.value));
    setValue("idPlanoSaude", Number(currentConvenio?.value));
    setValue("tipoAgendamento", currentTipoAgendamento?.value);
    setValue("data", dateMask(dateValue));
    setValue("horaInicio", timeMask(startTimeValue));
    setValue("horaFim", timeMask(endTimeValue));
  }, [
    currentMedico,
    currentPaciente,
    currentConvenio,
    currentTipoAgendamento,
    dateValue,
    startTimeValue,
    endTimeValue,
  ]);

  const onSubmit: SubmitHandler<CreateAgendamento> = (data) => {
    setLoading(true);

    if (idAgendamento == 0)
      createAgendamento(data)
        .then((response) => {
          toast.success("Agendamento cadastrado com sucesso!");
          setidAgendamento(response.data.idAgendamento);
        })
        .catch((error) => toast.error(error.response.data))
        .finally(() => setLoading(false));
    else
      updateAgendamento(data, idAgendamento)
        .then((response) => {
          toast.success("Agendamento atualizado com sucesso!");
          setidAgendamento(response.data.idAgendamento);
        })
        .catch((error) => toast.error(error.response.data))
        .finally(() => setLoading(false));
  };

  return (
    <>
      <Spacing>
        <Breadcrumb items={breadcrumbItems} />
      </Spacing>
      <Spacing>
        <CustomText $size="h2">Dados do Agendamento</CustomText>
      </Spacing>
      {isInformationReady && (
        <form onSubmit={handleSubmit(onSubmit)}>
          <Spacing>
            <FieldsContainer>
              <Select
                options={medicosOptions}
                fullWidth
                placeholder="Selecione um médico *"
                disabled={loading}
                outsideSelected={currentMedico}
                setOutsideSelected={setCurrentMedico}
                register={{ ...register("idMedico") }}
                hasError={Boolean(errors.idMedico)}
                errorMessage={errors.idMedico?.message}
              />
              <Select
                options={pacientesOptions}
                fullWidth
                placeholder="Selecione um paciente *"
                disabled={loading}
                outsideSelected={currentPaciente}
                setOutsideSelected={setCurrentPaciente}
                register={{ ...register("idPaciente") }}
                hasError={Boolean(errors.idPaciente)}
                errorMessage={errors.idPaciente?.message}
              />
              <Input
                placeholder="Data *"
                fullWidth
                autoComplete="off"
                maxLength={10}
                disabled={loading}
                register={{ ...register("data") }}
                hasError={Boolean(errors.data)}
                errorMessage={errors.data?.message}
              />
              <Input
                placeholder="Horário Início *"
                fullWidth
                autoComplete="off"
                maxLength={5}
                disabled={loading}
                register={{ ...register("horaInicio") }}
                hasError={Boolean(errors.horaInicio)}
                errorMessage={errors.horaInicio?.message}
              />
              <Input
                placeholder="Horário Fim *"
                fullWidth
                autoComplete="off"
                maxLength={5}
                disabled={loading}
                register={{ ...register("horaFim") }}
                hasError={Boolean(errors.horaFim)}
                errorMessage={errors.horaFim?.message}
              />
              <Select
                options={tiposAgendamentoOptions}
                fullWidth
                placeholder="Selecione um tipo de agendamento *"
                disabled={loading}
                outsideSelected={currentTipoAgendamento}
                setOutsideSelected={setCurrentTipoAgendamento}
                register={{ ...register("tipoAgendamento") }}
                hasError={Boolean(errors.tipoAgendamento)}
                errorMessage={errors.tipoAgendamento?.message}
              />
              <Select
                options={conveniosOptions}
                fullWidth
                placeholder="Selecione um convênio"
                disabled={
                  loading ||
                  currentPaciente.value == "" ||
                  currentMedico.value == ""
                }
                outsideSelected={currentConvenio}
                setOutsideSelected={setCurrentConvenio}
                register={{ ...register("idPlanoSaude") }}
                hasError={Boolean(errors.idPlanoSaude)}
                errorMessage={errors.idPlanoSaude?.message}
              />
              <Input
                placeholder="Descrição"
                fullWidth
                autoComplete="off"
                maxLength={200}
                disabled={loading}
                register={{ ...register("descricao") }}
                hasError={Boolean(errors.descricao)}
                errorMessage={errors.descricao?.message}
              />
            </FieldsContainer>
          </Spacing>
          <Spacing>
            <CustomText $weight={500}>* Campo Obrigatório</CustomText>
          </Spacing>
          <Spacing>
            <SingleFieldContainer>
              <Button
                fullWidth
                textAlign="center"
                type="submit"
                disabled={loading}
              >
                {idAgendamento == 0 ? "Cadastrar" : "Atualizar"}
              </Button>
            </SingleFieldContainer>
          </Spacing>
        </form>
      )}
    </>
  );
}
