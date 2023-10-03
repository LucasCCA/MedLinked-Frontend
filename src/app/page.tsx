"use client";

import { Card, CustomText, Select } from "@medlinked/components";

const options = [
  {
    label: "teste",
    value: "1",
  },
  {
    label: "test",
    value: "2",
  },
  {
    label: "teste2",
    value: "3",
  },
  {
    label: "te",
    value: "4",
  },
  {
    label: "tes",
    value: "5",
  },
  {
    label: "testefa",
    value: "6",
  },
];

export default function Home() {
  return (
    <>
      <Select options={options} placeholder="Escolha uma opção" />
      <Card>
        <CustomText>Teste</CustomText>
      </Card>
    </>
  );
}
