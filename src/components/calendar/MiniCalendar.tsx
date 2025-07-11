import React, { useState, useEffect } from "react";
import MiniCalendarDay from "./MiniCalendarDay";
import {
  today,
  generateMonthCalendarDays,
  addMonths,
  subtractMonths,
  formatMonth,
  isTheSameDay,
  isTheSameMonth,
} from "../../utils/dateUtils";
import { useEntryContext } from "../../contexts/entryContext";

export default function MiniCalendar() {
  const { currentDate, setCurrentDate } = useEntryContext();

  // 控制 MiniCalendar 當前顯示月份
  const [miniCalendarDate, setMiniCalendarDate] = useState<Date>(today);

  // 產生當月日曆格子用的日期陣列
  const miniCalendarDays: Date[] = generateMonthCalendarDays(miniCalendarDate);

  // 每天產出對應元件
  const miniCalendarDayComponents: React.JSX.Element[] = miniCalendarDays.map(
    (calendarDay) => (
      <MiniCalendarDay
        key={calendarDay.getTime()}
        day={calendarDay}
        currentDate={miniCalendarDate}
        onClick={() => setCurrentDate(calendarDay)}
        isToday={isTheSameDay(calendarDay, today())}
        isSelected={isTheSameDay(calendarDay, currentDate)}
      />
    ),
  );

  // 若全域 currentDate 不在當前顯示月份，切換 miniCalendarDate 同步顯示
  useEffect(() => {
    if (!isTheSameMonth(currentDate, miniCalendarDate)) {
      setMiniCalendarDate(currentDate);
    }
  }, [currentDate]);

  return (
    <>
      <div className="flex h-auto w-full flex-col rounded-[10px] bg-gray-800/30">
        <div className="flex h-[40px] w-full items-center justify-between p-4">
          <div className="text-base sm:text-lg lg:text-2xl">
            {formatMonth(miniCalendarDate)}
          </div>

          <div className="flex items-center space-x-6">
            {/* 上個月按鈕 */}
            <button
              className="cursor-pointer"
              onClick={() =>
                setMiniCalendarDate((prevDate) => subtractMonths(prevDate, 1))
              }
            >
              <svg
                width="10"
                height="18"
                viewBox="0 0 10 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8.75 16.5L1.25 9L8.75 1.5"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            {/* 下個月按鈕 */}
            <button
              className="cursor-pointer"
              onClick={() =>
                setMiniCalendarDate((prevDate) => addMonths(prevDate, 1))
              }
            >
              <svg
                width="10"
                height="18"
                viewBox="0 0 10 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1.25 16.5L8.75 9L1.25 1.5"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* 星期標題 */}
        <div className="w-full px-2">
          <ul className="grid grid-cols-7 gap-1 text-white/50">
            <li className="mini-calendar-item">S</li>
            <li className="mini-calendar-item">M</li>
            <li className="mini-calendar-item">T</li>
            <li className="mini-calendar-item">W</li>
            <li className="mini-calendar-item">T</li>
            <li className="mini-calendar-item">F</li>
            <li className="mini-calendar-item">S</li>
          </ul>
        </div>

        {/* 日曆格子 */}
        <div className="mb-2 w-full px-2">
          <ul className="grid grid-cols-7 gap-0 lg:gap-1">
            {miniCalendarDayComponents}
          </ul>
        </div>
      </div>
    </>
  );
}
