"use client";

import { Breadcrumb } from "@medlinked/components";
import { useParams } from "next/navigation";

const items = [
  {
    label: "Médicos",
    href: "/admin/medicos",
  },
  {
    label: "Cadastro",
    href: "",
  },
];

export default function Page() {
  const params = useParams();

  return <Breadcrumb items={items} />;
}
