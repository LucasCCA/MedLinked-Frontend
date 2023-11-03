"use client";

import {
  Button,
  Calendar,
  CustomText,
  Select,
  Spacing,
} from "@medlinked/components";
import { useState } from "react";
import { CalendarFiltersContainer, CalendarPageContainer } from "./styles";

export default function Page() {
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [day, setDay] = useState(new Date().getDate());
  const [monthFilter, setMonthFilter] = useState(new Date().getMonth() + 1);
  const [yearFilter, setYearFilter] = useState(new Date().getFullYear());

  return (
    <CalendarPageContainer>
      <CalendarFiltersContainer>
        <Button icon="Plus" fullWidth>
          Agendamento
        </Button>
        <Select options={[]} fullWidth />
        <Select options={[]} fullWidth />
        <Spacing>
          <CustomText $size="h3" $align="left">
            Legenda
          </CustomText>
        </Spacing>
      </CalendarFiltersContainer>
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
    </CalendarPageContainer>
  );
}
