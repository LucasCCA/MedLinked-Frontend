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
  getAllMedicosSecretaria,
  getAllPacientes,
  getAllPlanosSaudePaciente,
  getAllTiposAgendamento,
} from "@medlinked/services";
import {
  CreateAgendamento,
  PacientePlanoSaudeResponse,
  PacienteResponse,
  SecretariaMedicoResponse,
} from "@medlinked/types";
import { cpfMask, dateMask, formatCpf, timeMask } from "@medlinked/utils";
import { useParams } from "next/navigation";
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
  const [conveniosPaciente, setConveniosPaciente] =
    useState<PacientePlanoSaudeResponse>([]);
  const [currentConvenio, setCurrentConvenio] = useState({
    label: "",
    value: "",
  });
  const [tiposAgendamento, setTiposAgendamento] = useState<string[]>([]);
  const [currentTipoAgendamento, setCurrentTipoAgendamento] = useState({
    label: "",
    value: "",
  });

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
  }, []);

  useEffect(() => {
    function getConvenios() {
      setLoading(true);

      getAllPlanosSaudePaciente(Number(currentPaciente.value))
        .then((response) => setConveniosPaciente(response.data))
        .catch(() =>
          toast.error(
            // eslint-disable-next-line max-len
            "Ocorreu um erro ao buscar convênios do paciente. Tente novamente mais tarde.",
          ),
        )
        .finally(() => setLoading(false));
    }

    if (currentPaciente.value != "") getConvenios();
  }, [currentPaciente]);

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

  const conveniosOptions: OptionData[] = [];

  for (let i = 0; i < conveniosPaciente.length; i++) {
    conveniosOptions.push({
      label: conveniosPaciente[i].idPlanoSaudePaciente.planoSaude.descricao,
      value:
        conveniosPaciente[
          i
        ].idPlanoSaudePaciente.planoSaude.idPlanoSaude.toString(),
    });
  }

  const tiposAgendamentoOptions: OptionData[] = [];

  for (let i = 0; i < tiposAgendamento.length; i++) {
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
    console.log(data);
  };

  return (
    <>
      <Spacing>
        <Breadcrumb items={breadcrumbItems} />
      </Spacing>
      <Spacing>
        <CustomText $size="h2">Dados do Agendamento</CustomText>
      </Spacing>
      <Spacing>
        <form onSubmit={handleSubmit(onSubmit)}>
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
              disabled={loading || currentPaciente.value == ""}
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
        </form>
      </Spacing>
      <Spacing>
        <CustomText $weight={500}>* Campo Obrigatório</CustomText>
      </Spacing>
      <Spacing>
        <SingleFieldContainer>
          <Button fullWidth textAlign="center" type="submit" disabled={loading}>
            {idAgendamento == 0 ? "Cadastrar" : "Atualizar"}
          </Button>
        </SingleFieldContainer>
      </Spacing>
    </>
  );
}
