import { useState } from "react";
import MonthCalendarDay from "./MonthCalendarDay";
import CalendarActionButtons from "./CalendarActionButtons";
import { generateMonthCalendarDays, isTheSameMonth } from "../utils/dateUtils";
import { calculateDateTotals } from "../utils/calculator";

export default function MonthCalendar({
  date,
  onDateChange,
  onViewChange,
  handleOpenEntryForm,
  entries,
}) {
  const calendarDays = generateMonthCalendarDays(date);
  const calendarDaysComponents = calendarDays.map((calendarDay) => (
    <MonthCalendarDay
      key={calendarDay.getTime()}
      day={calendarDay}
      currentDate={date}
      onDateChange={onDateChange}
      onViewChange={onViewChange}
      entries={entries}
    />
  ));

  const monthEntries = entries.filter((entry) =>
    isTheSameMonth(entry.date, date),
  );

  const monthTotals = calculateDateTotals(monthEntries)
  const monthBalance = monthTotals.incomeTotal - monthTotals.expenseTotal


  return (
    <div className="mx-auto mt-8 flex w-[981px] flex-col items-center justify-between">
      <div className="top-0 h-[30px] w-full">
        <ul className="grid grid-cols-7 gap-1 text-xl font-light text-white/50">
          <li className="w-[135px] flex-1 text-center">Sun</li>
          <li className="w-[135px] flex-1 text-center">Mon</li>
          <li className="w-[135px] flex-1 text-center">Tue</li>
          <li className="w-[135px] flex-1 text-center">Wed</li>
          <li className="w-[135px] flex-1 text-center">Thu</li>
          <li className="w-[135px] flex-1 text-center">Fri</li>
          <li className="w-[135px] flex-1 text-center">Sat</li>
        </ul>
      </div>

      <div className="w-full flex-1">
        <ul className="grid grid-cols-7 gap-1">{calendarDaysComponents}</ul>
      </div>

      <footer className="mt-5 flex h-[62px] w-full justify-between">
        <CalendarActionButtons handleOpenEntryForm={handleOpenEntryForm} />

        <div className="flex h-full items-center justify-between space-x-6 rounded-[10px] border border-white/10 bg-white/10 px-5">
          <span className="text-3xl font-bold">月結餘</span>
          <span className={`text-5xl font-bold ${monthBalance < 0 ? "text-gray-400" : "text-blue-400"}`}>{monthBalance}</span>
        </div>
      </footer>
    </div>
  );
}
