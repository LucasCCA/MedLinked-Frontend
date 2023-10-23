"use client";

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
  cepMask,
  cpfMask,
  onlyNumbers,
  phoneNumberMask,
} from "@medlinked/utils";
import { Trash } from "lucide-react";
import { useParams } from "next/navigation";
import { useState } from "react";
import {
  CardContentContainer,
  CardInfoContainer,
  FieldsContainer,
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
  const [currentItem, setCurrentItem] = useState(1);
  const [disabledItems, setDisabledItems] = useState([2]);
  const [currentInfoStep, setCurrentInfoStep] = useState(1);
  const [cpf, setCpf] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [cep, setCep] = useState("");
  const [houseNumber, setHouseNumber] = useState("");
  const [healthInsuranceNumber, setHealthInsuranceNumber] = useState("");

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
                value={cpf}
                onChange={(e) => setCpf(cpfMask(e.currentTarget.value))}
              />
            </SingleFieldContainer>
            <FieldsContainer>
              <Input placeholder="Digite o nome *" fullWidth maxLength={120} />
              <Input placeholder="Digite o email *" fullWidth maxLength={120} />
              <Input
                placeholder="Digite o telefone *"
                fullWidth
                maxLength={17}
                value={phoneNumber}
                onChange={(e) =>
                  setPhoneNumber(phoneNumberMask(e.currentTarget.value))
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
                onClick={() => setCurrentInfoStep(currentInfoStep + 1)}
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
              <SingleFieldContainer>
                <Input
                  placeholder="Digite o CEP *"
                  fullWidth
                  maxLength={11}
                  value={cep}
                  onChange={(e) => setCep(cepMask(e.currentTarget.value))}
                />
              </SingleFieldContainer>
              <FieldsContainer>
                <Select
                  placeholder="Escolha o estado *"
                  fullWidth
                  options={[]}
                />
                <Select
                  placeholder="Escolha a cidade *"
                  fullWidth
                  options={[]}
                />
                <Input placeholder="Digite o logradouro *" fullWidth />
                <Input placeholder="Digite o bairro *" fullWidth />
                <Input
                  placeholder="Digite o número *"
                  fullWidth
                  value={houseNumber}
                  onChange={(e) =>
                    setHouseNumber(onlyNumbers(e.currentTarget.value))
                  }
                />
                <Input placeholder="Digite o complemento" fullWidth />
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
              <Select
                placeholder="Escolha o tipo de convênio *"
                fullWidth
                options={[]}
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
              <Button textAlign="center" fullWidth>
                Vincular convênio
              </Button>
            </SingleFieldContainer>
          </Spacing>
          <Spacing>
            <CustomText $size="h2">Convênios Vinculados</CustomText>
          </Spacing>
          <Spacing>
            <Card>
              <CardContentContainer>
                <CardInfoContainer>
                  <CustomText $size="h2">Convênio X</CustomText>
                  <CustomText $size="h3">Tipo: Tipo Y</CustomText>
                  <CustomText $size="h3">Carteirinha: 12345</CustomText>
                </CardInfoContainer>
                <Trash />
              </CardContentContainer>
            </Card>
          </Spacing>
        </>
      )}
    </>
  );
}
