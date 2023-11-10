"use client";

import { theme } from "@medlinked/config";
import { AgendamentoResponse } from "@medlinked/types";
import { Bookmark, ChevronLeft, ChevronRight, Circle } from "lucide-react";
import { Dispatch, SetStateAction, useMemo, useState } from "react";
import { CustomText, Spacing, Tabs } from "..";
import {
  CalendarContainer,
  CalendarOptionsContainer,
  DayMonthContainer,
  DaysGridContainer,
  IconsContainer,
  MonthYearContainer,
  MonthsGridContainer,
} from "./styles";

type CalendarProps = {
  year: number;
  setYear: Dispatch<SetStateAction<number>>;
  month: number;
  setMonth: Dispatch<SetStateAction<number>>;
  day: number;
  setDay: Dispatch<SetStateAction<number>>;
  monthFilter: number;
  setMonthFilter: Dispatch<SetStateAction<number>>;
  yearFilter: number;
  setYearFilter: Dispatch<SetStateAction<number>>;
  scheduledDates?: AgendamentoResponse;
};

export const monthsName = [
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro",
];

export const daysOfTheWeek = [
  "Domingo",
  "Segunda-feira",
  "Terça-feira",
  "Quarta-feira",
  "Quinta-feira",
  "Sexta-feira",
  "Sábado",
];

const tabsItems = [
  {
    id: 1,
    label: "Mês",
  },
  {
    id: 2,
    label: "Ano",
  },
];

export function Calendar({
  year,
  setYear,
  month,
  setMonth,
  day,
  setDay,
  monthFilter,
  setMonthFilter,
  yearFilter,
  setYearFilter,
  scheduledDates = [],
}: CalendarProps) {
  const [currentItem, setCurrentItem] = useState(1);
  const today = new Date();

  function getDaysInMonth(year: number, month: number) {
    return new Date(year, month, 0).getDate();
  }

  const days: number[] = useMemo(() => {
    const content = [];
    for (let i = 1; i <= getDaysInMonth(yearFilter, monthFilter); i++) {
      content.push(i);
    }

    return content;
  }, [getDaysInMonth(yearFilter, monthFilter)]);

  return (
    <CalendarContainer>
      <Spacing>
        <CalendarOptionsContainer>
          <MonthYearContainer>
            <ChevronLeft
              size={30}
              onClick={() => {
                if (currentItem == 1) {
                  if (monthFilter > 1) setMonthFilter(monthFilter - 1);
                  else {
                    setMonthFilter(12);
                    setYearFilter(yearFilter - 1);
                  }
                } else setYearFilter(yearFilter - 1);
              }}
            />
            <ChevronRight
              size={30}
              onClick={() => {
                if (currentItem == 1) {
                  if (monthFilter < 12) setMonthFilter(monthFilter + 1);
                  else {
                    setMonthFilter(1);
                    setYearFilter(yearFilter + 1);
                  }
                } else setYearFilter(yearFilter + 1);
              }}
            />
            <CustomText $size="h2">
              {currentItem == 1 && monthsName[monthFilter - 1] + " de "}
              {yearFilter}
            </CustomText>
          </MonthYearContainer>
          <Tabs
            items={tabsItems}
            currentItemId={currentItem}
            changeCurrentItemId={setCurrentItem}
          />
        </CalendarOptionsContainer>
      </Spacing>
      {currentItem == 1 ? (
        <DaysGridContainer>
          {days.map((currentDay) => (
            <DayMonthContainer
              key={currentDay}
              $selectable
              onClick={() => {
                setDay(currentDay);
                if (month != monthFilter) setMonth(monthFilter);
                if (year != yearFilter) setYear(yearFilter);
              }}
              $selected={
                currentDay == day && month == monthFilter && year == yearFilter
              }
            >
              <CustomText>{currentDay}</CustomText>
              <IconsContainer>
                {today.toDateString() ==
                  new Date(
                    yearFilter,
                    monthFilter - 1,
                    currentDay,
                  ).toDateString() && (
                  <Circle
                    fill={theme.colors.red_80}
                    color={theme.colors.red_80}
                    size={15}
                  />
                )}
                {scheduledDates.find(
                  (date) =>
                    new Date(
                      date.dataHoraInicioAgendamento.slice(0, 10),
                    ).toDateString() ==
                      new Date(
                        yearFilter,
                        monthFilter - 1,
                        currentDay - 1,
                      ).toDateString() && date.tipoAgendamento != "AUTOMATICO",
                ) != undefined && (
                  <Bookmark
                    fill={theme.colors.yellow}
                    color={theme.colors.yellow}
                    size={15}
                  />
                )}
                {scheduledDates.find(
                  (date) =>
                    new Date(
                      date.dataHoraInicioAgendamento.slice(0, 10),
                    ).toDateString() ==
                      new Date(
                        yearFilter,
                        monthFilter - 1,
                        currentDay - 1,
                      ).toDateString() && date.tipoAgendamento == "AUTOMATICO",
                ) != undefined && (
                  <Bookmark
                    fill={theme.colors.green}
                    color={theme.colors.green}
                    size={15}
                  />
                )}
              </IconsContainer>
            </DayMonthContainer>
          ))}
        </DaysGridContainer>
      ) : (
        <MonthsGridContainer>
          {monthsName.map((currentMonth, index) => (
            <DayMonthContainer
              key={index}
              $selectable
              onClick={() => {
                setMonthFilter(index + 1);
                setCurrentItem(1);
              }}
              $selected={index + 1 == month && year == yearFilter}
            >
              <CustomText>{currentMonth}</CustomText>
              <IconsContainer>
                {today.toDateString() ==
                  new Date(
                    yearFilter,
                    index,
                    today.getDate(),
                  ).toDateString() && (
                  <Circle
                    fill={theme.colors.red_80}
                    color={theme.colors.red_80}
                    size={15}
                  />
                )}
                {scheduledDates.find(
                  (date) =>
                    Number(date.dataHoraInicioAgendamento.slice(5, 7)) ==
                      index + 1 &&
                    Number(date.dataHoraInicioAgendamento.slice(0, 4)) ==
                      yearFilter &&
                    date.tipoAgendamento != "AUTOMATICO",
                ) != undefined && (
                  <Bookmark
                    fill={theme.colors.yellow}
                    color={theme.colors.yellow}
                    size={15}
                  />
                )}
                {scheduledDates.find(
                  (date) =>
                    Number(date.dataHoraInicioAgendamento.slice(5, 7)) ==
                      index + 1 &&
                    Number(date.dataHoraInicioAgendamento.slice(0, 4)) ==
                      yearFilter &&
                    date.tipoAgendamento == "AUTOMATICO",
                ) != undefined && (
                  <Bookmark
                    fill={theme.colors.green}
                    color={theme.colors.green}
                    size={15}
                  />
                )}
              </IconsContainer>
            </DayMonthContainer>
          ))}
        </MonthsGridContainer>
      )}
    </CalendarContainer>
  );
}
