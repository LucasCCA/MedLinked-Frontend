"use client";

import { Tabs } from "@medlinked/components";
import { useParams } from "next/navigation";
import { useState } from "react";

const items = [
  {
    id: 1,
    label: "Informações",
  },
  {
    id: 2,
    label: "Convênios",
  },
];

export default function Page() {
  const params = useParams();
  const [currentItem, setCurrentItem] = useState(1);

  return (
    <>
      <Tabs
        items={items}
        currentItemId={currentItem}
        changeCurrentItemId={setCurrentItem}
      />
    </>
  );
}
