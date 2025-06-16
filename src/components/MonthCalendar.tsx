import React from "react";
import MonthCalendarDay from "./MonthCalendarDay";
import CalendarActionButtons from "./CalendarActionButtons";
import { generateMonthCalendarDays, isTheSameMonth } from "../utils/dateUtils";
import { calculateDateTotals } from "../utils/calculator";

import { useEntryContext } from "../contexts/entryContext";

export default function MonthCalendar() {
  const { currentDate, entries } = useEntryContext();

  const calendarDays: Date[] = generateMonthCalendarDays(currentDate);
  const calendarDaysComponents: React.JSX.Element[] = calendarDays.map(
    (calendarDay) => (
      <MonthCalendarDay key={calendarDay.getTime()} day={calendarDay} />
    ),
  );

  const monthEntries = entries.filter((entry) =>
    isTheSameMonth(entry.date, currentDate),
  );

  const monthTotals = calculateDateTotals(monthEntries);
  const monthBalance = monthTotals.incomeTotal - monthTotals.expenseTotal;

  return (
    <div className="mx-auto mt-8 flex w-[90%] flex-col items-center justify-between lg:w-[981px]">
      <div className="top-0 h-[30px] w-full">
        <ul className="grid grid-cols-7 gap-1 text-xl font-light text-white/50">
          <li className="w-auto flex-1 text-center lg:w-[135px]">Sun</li>
          <li className="w-auto flex-1 text-center lg:w-[135px]">Mon</li>
          <li className="w-auto flex-1 text-center lg:w-[135px]">Tue</li>
          <li className="w-auto flex-1 text-center lg:w-[135px]">Wed</li>
          <li className="w-auto flex-1 text-center lg:w-[135px]">Thu</li>
          <li className="w-auto flex-1 text-center lg:w-[135px]">Fri</li>
          <li className="w-auto flex-1 text-center lg:w-[135px]">Sat</li>
        </ul>
      </div>

      <div className="w-full flex-1">
        <ul className="grid grid-cols-7 gap-1">{calendarDaysComponents}</ul>
      </div>

      <footer className="mt-5 flex h-[62px] w-full justify-between">
        <CalendarActionButtons />

        <div className="flex h-full items-center justify-between space-x-6 rounded-[10px] border border-white/10 bg-white/10 px-5">
          <span className="text-2xl font-bold lg:text-3xl">月結餘</span>
          <span
            className={`text-4xl font-bold lg:text-5xl ${monthBalance < 0 ? "text-gray-400" : "text-blue-400"}`}
          >
            {monthBalance}
          </span>
        </div>
      </footer>
    </div>
  );
}
