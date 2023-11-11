"use client";

import { X } from "lucide-react";
import { Dispatch, SetStateAction } from "react";
import { useDetectClickOutside } from "react-detect-click-outside";
import { CustomText } from "..";
import { ModalContainer, Overlay, TitleContainer } from "./styles";

type ModalProps = {
  title: string;
  children: React.ReactNode;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

export function Modal({ title, children, open, setOpen }: ModalProps) {
  const ref = useDetectClickOutside({
    onTriggered: () => {
      if (open) {
        setOpen(false);
      }
    },
  });

  return (
    <Overlay $open={open}>
      <ModalContainer ref={ref}>
        <TitleContainer>
          <CustomText $size="h2">{title}</CustomText>
          <X size={30} onClick={() => setOpen(false)} />
        </TitleContainer>
        {children}
      </ModalContainer>
    </Overlay>
  );
}
