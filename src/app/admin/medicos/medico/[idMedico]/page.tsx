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
import { cpfMask, crmMask, phoneNumberMask } from "@medlinked/utils";
import { Trash } from "lucide-react";
import { useParams } from "next/navigation";
import { useState } from "react";
import {
  CPFContainer,
  FieldsContainer,
  SpecializationCardContentContainer,
} from "./styles";

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
  const [cpf, setCpf] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [crm, setCrm] = useState("");

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
            <CPFContainer>
              <Input
                placeholder="Digite o CPF *"
                fullWidth
                maxLength={14}
                value={cpf}
                onChange={(e) => setCpf(cpfMask(e.currentTarget.value))}
              />
            </CPFContainer>
            <FieldsContainer>
              <Input placeholder="Digite o nome *" fullWidth maxLength={120} />
              <Input placeholder="Digite o email *" fullWidth maxLength={120} />
              <Input
                placeholder="Digite o celular"
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
                <SpecializationCardContentContainer>
                  <CustomText $size="h2">Especialização X</CustomText>
                  <Trash />
                </SpecializationCardContentContainer>
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
              <SpecializationCardContentContainer>
                <CustomText $size="h2">Convênio X</CustomText>
                <Trash />
              </SpecializationCardContentContainer>
            </Card>
          </Spacing>
        </>
      )}
    </>
  );
}
