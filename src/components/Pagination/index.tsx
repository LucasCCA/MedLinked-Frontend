import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
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
  console.log("page = " + page);
  const pageNumbers = [];
  const closeNumbersBefore = [];
  const closeNumbersAfter = [];

  for (let i = 1; i <= numberOfPages; i++) {
    pageNumbers.push(i);
  }

  function nextPage() {
    pageNumber += 1;
    setPage(page + 1);
  }

  function previousPage() {
    pageNumber -= 1;
    setPage(page - 1);
  }

  useEffect(() => {
    closeNumbersBefore.push(page - 1);
  }, [page]);

  return (
    <PaginationItemsContainer>
      <PaginationItemContainer
        onClick={() => {
          previousPage();
          changePage(page - 1);
        }}
        $disabled={page == 1}
      >
        <ChevronLeft size={20} />
      </PaginationItemContainer>
      {numberOfPages <= 6 &&
        pageNumbers.map((currentPageNumber) => (
          <PaginationItemContainer
            key={currentPageNumber}
            onClick={() => {
              changePage(currentPageNumber);
              setPage(currentPageNumber);
            }}
            $selected={currentPageNumber == page}
          >
            <CustomText>{currentPageNumber}</CustomText>
          </PaginationItemContainer>
        ))}
      {numberOfPages > 6 &&
        pageNumbers.slice(0, 3).map((currentPageNumber) => (
          <PaginationItemContainer
            key={currentPageNumber}
            onClick={() => {
              changePage(currentPageNumber);
              setPage(currentPageNumber);
            }}
            $selected={currentPageNumber == page}
          >
            <CustomText>{currentPageNumber}</CustomText>
          </PaginationItemContainer>
        ))}
      {numberOfPages > 6 && (
        <PaginationItemContainer
          onClick={() => {
            changePage(page);
            setPage(page);
          }}
        >
          <CustomText>...</CustomText>
        </PaginationItemContainer>
      )}
      {numberOfPages > 6 &&
        pageNumbers
          .slice(pageNumbers.length - 3, pageNumbers.length)
          .map((currentPageNumber) => (
            <PaginationItemContainer
              key={currentPageNumber}
              onClick={() => {
                changePage(currentPageNumber);
                setPage(currentPageNumber);
              }}
              $selected={currentPageNumber == page}
            >
              <CustomText>{currentPageNumber}</CustomText>
            </PaginationItemContainer>
          ))}
      <PaginationItemContainer
        onClick={() => {
          nextPage();
          changePage(page + 1);
        }}
        $disabled={page == numberOfPages}
      >
        <ChevronRight size={20} />
      </PaginationItemContainer>
    </PaginationItemsContainer>
  );
}
