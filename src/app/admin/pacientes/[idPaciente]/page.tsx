"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import {
  Breadcrumb,
  Button,
  Card,
  CustomText,
  Input,
  OptionData,
  Select,
  Spacing,
  Spinner,
  Tabs,
} from "@medlinked/components";
import { registerPacienteSchema } from "@medlinked/schemas";
import {
  associatePlanoSaudePaciente,
  createPaciente,
  getAllEstados,
  getAllPlanosSaude,
  getAllPlanosSaudePaciente,
  getAllTiposPlanoSaude,
  getPaciente,
  getPessoaByCpf,
  removePlanoSaudePaciente,
  updatePaciente,
} from "@medlinked/services";
import {
  CepResponse,
  CreatePaciente,
  EstadoResponse,
  PlanoSaudePaciente,
  PlanosSaudeResponse,
  TipoPlanoSaudeResponse,
} from "@medlinked/types";
import {
  cepMask,
  cpfMask,
  formatCpf,
  onlyNumbers,
  phoneNumberMask,
} from "@medlinked/utils";
import axios from "axios";
import { Trash } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import {
  AddressFieldsContainer,
  CardContentContainer,
  CardInfoContainer,
  CepContainer,
  FieldsContainer,
  HealthInsuranceInfoContainer,
  SingleFieldContainer,
} from "../../styles";

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
    label: "Paciente",
    href: "/admin/pacientes",
  },
  {
    label: "Cadastro",
    href: "",
  },
];

