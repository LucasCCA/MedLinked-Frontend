"use client";

import {
  Button,
  Calendar,
  Card,
  CustomText,
  Input,
  Modal,
  Select,
  daysOfTheWeek,
  monthsName,
} from "@medlinked/components";
import { theme } from "@medlinked/config";
import { Bookmark, Circle, Pen, Square, Trash } from "lucide-react";
import { useState } from "react";
import {
  CalendarAndResultsContainer,
  CalendarFiltersContainer,
  CalendarLegendContainer,
  CalendarPageContainer,
  CalendarResultContentContainer,
  CardInfoContainer,
  ModalFieldsContainer,
  ResultsContainer,
  StyledForm,
} from "./styles";

export default function Page() {
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [day, setDay] = useState(new Date().getDate());
  const [monthFilter, setMonthFilter] = useState(new Date().getMonth() + 1);
  const [yearFilter, setYearFilter] = useState(new Date().getFullYear());
  const [openModal, setOpenModal] = useState(false);
  const [modalText, setModalText] = useState(0);

  return (
    <>
      <Modal
        title={
          modalText == 1
            ? "Novo agendamento"
            : modalText == 2
            ? "Visualizar agendamento"
            : "Confirmação"
        }
        open={openModal}
        setOpen={setOpenModal}
      >
        {(modalText == 1 || modalText == 2) && (
          <StyledForm>
            <Select
              options={[]}
              fullWidth
              placeholder="Selecione um médico *"
            />
            <Select
              options={[]}
              fullWidth
              placeholder="Selecione um paciente *"
            />
            <Input placeholder="Data *" fullWidth autoComplete="off" />
            <ModalFieldsContainer>
              <Input
                placeholder="Horário Início *"
                fullWidth
                autoComplete="off"
              />
              <Input placeholder="Horário Fim *" fullWidth autoComplete="off" />
            </ModalFieldsContainer>
            <Select
              options={[]}
              fullWidth
              placeholder="Selecione um tipo de consulta *"
            />
            <Select
              options={[]}
              fullWidth
              placeholder="Selecione um convênio *"
            />
            <Input
              placeholder="Descrição *"
              fullWidth
              maxLength={130}
              autoComplete="off"
            />
            <CustomText $weight={500}>* Campo Obrigatório</CustomText>
            <ModalFieldsContainer>
              <Button
                fullWidth
                textAlign="center"
                type="submit"
                // disabled={loading}
              >
                Cadastrar
              </Button>
            </ModalFieldsContainer>
          </StyledForm>
        )}
        {modalText == 3 && (
          <>
            <CustomText $align="center">
              Você realmente deseja deletar esse agendamento?
            </CustomText>
            <ModalFieldsContainer>
              <Button
                fullWidth
                textAlign="center"
                // onClick={() => handleDelete()}
              >
                Sim
              </Button>
              <Button
                fullWidth
                textAlign="center"
                onClick={() => setOpenModal(false)}
                color="red_80"
              >
                Não
              </Button>
            </ModalFieldsContainer>
          </>
        )}
      </Modal>
      <CalendarPageContainer>
        <CalendarFiltersContainer>
          <Button
            icon="Plus"
            fullWidth
            onClick={() => {
              setOpenModal(true);
              setModalText(1);
            }}
          >
            Agendamento
          </Button>
          <Select options={[]} fullWidth placeholder="Pesquise por médico" />
          <Select options={[]} fullWidth placeholder="Pesquise por paciente" />
          <CalendarLegendContainer>
            <CustomText $size="h3" $align="left">
              Legenda
            </CustomText>
            <CustomText $align="left">
              <Bookmark
                fill={theme.colors.yellow}
                color={theme.colors.yellow}
                size={15}
              />{" "}
              Dia/Mês com consulta marcada
            </CustomText>
            <CustomText $align="left">
              <Circle
                fill={theme.colors.red_80}
                color={theme.colors.red_80}
                size={15}
              />{" "}
              Dia/Mês atual
            </CustomText>
            <CustomText $align="left">
              <Square
                fill={theme.colors.blue_80}
                color={theme.colors.blue_80}
                size={15}
              />{" "}
              Dia/Mês selecionado
            </CustomText>
          </CalendarLegendContainer>
        </CalendarFiltersContainer>
        <CalendarAndResultsContainer>
          <Calendar
            year={year}
            setYear={setYear}
            month={month}
            setMonth={setMonth}
            day={day}
            setDay={setDay}
            monthFilter={monthFilter}
            setMonthFilter={setMonthFilter}
            yearFilter={yearFilter}
            setYearFilter={setYearFilter}
          />
          <CustomText $size="h2">
            {`${
              daysOfTheWeek[new Date(year, month - 1, day).getDay()]
            }, ${day} de ${monthsName[month - 1]} de ${year}`}
          </CustomText>
          <ResultsContainer>
            <Card>
              <CalendarResultContentContainer>
                <div>
                  <CardInfoContainer>
                    <CustomText $size="h2">08:30 - 09:00</CustomText>
                    <CustomText $size="h3" $weight={300}>
                      (Retorno)
                    </CustomText>
                  </CardInfoContainer>
                  <CardInfoContainer>
                    <CustomText $size="h3">Paciente</CustomText>
                    <CustomText $size="h3" $weight={300}>
                      Júlia
                    </CustomText>
                  </CardInfoContainer>
                  <CardInfoContainer>
                    <CustomText $size="h3">Médico</CustomText>
                    <CustomText $size="h3" $weight={300}>
                      Dr. Fulano
                    </CustomText>
                  </CardInfoContainer>
                </div>
                <div>
                  <Pen
                    onClick={() => {
                      setOpenModal(true);
                      setModalText(2);
                    }}
                  />
                  <Trash
                    onClick={() => {
                      setOpenModal(true);
                      setModalText(3);
                    }}
                  />
                </div>
              </CalendarResultContentContainer>
            </Card>
          </ResultsContainer>
        </CalendarAndResultsContainer>
      </CalendarPageContainer>
    </>
  );
}
