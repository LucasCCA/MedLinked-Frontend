"use client";

import { X } from "lucide-react";
import { Dispatch, SetStateAction } from "react";
import { CustomText } from "..";
import { ModalContainer, Overlay, TitleContainer } from "./styles";

type ModalProps = {
  title: string;
  children: React.ReactNode;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

export function Modal({ title, children, open, setOpen }: ModalProps) {
  return (
    <Overlay $open={open}>
      <ModalContainer>
        <TitleContainer>
          <CustomText $size="h2">{title}</CustomText>
          <X size={30} onClick={() => setOpen(false)} />
        </TitleContainer>
        {children}
      </ModalContainer>
    </Overlay>
  );
}
