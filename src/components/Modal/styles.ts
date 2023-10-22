import { breakpoints } from "@medlinked/config";
import styled from "styled-components";

type OverlayProps = {
  $open: boolean;
};

export const Overlay = styled.div<OverlayProps>`
  display: ${(props) => (props.$open ? "flex" : "none")};
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  background: ${(props) => props.theme.colors.black_60};
  z-index: 9999;
`;

export const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: ${(props) => props.theme.colors.white};
  padding: 1.25rem;
  border-radius: ${(props) => props.theme.border_radius};
  width: 290px;
  gap: 30px;

  @media ${breakpoints.sm} {
    width: 500px;
  }
`;

export const TitleContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;

  svg {
    color: ${(props) => props.theme.colors.black_80};

    &:hover {
      cursor: pointer;
      color: ${(props) => props.theme.colors.black_100};
    }
  }
`;
