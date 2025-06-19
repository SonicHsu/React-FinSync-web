import React from "react";
import MonthCalendarDay from "./MonthCalendarDay";
import CalendarActionButtons from "./CalendarActionButtons";
import { generateMonthCalendarDays, isTheSameMonth } from "../../utils/dateUtils";
import { calculateDateTotals } from "../../utils/calculator";

import { useEntryContext } from "../../contexts/entryContext";

export default function MonthCalendar() {
  const { currentDate, entries } = useEntryContext();

  // 根據 currentDate 產生月曆用的日期陣列（含補足前後空白日期）
  const calendarDays: Date[] = generateMonthCalendarDays(currentDate);

  // 將每個日曆日期轉成 MonthCalendarDay 元件
  const calendarDaysComponents: React.JSX.Element[] = calendarDays.map(
    (calendarDay) => (
      <MonthCalendarDay key={calendarDay.getTime()} day={calendarDay} />
    ),
  );

  // 篩選出當月所有交易資料
  const monthEntries = entries.filter((entry) =>
    isTheSameMonth(entry.date, currentDate),
  );

   // 計算當月收支總額
  const monthTotals = calculateDateTotals(monthEntries);

   // 月結餘：收入總額 - 支出總額
  const monthBalance = monthTotals.incomeTotal - monthTotals.expenseTotal;

  return (
    <div className="mx-auto mt-8 flex w-[90%] flex-col items-center justify-between lg:w-[981px]">

      {/* 星期標題列 */}
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

       {/* 月曆主體（日期格子） */}
      <div className="w-full flex-1">
        <ul className="grid grid-cols-7 gap-1">{calendarDaysComponents}</ul>
      </div>

      {/* 底部：按鈕 + 月結餘顯示 */}
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
