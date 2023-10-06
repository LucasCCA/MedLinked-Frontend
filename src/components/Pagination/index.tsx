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

  const pages: number[] = useMemo(() => {
    const content = [];
    for (let i = 1; i <= numberOfPages; i++) {
      content.push(i);
    }

    return content;
  }, [numberOfPages]);

  const [numbersToShow, setNumbersToShow] = useState<number[]>(
    pages.slice(0, 5),
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
    changePage(1);
    setPage(1);
  }

  function lastPage() {
    changePage(numberOfPages);
    setPage(numberOfPages);
  }

  function changePageByNumber(number: number) {
    changePage(number);
    setPage(number);
  }

  useEffect(() => {
    function setPaginationPage() {
      const indexOfCurrentPage = pages.indexOf(page);

      let paginationPage = Math.ceil(indexOfCurrentPage / 5);
      if (indexOfCurrentPage % 5 == 0) paginationPage = paginationPage + 1;

      const start = 0 + 5 * (paginationPage - 1);
      const end = 0 + 5 * (paginationPage - 1) + 5;
      setNumbersToShow(pages.slice(start, end));
    }

    setPaginationPage();
  }, [page, pages]);

  return (
    <PaginationItemsContainer>
      <PaginationItemContainer
        onClick={() => firstPage()}
        $disabled={page == 1}
      >
        <ChevronsLeft size={20} />
      </PaginationItemContainer>
      <PaginationItemContainer
        onClick={() => previousPage()}
        $disabled={page == 1}
      >
        <ChevronLeft size={20} />
      </PaginationItemContainer>
      {pages.slice(0, 5).filter((number) => number == numbersToShow[0]).length <
        1 && (
        <PaginationItemContainer
          onClick={() => changePageByNumber(numbersToShow[0] - 1)}
        >
          <CustomText>...</CustomText>
        </PaginationItemContainer>
      )}
      {numbersToShow.map((currentNumber) => (
        <PaginationItemContainer
          key={currentNumber}
          onClick={() => changePageByNumber(currentNumber)}
          $selected={currentNumber == page}
        >
          <CustomText>{currentNumber}</CustomText>
        </PaginationItemContainer>
      ))}
      {numbersToShow[4] < numberOfPages && (
        <PaginationItemContainer
          onClick={() => changePageByNumber(numbersToShow[4] + 1)}
        >
          <CustomText>...</CustomText>
        </PaginationItemContainer>
      )}
      <PaginationItemContainer
        onClick={() => nextPage()}
        $disabled={page == numberOfPages}
      >
        <ChevronRight size={20} />
      </PaginationItemContainer>
      <PaginationItemContainer
        onClick={() => lastPage()}
        $disabled={page == numberOfPages}
      >
        <ChevronsRight size={20} />
      </PaginationItemContainer>
    </PaginationItemsContainer>
  );
}
