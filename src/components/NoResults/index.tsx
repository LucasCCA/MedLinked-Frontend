import { SearchX } from "lucide-react";
import { CustomText } from "..";
import { NoResultsContainer } from "./styles";

export type NoResultsProps = {
  message: string;
};

export function NoResults({ message }: NoResultsProps) {
  return (
    <NoResultsContainer>
      <SearchX size={80} />
      <CustomText $size="h2" $align="center">
        {message}
      </CustomText>
    </NoResultsContainer>
  );
}
