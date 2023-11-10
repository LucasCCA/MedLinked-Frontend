"use client";

import {
  Breadcrumb,
  Button,
  Card,
  Checkbox,
  CustomText,
  Input,
  OptionData,
  Select,
  Spacing,
} from "@medlinked/components";
import { getAllMedicosSecretaria } from "@medlinked/services";
import { CreateAgendamento, SecretariaMedicoResponse } from "@medlinked/types";
import { cpfMask, dateMask, formatCpf, timeMask } from "@medlinked/utils";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import {
  CalendarResultContentContainer,
  FieldsContainer,
  SingleFieldContainer,
} from "../../styles";
import { FailedSchedulesContainer } from "../styles";

const breadcrumbItems = [
  {
    label: "Agenda",
    href: "/admin/agenda",
  },
  {
    label: "Gerar",
    href: "",
  },
];

export default function Page() {
  const [loading, setLoading] = useState(true);
  const [medicos, setMedicos] = useState<SecretariaMedicoResponse>([]);
  const [currentMedico, setCurrentMedico] = useState({
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
    // resolver: yupResolver(registerAgendamentoSchema),
  });

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

  const medicosOptions: OptionData[] = [];

  for (let i = 0; i < medicos.length; i++) {
    medicosOptions.push({
      label: `${medicos[i].nome} - CPF ${cpfMask(formatCpf(medicos[i].cpf))}`,
      value: medicos[i].idMedico.toString(),
    });
  }

  const dateValue = watch("data");
  const startTimeValue = watch("horaInicio");
  const endTimeValue = watch("horaFim");

  useEffect(() => {
    setValue("idMedico", Number(currentMedico?.value));
    setValue("data", dateMask(dateValue));
    setValue("horaInicio", timeMask(startTimeValue));
    setValue("horaFim", timeMask(endTimeValue));
  }, [currentMedico, dateValue, startTimeValue, endTimeValue]);

  const onSubmit: SubmitHandler<CreateAgendamento> = (data) => {
    // setLoading(true);
    console.log(data);

    // createAgendamento(data)
    //   .then((response) => {
    //     toast.success("Agendamento cadastrado com sucesso!");
    //     setidAgendamento(response.data.idAgendamento);
    //   })
    //   .catch((error) => toast.error(error.response.data))
    //   .finally(() => setLoading(false));
  };

  return (
    <>
      <Spacing>
        <Breadcrumb items={breadcrumbItems} />
      </Spacing>
      <Spacing>
        <CustomText $size="h2">Dados dos Agendamentos Automáticos</CustomText>
      </Spacing>
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
            <Input
              placeholder="Data ínicio *"
              fullWidth
              autoComplete="off"
              maxLength={10}
              disabled={loading}
              register={{ ...register("data") }}
              hasError={Boolean(errors.data)}
              errorMessage={errors.data?.message}
            />
            <Input
              placeholder="Data fim *"
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
            <Input
              placeholder="Tempo de consulta em minutos *"
              fullWidth
              autoComplete="off"
              maxLength={200}
              disabled={loading}
              register={{ ...register("descricao") }}
              hasError={Boolean(errors.descricao)}
              errorMessage={errors.descricao?.message}
            />
            <Checkbox label="Apenas dias úteis" />
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
              Gerar
            </Button>
          </SingleFieldContainer>
        </Spacing>
      </form>
      <Spacing>
        <CustomText $size="h2">
          Os agendamentos abaixo não foram criados por conta de conflitos de
          horário com agendamentos já existentes para esse médico
        </CustomText>
      </Spacing>
      <Spacing>
        <FailedSchedulesContainer>
          <Card>
            <CalendarResultContentContainer>
              <div>
                <CustomText $size="h2">01/01/2023</CustomText>
                <CustomText $size="h2" $weight={300}>
                  08:00 - 09:00
                </CustomText>
              </div>
            </CalendarResultContentContainer>
          </Card>
          <Card>
            <CalendarResultContentContainer>
              <div>
                <CustomText $size="h2">01/01/2023</CustomText>
                <CustomText $size="h2" $weight={300}>
                  08:00 - 09:00
                </CustomText>
              </div>
            </CalendarResultContentContainer>
          </Card>
          <Card>
            <CalendarResultContentContainer>
              <div>
                <CustomText $size="h2">01/01/2023</CustomText>
                <CustomText $size="h2" $weight={300}>
                  08:00 - 09:00
                </CustomText>
              </div>
            </CalendarResultContentContainer>
          </Card>
          <Card>
            <CalendarResultContentContainer>
              <div>
                <CustomText $size="h2">01/01/2023</CustomText>
                <CustomText $size="h2" $weight={300}>
                  08:00 - 09:00
                </CustomText>
              </div>
            </CalendarResultContentContainer>
          </Card>
        </FailedSchedulesContainer>
      </Spacing>
    </>
  );
}
