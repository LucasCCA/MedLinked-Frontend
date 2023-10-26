"use client";

import {
  Breadcrumb,
  Button,
  OptionData,
  Select,
  Spacing,
} from "@medlinked/components";
import {
  associateMedicoSecretaria,
  getAllMedicos,
  getAllMedicosSecretaria,
} from "@medlinked/services";
import { MedicoResponse, SecretariaMedicoResponse } from "@medlinked/types";
import { cpfMask, formatCpf } from "@medlinked/utils";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { SingleFieldContainer } from "../../styles";

const breadcrumbItems = [
  {
    label: "Médico",
    href: "/admin/medicos",
  },
  {
    label: "Vincular",
    href: "",
  },
];

export default function Page() {
  const [loading, setLoading] = useState(true);
  const [alreadyAssociated, setAlreadyAssociated] = useState(false);
  const [currentMedico, setCurrentMedico] = useState({ label: "", value: "" });
  const [medicosSecretaria, setMedicosSecretaria] =
    useState<SecretariaMedicoResponse>({
      content: [],
      pageable: { pageNumber: 0, pageSize: 0 },
      totalPages: 0,
    });
  const [allMedicos, setAllMedicos] = useState<MedicoResponse>([]);

  function getMedicosSecretaria() {
    setLoading(true);

    getAllMedicosSecretaria(0, 100)
      .then((response) => setMedicosSecretaria(response.data))
      .catch(() =>
        toast.error(
          "Ocorreu um erro ao buscar médicos. Tente novamente mais tarde.",
        ),
      )
      .finally(() => setLoading(false));
  }

  function getMedicos() {
    setLoading(true);

    getAllMedicos()
      .then((response) => setAllMedicos(response.data))
      .catch(() =>
        toast.error(
          "Ocorreu um erro ao buscar médicos. Tente novamente mais tarde.",
        ),
      )
      .finally(() => setLoading(false));
  }

  function associateMedico() {
    setLoading(true);

    associateMedicoSecretaria(Number(currentMedico.value))
      .then(() => {
        setAlreadyAssociated(true);
        getMedicosSecretaria();
        toast.success("Médico vinculado com sucesso!");
      })
      .catch(() =>
        toast.error("Erro ao vincular médico. Tente novamente mais tarde."),
      )
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    getMedicosSecretaria();
    getMedicos();
  }, []);

  useEffect(() => {
    if (
      medicosSecretaria.content.find(
        (medicoSecretaria) =>
          medicoSecretaria.idMedico == Number(currentMedico.value),
      )
    ) {
      setAlreadyAssociated(true);
      toast.info("Médico já vinculado");
    } else setAlreadyAssociated(false);
  }, [currentMedico]);

  const medicosOptions: OptionData[] = [];

  for (let i = 0; i < allMedicos.length; i++) {
    medicosOptions.push({
      label: `${allMedicos[i].pessoa.nome} - CPF ${cpfMask(
        formatCpf(allMedicos[i].pessoa.cpf),
      )}`,
      value: allMedicos[i].idMedico.toString(),
    });
  }

  return (
    <>
      <Spacing>
        <Breadcrumb items={breadcrumbItems} />
      </Spacing>
      <Spacing>
        <SingleFieldContainer>
          <Select
            placeholder="Escolha o médico *"
            fullWidth
            options={medicosOptions}
            outsideSelected={currentMedico}
            setOutsideSelected={setCurrentMedico}
            disabled={loading}
          />
        </SingleFieldContainer>
      </Spacing>
      <Spacing>
        <SingleFieldContainer>
          <Button
            textAlign="center"
            fullWidth
            disabled={currentMedico.value == "" || alreadyAssociated || loading}
            onClick={() => associateMedico()}
          >
            Vincular médico
          </Button>
        </SingleFieldContainer>
      </Spacing>
    </>
  );
}
