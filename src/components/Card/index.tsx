import { CardStyles } from "./styles";

type CardProps = {
  selected?: boolean;
  children?: React.ReactNode;
};

export function Card({ selected, children }: CardProps) {
  return <CardStyles $selected={selected}>{children}</CardStyles>;
}
