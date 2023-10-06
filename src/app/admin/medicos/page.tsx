"use client";

import { Card, CustomText, Pagination } from "@medlinked/components";
import { useState } from "react";

export default function Page() {
  const [pageNumber, setPageNumber] = useState(1);

  function changePage(newPageNumber: number) {
    setPageNumber(newPageNumber);
  }

  return (
    <>
      <Card>
        <CustomText>Médico</CustomText>
      </Card>
      <Pagination
        pageNumber={pageNumber}
        changePage={changePage}
        numberOfPages={10}
      />
    </>
  );
}
