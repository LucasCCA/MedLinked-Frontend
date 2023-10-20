"use client";

import { medlinked } from "@medlinked/api";
import {
  Breadcrumb,
  Button,
  Card,
  CustomText,
  Input,
  Select,
  Spacing,
  Tabs,
} from "@medlinked/components";
import {
  CreateMedico,
  EspecializacaoResponse,
  EstadoResponse,
  Pessoa,
} from "@medlinked/types";
import {
  cpfMask,
  crmMask,
  onlyNumbers,
  phoneNumberMask,
} from "@medlinked/utils";
import { Trash } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { CPFContainer, CardContentContainer, FieldsContainer } from "./styles";

const tabsItems = [
  {
    id: 1,
    label: "Informações",
  },
  {
    id: 2,
    label: "Convênios",
  },
];

const breadcrumbItems = [
  {
    label: "Médico",
    href: "/admin/medicos",
  },
  {
    label: "Cadastro",
    href: "",
  },
];

export default function Page() {
  const params = useParams();
  const [currentItem, setCurrentItem] = useState(1);
  const [disabledItems, setDisabledItems] = useState([2]);
  const [currentInfoStep, setCurrentInfoStep] = useState(1);
  const [filledCpf, setFilledCpf] = useState(false);
  const [crm, setCrm] = useState("");
  const [loading, setLoading] = useState(false);
  const [estados, setEstados] = useState<EstadoResponse>([]);
  const [especializacoes, setEspecializacoes] =
    useState<EspecializacaoResponse>([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<CreateMedico>();

  const cpfValue = watch("registerPessoa.cpf");
  const phoneNumberValue = watch("registerPessoa.celular");

  useEffect(() => {
    function getEstados() {
      setLoading(true);

      medlinked
        .get<EstadoResponse>("estado")
        .then((response) => setEstados(response.data))
        .catch(() =>
          toast.error(
            // eslint-disable-next-line max-len
            "Ocorreu um erro ao carregar os estados. Tente novamente mais tarde.",
          ),
        )
        .finally(() => setLoading(false));
    }

    function getEspecialidades() {
      setLoading(true);

      medlinked
        .get<EspecializacaoResponse>("especialidade")
        .then((response) => setEspecializacoes(response.data))
        .catch(() =>
          toast.error(
            // eslint-disable-next-line max-len
            "Ocorreu um erro ao carregar as especializações. Tente novamente mais tarde.",
          ),
        )
        .finally(() => setLoading(false));
    }

    getEstados();
    getEspecialidades();
  }, []);

  const estadosOptions = [];

  for (let i = 0; i < estados.length; i++) {
    estadosOptions.push({ label: estados[i].descricao, value: estados[i].uf });
  }

  const especializacoesOptions = [];

  for (let i = 0; i < especializacoes.length; i++) {
    especializacoesOptions.push({
      label: especializacoes[i].descricao,
      value: especializacoes[i].idEspecialidade,
    });
  }

  useEffect(() => {
    setValue("registerPessoa.cpf", cpfMask(cpfValue));
    setValue("registerPessoa.celular", phoneNumberMask(phoneNumberValue));
    setFilledCpf(watch("registerPessoa.cpf").length == 14);
  }, [cpfValue, phoneNumberValue, setValue, watch]);

  useEffect(() => {
    if (filledCpf) {
      setLoading(true);

      medlinked
        .post<Pessoa>("pessoa/cpf", {
          cpf: Number(onlyNumbers(watch("registerPessoa.cpf"))),
        })
        .then((response) => {
          toast.info("Pessoa já cadastrada no sistema");
          setValue("registerPessoa.nome", response.data.nome);
          setValue("registerPessoa.email", response.data.email);
          setValue("registerPessoa.celular", String(response.data.celular));
        })
        .finally(() => setLoading(false));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filledCpf]);

  const onSubmit: SubmitHandler<CreateMedico> = (data) => {
    console.log(data);
  };

  return (
    <>
      <Spacing>
        <Breadcrumb items={breadcrumbItems} />
      </Spacing>
      <Spacing>
        <Tabs
          items={tabsItems}
          currentItemId={currentItem}
          changeCurrentItemId={setCurrentItem}
          disabledItemsIds={disabledItems}
        />
      </Spacing>
      <form onSubmit={handleSubmit(onSubmit)}>
        {currentItem == 1 && currentInfoStep == 1 ? (
          <>
            <Spacing>
              <CustomText $size="h2">Dados Pessoais</CustomText>
            </Spacing>
            <Spacing>
              <CPFContainer>
                <Input
                  placeholder="Digite o CPF *"
                  fullWidth
                  maxLength={14}
                  register={{ ...register("registerPessoa.cpf") }}
                  disabled={loading}
                  hasError={Boolean(errors.registerPessoa?.cpf)}
                  errorMessage={errors.registerPessoa?.cpf?.message}
                />
              </CPFContainer>
              <FieldsContainer>
                <Input
                  placeholder="Digite o nome *"
                  fullWidth
                  maxLength={120}
                  register={{ ...register("registerPessoa.nome") }}
                  disabled={!filledCpf || loading}
                  hasError={Boolean(errors.registerPessoa?.nome)}
                  errorMessage={errors.registerPessoa?.nome?.message}
                />
                <Input
                  placeholder="Digite o email *"
                  fullWidth
                  maxLength={120}
                  register={{ ...register("registerPessoa.email") }}
                  disabled={!filledCpf || loading}
                  hasError={Boolean(errors.registerPessoa?.email)}
                  errorMessage={errors.registerPessoa?.email?.message}
                />
                <Input
                  placeholder="Digite o celular"
                  fullWidth
                  maxLength={17}
                  register={{ ...register("registerPessoa.celular") }}
                  disabled={!filledCpf || loading}
                  hasError={Boolean(errors.registerPessoa?.celular)}
                  errorMessage={errors.registerPessoa?.celular?.message}
                />
              </FieldsContainer>
            </Spacing>
            <Spacing>
              <CustomText $weight={500}>* Campo Obrigatório</CustomText>
            </Spacing>
            <Spacing>
              <FieldsContainer>
                <Button
                  textAlign="center"
                  fullWidth
                  onClick={() => setCurrentInfoStep(currentInfoStep + 1)}
                >
                  Próximo
                </Button>
              </FieldsContainer>
            </Spacing>
          </>
        ) : (
          currentInfoStep == 2 &&
          currentItem == 1 && (
            <>
              <Spacing>
                <CustomText $size="h2">Dados do Médico</CustomText>
              </Spacing>
              <Spacing>
                <FieldsContainer>
                  <Select
                    placeholder="Escolha o estado do CRM *"
                    fullWidth
                    options={[]}
                  />
                  <Input
                    placeholder="Digite o número do CRM *"
                    fullWidth
                    value={crm}
                    onChange={(e) => setCrm(crmMask(e.currentTarget.value))}
                  />
                </FieldsContainer>
              </Spacing>
              <Spacing>
                <CustomText $size="h2">Especializações</CustomText>
              </Spacing>
              <Spacing>
                <FieldsContainer>
                  <Select
                    placeholder="Escolha uma especialização *"
                    fullWidth
                    options={[]}
                  />
                </FieldsContainer>
              </Spacing>
              <Spacing>
                <CustomText $weight={500}>* Campo Obrigatório</CustomText>
              </Spacing>
              <Spacing>
                <FieldsContainer>
                  <Button textAlign="center" fullWidth>
                    Vincular especialização
                  </Button>
                </FieldsContainer>
              </Spacing>
              <Spacing>
                <CustomText $size="h2">Especializações Vinculadas</CustomText>
              </Spacing>
              <Spacing>
                <Card>
                  <CardContentContainer>
                    <CustomText $size="h2">Especialização X</CustomText>
                    <Trash />
                  </CardContentContainer>
                </Card>
              </Spacing>
              <Spacing>
                <FieldsContainer>
                  <Button
                    textAlign="center"
                    fullWidth
                    onClick={() => setCurrentInfoStep(currentInfoStep - 1)}
                  >
                    Voltar
                  </Button>
                  <Button
                    textAlign="center"
                    fullWidth
                    onClick={() => setDisabledItems([])}
                  >
                    Cadastrar
                  </Button>
                </FieldsContainer>
              </Spacing>
            </>
          )
        )}
      </form>
      {currentItem == 2 && (
        <>
          <Spacing>
            <CustomText $size="h2">Convênios</CustomText>
          </Spacing>
          <Spacing>
            <FieldsContainer>
              <Select
                placeholder="Escolha um convênio *"
                fullWidth
                options={[]}
              />
            </FieldsContainer>
          </Spacing>
          <Spacing>
            <CustomText $weight={500}>* Campo Obrigatório</CustomText>
          </Spacing>
          <Spacing>
            <FieldsContainer>
              <Button textAlign="center" fullWidth>
                Vincular convênio
              </Button>
            </FieldsContainer>
          </Spacing>
          <Spacing>
            <CustomText $size="h2">Convênios Vinculados</CustomText>
          </Spacing>
          <Spacing>
            <Card>
              <CardContentContainer>
                <CustomText $size="h2">Convênio X</CustomText>
                <Trash />
              </CardContentContainer>
            </Card>
          </Spacing>
        </>
      )}
    </>
  );
}
