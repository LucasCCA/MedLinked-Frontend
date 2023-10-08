"use client";

import {
  Breadcrumb,
  Button,
  CustomText,
  Input,
  Spacing,
  Tabs,
} from "@medlinked/components";
import { useParams } from "next/navigation";
import { useState } from "react";
import { CPFContainer, FieldsContainer } from "./styles";

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
          disabledItemsIds={[2]}
        />
      </Spacing>
      <Spacing>
        <CustomText $size="h2">Dados Pessoais</CustomText>
      </Spacing>
      <Spacing>
        <CPFContainer>
          <Input placeholder="Digite o CPF *" fullWidth />
        </CPFContainer>
        <FieldsContainer>
          <Input placeholder="Digite o nome *" fullWidth />
          <Input placeholder="Digite o email *" fullWidth />
          <Input placeholder="Digite o celular" fullWidth />
        </FieldsContainer>
      </Spacing>
      <Spacing>
        <CustomText $weight={500}>* Campo Obrigatório</CustomText>
      </Spacing>
      <Spacing>
        <FieldsContainer>
          <Button textAlign="center" fullWidth>
            Próximo
          </Button>
        </FieldsContainer>
      </Spacing>
    </>
  );
}
