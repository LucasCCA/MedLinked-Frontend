"use client";

import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { CustomText } from "..";
import { PaginationItemContainer, PaginationItemsContainer } from "./styles";

type PaginationProps = {
  pageNumber: number;
  changePage: (newPageNumber: number) => void;
  numberOfPages: number;
};

export function Pagination({
  pageNumber,
  changePage,
  numberOfPages,
}: PaginationProps) {
  const [page, setPage] = useState(pageNumber);

  const pagesToShow: number[] = useMemo(() => {
    const content = [];
    for (let i = 1; i <= numberOfPages; i++) {
      content.push(i);
    }

    return content;
  }, [numberOfPages]);

  const [numbersToShow, setNumbersToShow] = useState<number[]>(
    pagesToShow.slice(0, 5),
  );

  function nextPage() {
    changePage(page + 1);
    setPage(page + 1);
  }

  function previousPage() {
    changePage(page - 1);
    setPage(page - 1);
  }

  function firstPage() {
    changePage(0);
    setPage(0);
  }

  function lastPage() {
    changePage(numberOfPages - 1);
    setPage(numberOfPages - 1);
  }

  function changePageByNumber(number: number) {
    changePage(number);
    setPage(number);
  }

  useEffect(() => {
    function setPaginationPage() {
      const indexOfCurrentPage = pagesToShow.indexOf(page + 1);

      let paginationPage = Math.ceil(indexOfCurrentPage / 5);
      if (indexOfCurrentPage % 5 == 0) paginationPage = paginationPage + 1;

      const start = 0 + 5 * (paginationPage - 1);
      const end = 0 + 5 * (paginationPage - 1) + 5;
      setNumbersToShow(pagesToShow.slice(start, end));
    }

    setPaginationPage();
  }, [page, pagesToShow]);

  return (
    <PaginationItemsContainer>
      <PaginationItemContainer
        onClick={() => firstPage()}
        $disabled={page == 0}
      >
        <ChevronsLeft size={20} />
      </PaginationItemContainer>
      <PaginationItemContainer
        onClick={() => previousPage()}
        $disabled={page == 0}
      >
        <ChevronLeft size={20} />
      </PaginationItemContainer>
      {pagesToShow.slice(0, 5).filter((number) => number == numbersToShow[0])
        .length < 1 && (
        <PaginationItemContainer
          onClick={() => changePageByNumber(numbersToShow[0] - 2)}
        >
          <CustomText>...</CustomText>
        </PaginationItemContainer>
      )}
      {numbersToShow.map((currentNumber) => (
        <PaginationItemContainer
          key={currentNumber}
          onClick={() => changePageByNumber(currentNumber - 1)}
          $selected={currentNumber == page + 1}
        >
          <CustomText>{currentNumber}</CustomText>
        </PaginationItemContainer>
      ))}
      {numbersToShow[4] < numberOfPages && (
        <PaginationItemContainer
          onClick={() => changePageByNumber(numbersToShow[4] + 2)}
        >
          <CustomText>...</CustomText>
        </PaginationItemContainer>
      )}
      <PaginationItemContainer
        onClick={() => nextPage()}
        $disabled={page + 1 == numberOfPages}
      >
        <ChevronRight size={20} />
      </PaginationItemContainer>
      <PaginationItemContainer
        onClick={() => lastPage()}
        $disabled={page + 1 == numberOfPages}
      >
        <ChevronsRight size={20} />
      </PaginationItemContainer>
    </PaginationItemsContainer>
  );
}