export default function Page() {
  const params = useParams();
  const router = useRouter();
  const [idPaciente, setIdPaciente] = useState(Number(params.idPaciente));
  const [currentItem, setCurrentItem] = useState(1);
  const [disabledItems, setDisabledItems] = useState(
    idPaciente == 0 ? [2] : [],
  );
  const [currentInfoStep, setCurrentInfoStep] = useState(1);
  const [filledCpf, setFilledCpf] = useState(false);
  const [personAlreadyRegistered, setPersonAlreadyRegistered] = useState(false);
  const [filledCep, setFilledCep] = useState(false);
  const [showAddressData, setShowAddressData] = useState(false);
  const [loading, setLoading] = useState(true);
  const [estados, setEstados] = useState<EstadoResponse>([]);
  const [currentUf, setCurrentUf] = useState({
    label: "",
    value: "",
  });
  const [convenios, setConvenios] = useState<PlanosSaudeResponse>([]);
  const [associatedConvenios, setAssociatedConvenios] = useState<
    PlanoSaudePaciente[]
  >([]);
  const [currentConvenio, setCurrentConvenio] = useState({
    label: "",
    value: "",
  });
  const [healthInsuranceNumber, setHealthInsuranceNumber] = useState("");
  const [tiposPlanoSaude, setTiposPlanoSaude] =
    useState<TipoPlanoSaudeResponse>([]);
  const [currentTipoConvenio, setCurrentTipoConvenio] = useState({
    label: "",
    value: "",
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    trigger,
    resetField,
  } = useForm<CreatePaciente>({
    resolver: yupResolver(registerPacienteSchema),
  });

  const cpfValue = watch("registerPessoa.cpf");
  const phoneNumberValue = watch("registerPessoa.celular");
  const cepValue = watch("createEndereco.cep");
  const houseNumberValue = watch("createEndereco.numero");

  function getPlanosSaudePaciente() {
    getAllPlanosSaudePaciente(idPaciente)
      .then((response) =>
        setAssociatedConvenios(response.data.planosSaudePaciente),
      )
      .catch(() =>
        toast.error(
          // eslint-disable-next-line max-len
          "Ocorreu um erro ao buscar os convênios do paciente. Tente novamente mais tarde.",
        ),
      );
  }

  useEffect(() => {
    function getExistingPaciente() {
      setLoading(true);

      getPaciente(idPaciente)
        .then((response) => {
          setValue(
            "registerPessoa.cpf",
            cpfMask(formatCpf(response.data.paciente.pessoa.cpf)),
          );
          setValue(
            "registerPessoa.celular",
            phoneNumberMask(response.data.paciente.pessoa.celular.toString()),
          );
          setValue("registerPessoa.email", response.data.paciente.pessoa.email);
          setValue("registerPessoa.nome", response.data.paciente.pessoa.nome);
          setValue("createEndereco.bairro", response.data.endereco.bairro);
          setValue(
            "createEndereco.cep",
            cepMask(response.data.endereco.cep.toString()),
          );
          setValue("createEndereco.cidade", response.data.endereco.cidade);
          setValue("createEndereco.ufEstado", response.data.endereco.estado.uf);
          setCurrentUf({
            label: response.data.endereco.estado.descricao,
            value: response.data.endereco.estado.uf,
          });
          setValue(
            "createEndereco.complemento",
            response.data.endereco.complemento,
          );
          setValue(
            "createEndereco.logradouro",
            response.data.endereco.logradouro,
          );
          setValue(
            "createEndereco.numero",
            response.data.endereco.numero.toString(),
          );
        })
        .catch(() => {
          toast.error(
            // eslint-disable-next-line max-len
            "Ocorreu um erro ao buscar os dados do paciente. Tente novamente mais tarde.",
          );
          router.push("/admin/pacientes");
        })
        .finally(() => setLoading(false));
    }

    function getConvenios() {
      setLoading(true);

      getAllPlanosSaude()
        .then((response) => setConvenios(response.data))
        .catch(() =>
          toast.error(
            // eslint-disable-next-line max-len
            "Ocorreu um erro ao carregar os convênios. Tente novamente mais tarde.",
          ),
        )
        .finally(() => setLoading(false));
    }

    function getTiposConvenio() {
      setLoading(true);

      getAllTiposPlanoSaude()
        .then((response) => setTiposPlanoSaude(response.data))
        .catch(() =>
          toast.error(
            // eslint-disable-next-line max-len
            "Ocorreu um erro ao carregar os tipos de convênio. Tente novamente mais tarde.",
          ),
        )
        .finally(() => setLoading(false));
    }

    function getEstados() {
      setLoading(true);

      getAllEstados()
        .then((response) => setEstados(response.data))
        .catch(() =>
          toast.error(
            // eslint-disable-next-line max-len
            "Ocorreu um erro ao carregar os estados. Tente novamente mais tarde.",
          ),
        )
        .finally(() => setLoading(false));
    }

    getConvenios();
    getTiposConvenio();
    getEstados();
    if (idPaciente != 0) {
      getExistingPaciente();
      getPlanosSaudePaciente();
    }
  }, []);

  const estadosOptions: OptionData[] = [];

  for (let i = 0; i < estados.length; i++) {
    estadosOptions.push({ label: estados[i].descricao, value: estados[i].uf });
  }

  const conveniosOptions: OptionData[] = [];

  for (let i = 0; i < convenios.length; i++) {
    conveniosOptions.push({
      label: convenios[i].descricao,
      value: convenios[i].idPlanoSaude.toString(),
    });
  }

  const tiposConvenioOptions: OptionData[] = [];

  for (let i = 0; i < tiposPlanoSaude.length; i++) {
    tiposConvenioOptions.push({
      label: tiposPlanoSaude[i].descricao,
      value: tiposPlanoSaude[i].idTipoPlanoSaude.toString(),
    });
  }

  useEffect(() => {
    setValue("registerPessoa.cpf", cpfMask(cpfValue));
    setValue("registerPessoa.celular", phoneNumberMask(phoneNumberValue));
    setValue("createEndereco.cep", cepMask(cepValue));
    setValue("createEndereco.numero", onlyNumbers(houseNumberValue));
    setValue("createEndereco.ufEstado", currentUf?.value);
    setFilledCpf(
      idPaciente == 0 ? watch("registerPessoa.cpf").length == 14 : true,
    );
    setFilledCep(watch("createEndereco.cep").length == 11);
  }, [cpfValue, phoneNumberValue, cepValue, currentUf, houseNumberValue]);

  useEffect(() => {
    if (filledCpf) {
      if (idPaciente == 0) {
        setPersonAlreadyRegistered(false);
        resetField("registerPessoa.nome");
        resetField("registerPessoa.email");
        resetField("registerPessoa.celular");

        setLoading(true);

        getPessoaByCpf(Number(onlyNumbers(cpfValue)))
          .then((response) => {
            if (response.data.idPessoa) {
              toast.info("Pessoa já cadastrada no sistema");
              setPersonAlreadyRegistered(true);
              setValue("registerPessoa.nome", response.data.nome);
              setValue("registerPessoa.email", response.data.email);
              setValue("registerPessoa.celular", String(response.data.celular));
            }
          })
          .finally(() => setLoading(false));
      }
    }
  }, [filledCpf, cpfValue]);

  useEffect(() => {
    setShowAddressData(false);

    if (watch("createEndereco.cep").length == 11) {
      resetField("createEndereco.ufEstado");
      resetField("createEndereco.cidade");
      resetField("createEndereco.logradouro");
      resetField("createEndereco.bairro");
      setCurrentUf({ label: "", value: "" });

      setLoading(true);

      axios
        .get<CepResponse>(
          `https://viacep.com.br/ws/${onlyNumbers(cepValue)}/json`,
        )
        .then((response) => {
          setValue("createEndereco.ufEstado", response.data.uf);
          setCurrentUf({
            label:
              estadosOptions.find((estado) => estado.value == response.data.uf)
                ?.label || "",
            value: response.data.uf,
          });
          setValue("createEndereco.cidade", response.data.localidade);
          setValue("createEndereco.logradouro", response.data.logradouro);
          setValue("createEndereco.bairro", response.data.bairro);
        })
        .finally(() => {
          setLoading(false);
          setShowAddressData(true);
        });
    }
  }, [filledCep, cepValue]);

  const onSubmit: SubmitHandler<CreatePaciente> = (data) => {
    setLoading(true);

    if (idPaciente == 0) {
      createPaciente(data)
        .then((response) => {
          toast.success("Paciente cadastrado com sucesso!");
          setIdPaciente(response.data.paciente.idPaciente);
          setDisabledItems([]);
        })
        .catch((error) => {
          if (error.response?.data) toast.error(error.response.data);
          else
            toast.error(
              // eslint-disable-next-line max-len
              "Ocorreu um erro ao cadastrar o paciente. Tente novamente mais tarde.",
            );
        })
        .finally(() => setLoading(false));
    } else {
      updatePaciente(data, idPaciente)
        .then((response) => {
          toast.success("Paciente atualizado com sucesso!");
          setIdPaciente(response.data.paciente.idPaciente);
        })
        .catch((error) => {
          if (error.response?.data) toast.error(error.response.data);
          else
            toast.error(
              // eslint-disable-next-line max-len
              "Ocorreu um erro ao atualizar o paciente. Tente novamente mais tarde.",
            );
        })
        .finally(() => setLoading(false));
    }
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
              <SingleFieldContainer>
                <Input
                  placeholder="Digite o CPF *"
                  fullWidth
                  maxLength={14}
                  register={{ ...register("registerPessoa.cpf") }}
                  disabled={loading}
                  hasError={Boolean(errors.registerPessoa?.cpf)}
                  errorMessage={errors.registerPessoa?.cpf?.message}
                  autoComplete="off"
                />
              </SingleFieldContainer>
              <FieldsContainer>
                <Input
                  placeholder="Digite o nome *"
                  fullWidth
                  maxLength={120}
                  register={{ ...register("registerPessoa.nome") }}
                  disabled={!filledCpf || loading || personAlreadyRegistered}
                  hasError={Boolean(errors.registerPessoa?.nome)}
                  errorMessage={errors.registerPessoa?.nome?.message}
                  autoComplete="off"
                />
                <Input
                  placeholder="Digite o email *"
                  fullWidth
                  maxLength={120}
                  register={{ ...register("registerPessoa.email") }}
                  disabled={!filledCpf || loading || personAlreadyRegistered}
                  hasError={Boolean(errors.registerPessoa?.email)}
                  errorMessage={errors.registerPessoa?.email?.message}
                  autoComplete="off"
                />
                <Input
                  placeholder="Digite o telefone *"
                  fullWidth
                  maxLength={17}
                  register={{ ...register("registerPessoa.celular") }}
                  disabled={!filledCpf || loading || personAlreadyRegistered}
                  hasError={Boolean(errors.registerPessoa?.celular)}
                  errorMessage={errors.registerPessoa?.celular?.message}
                  autoComplete="off"
                />
              </FieldsContainer>
            </Spacing>
            <Spacing>
              <CustomText $weight={500}>* Campo Obrigatório</CustomText>
            </Spacing>
            <Spacing>
              <SingleFieldContainer>
                <Button
                  textAlign="center"
                  fullWidth
                  type="button"
                  onClick={async () => {
                    await trigger("registerPessoa").then(() => {
                      if (!errors.registerPessoa)
                        setCurrentInfoStep(currentInfoStep + 1);
                    });
                  }}
                >
                  Próximo
                </Button>
              </SingleFieldContainer>
            </Spacing>
          </>
        ) : (
          currentInfoStep == 2 &&
          currentItem == 1 && (
            <>
              <Spacing>
                <CustomText $size="h2">Endereco</CustomText>
              </Spacing>
              <Spacing>
                <CepContainer>
                  <Input
                    placeholder="Digite o CEP *"
                    fullWidth
                    maxLength={11}
                    register={{ ...register("createEndereco.cep") }}
                    hasError={Boolean(errors.createEndereco?.cep)}
                    errorMessage={errors.createEndereco?.cep?.message}
                    disabled={loading}
                  />
                </CepContainer>
                {showAddressData && (
                  <AddressFieldsContainer>
                    <Select
                      placeholder="Escolha o estado *"
                      fullWidth
                      options={estadosOptions}
                      register={{ ...register("createEndereco.ufEstado") }}
                      outsideSelected={currentUf}
                      setOutsideSelected={setCurrentUf}
                      hasError={Boolean(errors.createEndereco?.ufEstado)}
                      errorMessage={errors.createEndereco?.ufEstado?.message}
                      disabled={!filledCep || loading}
                    />
                    <Input
                      placeholder="Digite a cidade *"
                      fullWidth
                      register={{ ...register("createEndereco.cidade") }}
                      hasError={Boolean(errors.createEndereco?.cidade)}
                      errorMessage={errors.createEndereco?.cidade?.message}
                      disabled={!filledCep || loading}
                      maxLength={100}
                    />
                    <Input
                      placeholder="Digite o logradouro *"
                      fullWidth
                      register={{ ...register("createEndereco.logradouro") }}
                      hasError={Boolean(errors.createEndereco?.logradouro)}
                      errorMessage={errors.createEndereco?.logradouro?.message}
                      disabled={!filledCep || loading}
                      maxLength={100}
                    />
                    <Input
                      placeholder="Digite o bairro *"
                      fullWidth
                      register={{ ...register("createEndereco.bairro") }}
                      hasError={Boolean(errors.createEndereco?.bairro)}
                      errorMessage={errors.createEndereco?.bairro?.message}
                      disabled={!filledCep || loading}
                      maxLength={120}
                    />
                    <Input
                      placeholder="Digite o número *"
                      fullWidth
                      register={{ ...register("createEndereco.numero") }}
                      hasError={Boolean(errors.createEndereco?.numero)}
                      errorMessage={errors.createEndereco?.numero?.message}
                      disabled={!filledCep || loading}
                    />
                    <Input
                      placeholder="Digite o complemento"
                      fullWidth
                      register={{ ...register("createEndereco.complemento") }}
                      hasError={Boolean(errors.createEndereco?.complemento)}
                      errorMessage={errors.createEndereco?.complemento?.message}
                      disabled={!filledCep || loading}
                      maxLength={100}
                    />
                  </AddressFieldsContainer>
                )}
              </Spacing>
              <Spacing>
                <CustomText $weight={500}>* Campo Obrigatório</CustomText>
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
                    type="submit"
                    disabled={loading}
                  >
                    {idPaciente == 0 ? "Cadastrar" : "Atualizar"}
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
                options={conveniosOptions}
                outsideSelected={currentConvenio}
                setOutsideSelected={setCurrentConvenio}
              />
              <Select
                placeholder="Escolha o tipo de convênio *"
                fullWidth
                options={tiposConvenioOptions}
                outsideSelected={currentTipoConvenio}
                setOutsideSelected={setCurrentTipoConvenio}
              />
              <Input
                placeholder="Digite o número da carteirinha *"
                fullWidth
                value={healthInsuranceNumber}
                onChange={(e) =>
                  setHealthInsuranceNumber(onlyNumbers(e.currentTarget.value))
                }
              />
            </FieldsContainer>
          </Spacing>
          <Spacing>
            <CustomText $weight={500}>* Campo Obrigatório</CustomText>
          </Spacing>
          <Spacing>
            <SingleFieldContainer>
              <Button
                textAlign="center"
                fullWidth
                disabled={
                  currentConvenio.value == "" ||
                  currentTipoConvenio.value == "" ||
                  healthInsuranceNumber == "" ||
                  loading
                }
                onClick={() => {
                  setLoading(true);
                  setAssociatedConvenios([]);

                  associatePlanoSaudePaciente(
                    Number(currentConvenio.value),
                    idPaciente,
                    Number(healthInsuranceNumber),
                    Number(currentTipoConvenio.value),
                  )
                    .then(() => {
                      setCurrentConvenio({ label: "", value: "" });
                      getPlanosSaudePaciente();
                      toast.success("Convênio vinculado com sucesso!");
                    })
                    .catch(() =>
                      toast.error(
                        // eslint-disable-next-line max-len
                        "Ocorreu um erro ao vincular o convênio. Tente novamente mais tarde.",
                      ),
                    )
                    .finally(() => setLoading(false));
                }}
              >
                Vincular convênio
              </Button>
            </SingleFieldContainer>
          </Spacing>
          {loading && <Spinner />}
          {associatedConvenios.length > 0 && (
            <Spacing>
              <CustomText $size="h2">Convênios Vinculados</CustomText>
            </Spacing>
          )}
          {associatedConvenios.map((convenio) => (
            <Spacing key={convenio.planoSaude.idPlanoSaude}>
              <Card>
                <CardContentContainer>
                  <HealthInsuranceInfoContainer>
                    <CustomText $size="h2">
                      {convenio.planoSaude.descricao}
                    </CustomText>
                    <CardInfoContainer>
                      <CustomText $size="h3">Tipo:</CustomText>
                      <CustomText $size="h3" $weight={300}>
                        {convenio.tipoPlanoSaude.descricao}
                      </CustomText>
                    </CardInfoContainer>
                    <CardInfoContainer>
                      <CustomText $size="h3">Carteirinha:</CustomText>
                      <CustomText $size="h3" $weight={300}>
                        {convenio.numeroCarteirinha}
                      </CustomText>
                    </CardInfoContainer>
                  </HealthInsuranceInfoContainer>
                  <Trash
                    onClick={() => {
                      setLoading(true);
                      setAssociatedConvenios([]);

                      removePlanoSaudePaciente(
                        convenio.planoSaude.idPlanoSaude,
                        idPaciente,
                      )
                        .then(() => {
                          toast.success("Convênio desvinculado com sucesso!");
                          getPlanosSaudePaciente();
                        })
                        .catch(() =>
                          toast.error(
                            // eslint-disable-next-line max-len
                            "Ocorreu um erro ao desvincular o convênio. Tente novamente mais tarde.",
                          ),
                        )
                        .finally(() => setLoading(false));
                    }}
                  />
                </CardContentContainer>
              </Card>
            </Spacing>
          ))}
        </>
      )}
    </>
  );
}
