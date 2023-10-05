import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
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
  console.log(page);

  function nextPage() {
    pageNumber += 1;
    setPage(pageNumber);
    console.log(pageNumber.toString() + " " + page.toString());
  }

  function previousPage() {
    pageNumber -= 1;
    setPage(pageNumber);
    console.log(pageNumber.toString() + " " + page.toString());
  }

  return (
    <PaginationItemsContainer>
      <PaginationItemContainer
        onClick={() => previousPage()}
        $disabled={page == 1}
      >
        <ChevronLeft size={20} />
      </PaginationItemContainer>
      {numberOfPages > 6 && (
        <PaginationItemContainer>
          <CustomText>...</CustomText>
        </PaginationItemContainer>
      )}
      <PaginationItemContainer
        onClick={() => nextPage()}
        $disabled={page == numberOfPages}
      >
        <ChevronRight size={20} />
      </PaginationItemContainer>
    </PaginationItemsContainer>
  );
}
