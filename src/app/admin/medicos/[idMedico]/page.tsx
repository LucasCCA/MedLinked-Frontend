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
  Tabs,
} from "@medlinked/components";
import { registerMedicoSchema } from "@medlinked/schemas";
import {
  associatePlanoSaudeMedico,
  createMedico,
  getAllEspecialidades,
  getAllEstados,
  getAllPlanosSaude,
  getMedico,
  getPessoaByCpf,
  removePlanoSaudeMedico,
  updateMedico,
} from "@medlinked/services";
import {
  CreateMedico,
  EspecializacaoResponse,
  EstadoResponse,
  PlanosSaudeResponse,
} from "@medlinked/types";
import {
  cpfMask,
  crmMask,
  formatCpf,
  onlyNumbers,
  phoneNumberMask,
} from "@medlinked/utils";
import { Trash } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import {
  CardContentContainer,
  FieldsContainer,
  SingleFieldContainer,
} from "../styles";

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
  const [idMedico, setIdMedico] = useState(Number(params.idMedico));
  const [currentItem, setCurrentItem] = useState(1);
  const [disabledItems, setDisabledItems] = useState(idMedico == 0 ? [2] : []);
  const [currentInfoStep, setCurrentInfoStep] = useState(1);
  const [filledCpf, setFilledCpf] = useState(false);
  const [personAlreadyRegistered, setPersonAlreadyRegistered] = useState(false);
  const [loading, setLoading] = useState(false);
  const [estados, setEstados] = useState<EstadoResponse>([]);
  const [especializacoes, setEspecializacoes] =
    useState<EspecializacaoResponse>([]);
  const [currentEspecializacao, setCurrentEspecializacao] = useState({
    label: "",
    value: "",
  });
  const [idsEspecialidades, setIdsEspecialidades] = useState<number[]>([]);
  const [currentUf, setCurrentUf] = useState({
    label: "",
    value: "",
  });
  const [convenios, setConvenios] = useState<PlanosSaudeResponse>([]);
  const [currentConvenio, setCurrentConvenio] = useState({
    label: "",
    value: "",
  });
  const [idsPlanosSaude, setIdsPlanosSaude] = useState<number[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    trigger,
    resetField,
  } = useForm<CreateMedico>({ resolver: yupResolver(registerMedicoSchema) });

  const cpfValue = watch("registerPessoa.cpf");
  const phoneNumberValue = watch("registerPessoa.celular");
  const crmValue = watch("numeroCrm");

  useEffect(() => {
    function getExistingMedico() {
      getMedico(idMedico).then((response) => {
        setValue("registerPessoa.cpf", cpfMask(formatCpf(response.data.cpf)));
        setValue(
          "registerPessoa.celular",
          phoneNumberMask(response.data.celular.toString()),
        );
        setValue("registerPessoa.email", response.data.email);
        setValue("registerPessoa.nome", response.data.nome);
        setValue(
          "idsEspecialidades",
          response.data.especialidades.map(
            (especialidade) => especialidade.idEspecialidade,
          ),
        );
        setIdsEspecialidades(
          response.data.especialidades.map(
            (especialidade) => especialidade.idEspecialidade,
          ),
        );
        setValue("numeroCrm", response.data.numeroCrm.toString());
        setValue("ufCrm", response.data.estado.uf);
        setCurrentUf({
          label: response.data.estado.descricao,
          value: response.data.estado.uf,
        });
        setIdsPlanosSaude(
          response.data.planosSaudeMedico.map(
            (planoSaude) => planoSaude.idPlanoSaude,
          ),
        );
      });
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

    function getEspecialidades() {
      setLoading(true);

      getAllEspecialidades()
        .then((response) => setEspecializacoes(response.data))
        .catch(() =>
          toast.error(
            // eslint-disable-next-line max-len
            "Ocorreu um erro ao carregar as especializações. Tente novamente mais tarde.",
          ),
        )
        .finally(() => setLoading(false));
    }

    getConvenios();
    getEstados();
    getEspecialidades();
    if (idMedico != 0) getExistingMedico();
  }, []);

  const estadosOptions: OptionData[] = [];

  for (let i = 0; i < estados.length; i++) {
    estadosOptions.push({ label: estados[i].descricao, value: estados[i].uf });
  }

  const especializacoesOptions: OptionData[] = [];

  for (let i = 0; i < especializacoes.length; i++) {
    especializacoesOptions.push({
      label: especializacoes[i].descricao,
      value: especializacoes[i].idEspecialidade.toString(),
    });
  }

  const conveniosOptions: OptionData[] = [];

  for (let i = 0; i < convenios.length; i++) {
    conveniosOptions.push({
      label: convenios[i].descricao,
      value: convenios[i].idPlanoSaude.toString(),
    });
  }

  useEffect(() => {
    setValue("registerPessoa.cpf", cpfMask(cpfValue));
    setValue("registerPessoa.celular", phoneNumberMask(phoneNumberValue));
    setValue("numeroCrm", crmMask(crmValue));
    setValue("ufCrm", currentUf?.value);
    setFilledCpf(
      idMedico == 0 ? watch("registerPessoa.cpf").length == 14 : true,
    );
  }, [cpfValue, phoneNumberValue, crmValue, currentUf]);

  useEffect(() => {
    if (filledCpf) {
      if (idMedico == 0) {
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
  }, [filledCpf]);

  const onSubmit: SubmitHandler<CreateMedico> = (data) => {
    if (idMedico == 0) {
      createMedico(data)
        .then((response) => {
          toast.success("Médico cadastrado com sucesso!");
          setIdMedico(response.data.idMedico);
          setDisabledItems([]);
        })
        .catch((error) => toast.error(error.response.data));
    } else {
      updateMedico(data, idMedico)
        .then((response) => {
          toast.success("Médico atualizado com sucesso!");
          setIdMedico(response.data.idMedico);
        })
        .catch((error) => toast.error(error.response.data));
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
                />
                <Input
                  placeholder="Digite o email *"
                  fullWidth
                  maxLength={120}
                  register={{ ...register("registerPessoa.email") }}
                  disabled={!filledCpf || loading || personAlreadyRegistered}
                  hasError={Boolean(errors.registerPessoa?.email)}
                  errorMessage={errors.registerPessoa?.email?.message}
                />
                <Input
                  placeholder="Digite o celular *"
                  fullWidth
                  maxLength={17}
                  register={{ ...register("registerPessoa.celular") }}
                  disabled={!filledCpf || loading || personAlreadyRegistered}
                  hasError={Boolean(errors.registerPessoa?.celular)}
                  errorMessage={errors.registerPessoa?.celular?.message}
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
                <CustomText $size="h2">Dados do Médico</CustomText>
              </Spacing>
              <Spacing>
                <FieldsContainer>
                  <Select
                    placeholder="Escolha o estado do CRM *"
                    fullWidth
                    options={estadosOptions}
                    register={{ ...register("ufCrm") }}
                    outsideSelected={currentUf}
                    setOutsideSelected={setCurrentUf}
                    hasError={Boolean(errors.ufCrm)}
                    errorMessage={errors.ufCrm?.message}
                  />
                  <Input
                    placeholder="Digite o número do CRM *"
                    fullWidth
                    maxLength={6}
                    register={{ ...register("numeroCrm") }}
                    hasError={Boolean(errors.numeroCrm)}
                    errorMessage={errors.numeroCrm?.message}
                  />
                </FieldsContainer>
              </Spacing>
              <Spacing>
                <CustomText $size="h2">Especializações</CustomText>
              </Spacing>
              <Spacing>
                <SingleFieldContainer>
                  <Select
                    placeholder="Escolha uma especialização *"
                    fullWidth
                    options={especializacoesOptions.filter(
                      (especializacao) =>
                        Number(especializacao.value) != idsEspecialidades[0] &&
                        Number(especializacao.value) != idsEspecialidades[1],
                    )}
                    outsideSelected={currentEspecializacao}
                    setOutsideSelected={setCurrentEspecializacao}
                    hasError={Boolean(errors.idsEspecialidades)}
                    errorMessage={errors.idsEspecialidades?.message}
                  />
                </SingleFieldContainer>
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
                      currentEspecializacao.value == "" ||
                      idsEspecialidades.length >= 2
                    }
                    onClick={() => {
                      setCurrentEspecializacao({ label: "", value: "" });
                      setIdsEspecialidades([
                        ...idsEspecialidades,
                        Number(currentEspecializacao.value),
                      ]);
                      setValue("idsEspecialidades", [
                        ...idsEspecialidades,
                        Number(currentEspecializacao.value),
                      ]);
                    }}
                  >
                    Vincular especialização
                  </Button>
                </SingleFieldContainer>
              </Spacing>
              {idsEspecialidades.length > 0 && (
                <Spacing>
                  <CustomText $size="h2">Especializações Vinculadas</CustomText>
                </Spacing>
              )}
              {especializacoes
                .filter(
                  (especializacao) =>
                    especializacao.idEspecialidade == idsEspecialidades[0] ||
                    especializacao.idEspecialidade == idsEspecialidades[1],
                )
                .map((especializacao) => (
                  <Spacing key={especializacao.idEspecialidade}>
                    <Card>
                      <CardContentContainer>
                        <CustomText $size="h2">
                          {especializacao.descricao}
                        </CustomText>
                        <Trash
                          onClick={() => {
                            setIdsEspecialidades(
                              idsEspecialidades.filter(
                                (idEspecialidade) =>
                                  idEspecialidade !=
                                  especializacao.idEspecialidade,
                              ),
                            );
                            setValue(
                              "idsEspecialidades",
                              idsEspecialidades.filter(
                                (idEspecialidade) =>
                                  idEspecialidade !=
                                  especializacao.idEspecialidade,
                              ),
                            );
                          }}
                        />
                      </CardContentContainer>
                    </Card>
                  </Spacing>
                ))}
              <Spacing>
                <FieldsContainer>
                  <Button
                    textAlign="center"
                    fullWidth
                    onClick={() => setCurrentInfoStep(currentInfoStep - 1)}
                  >
                    Voltar
                  </Button>
                  <Button textAlign="center" fullWidth type="submit">
                    {idMedico == 0 ? "Cadastrar" : "Atualizar"}
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
            <SingleFieldContainer>
              <Select
                placeholder="Escolha um convênio *"
                fullWidth
                options={conveniosOptions.filter(
                  (convenio) =>
                    !idsPlanosSaude.find(
                      (idPlanoSaude) => idPlanoSaude == Number(convenio.value),
                    ),
                )}
                outsideSelected={currentConvenio}
                setOutsideSelected={setCurrentConvenio}
              />
            </SingleFieldContainer>
          </Spacing>
          <Spacing>
            <CustomText $weight={500}>* Campo Obrigatório</CustomText>
          </Spacing>
          <Spacing>
            <SingleFieldContainer>
              <Button
                textAlign="center"
                fullWidth
                disabled={currentConvenio.value == ""}
                onClick={() => {
                  associatePlanoSaudeMedico(
                    Number(currentConvenio.value),
                    idMedico,
                  )
                    .then(() => {
                      setCurrentConvenio({ label: "", value: "" });
                      setIdsPlanosSaude([
                        ...idsPlanosSaude,
                        Number(currentConvenio.value),
                      ]);
                      toast.success("Convênio vinculado com sucesso!");
                    })
                    .catch(() =>
                      toast.error(
                        // eslint-disable-next-line max-len
                        "Ocorreu um erro ao vincular o convênio. Tente novamente mais tarde.",
                      ),
                    );
                }}
              >
                Vincular convênio
              </Button>
            </SingleFieldContainer>
          </Spacing>
          {idsPlanosSaude.length > 0 && (
            <Spacing>
              <CustomText $size="h2">Convênios Vinculados</CustomText>
            </Spacing>
          )}
          {convenios
            .filter((convenio) =>
              idsPlanosSaude.find(
                (idPlanoSaude) => idPlanoSaude == convenio.idPlanoSaude,
              ),
            )
            .map((convenio) => (
              <Spacing key={convenio.idPlanoSaude}>
                <Card>
                  <CardContentContainer>
                    <CustomText $size="h2">{convenio.descricao}</CustomText>
                    <Trash
                      onClick={() => {
                        removePlanoSaudeMedico(convenio.idPlanoSaude, idMedico)
                          .then(() => {
                            setIdsPlanosSaude(
                              idsPlanosSaude.filter(
                                (idPlanosSaude) =>
                                  idPlanosSaude != convenio.idPlanoSaude,
                              ),
                            );
                            toast.success("Convênio desvinculado com sucesso!");
                          })
                          .catch(() =>
                            toast.error(
                              // eslint-disable-next-line max-len
                              "Ocorreu um erro ao desvincular o convênio. Tente novamente mais tarde.",
                            ),
                          );
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