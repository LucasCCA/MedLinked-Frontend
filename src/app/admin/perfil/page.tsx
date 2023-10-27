"use client";

import { Button, CustomText, Input, Spacing } from "@medlinked/components";
import { FieldsContainer, SingleFieldContainer } from "../styles";

export default function Page() {
  return (
    <>
      <Spacing>
        <CustomText $size="h2">Dados da Conta</CustomText>
      </Spacing>
      <Spacing>
        <FieldsContainer>
          <Input placeholder="Digite o nome *" fullWidth maxLength={120} />
          <Input placeholder="Digite o CPF *" fullWidth maxLength={120} />
          <Input placeholder="Digite o email *" fullWidth maxLength={17} />
        </FieldsContainer>
      </Spacing>
      <Spacing>
        <SingleFieldContainer>
          <Button textAlign="center" fullWidth>
            Atualizar Informações
          </Button>
        </SingleFieldContainer>
      </Spacing>
      <Spacing>
        <CustomText $size="h2">Alterar Senha</CustomText>
      </Spacing>
      <Spacing>
        <FieldsContainer>
          <Input placeholder="Senha antiga *" fullWidth maxLength={200} />
          <Input placeholder="Senha nova *" fullWidth maxLength={200} />
          <Input placeholder="Repetir senha nova *" fullWidth maxLength={200} />
        </FieldsContainer>
      </Spacing>
      <Spacing>
        <CustomText $weight={500}>* Campo Obrigatório</CustomText>
      </Spacing>
      <Spacing>
        <SingleFieldContainer>
          <Button textAlign="center" fullWidth>
            Atualizar Senha
          </Button>
        </SingleFieldContainer>
      </Spacing>
    </>
  );
}
