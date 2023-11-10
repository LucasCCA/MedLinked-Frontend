import styled from "styled-components";

export const FailedSchedulesContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-height: 400px;
  overflow-y: scroll;

  > div {
    max-width: 99.5%;
  }

  &::-webkit-scrollbar {
    width: 7px;
  }

  &::-webkit-scrollbar-track {
    background-color: ${(props) => props.theme.colors.gray_60};
    border-radius: ${(props) => props.theme.border_radius};
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${(props) => props.theme.colors.gray_100};
    border-radius: ${(props) => props.theme.border_radius};
  }
`;
