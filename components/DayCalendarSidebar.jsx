import { useState, useEffect } from "react";
import CalendarActionButtons from "./CalendarActionButtons";
import MiniCalendarDay from "./MiniCalendarDay";
import {
  today,
  generateMonthCalendarDays,
  addMonths,
  subtractMonths,
  formatMonth,
  isTheSameDay,
  isTheSameMonth
} from "../utils/dateUtils";

export default function DayCalendarSidebar({ date, onDateChange, handleOpenEntryForm }) {
  const [miniCalendarDate, setMiniCalendarDate] = useState(today);

  const miniCalendarDays = generateMonthCalendarDays(miniCalendarDate);
  const miniCalendarDayComponents = miniCalendarDays.map((calendarDay) => (
    <MiniCalendarDay
    key={calendarDay.getTime()}
    day={calendarDay}
    currentDate={miniCalendarDate}
    onClick={() => onDateChange(calendarDay)}
    isToday={isTheSameDay(calendarDay, today())}
    isSelected={isTheSameDay(calendarDay, date)}
     />
  ));

  useEffect(() => {
    if (!isTheSameMonth(date, miniCalendarDate)) {
      setMiniCalendarDate(date);
    }
  }, [date]);

  return (
    <div className="flex  w-[90%] max-w-sm lg:w-[280px] flex-col rounded-[10px]">
      <div
        className="flex h-auto w-full flex-col rounded-[10px] bg-gray-800/30"
      >
        <div
          className="flex h-[40px] w-full items-center justify-between p-4"
        >
          <div className="text-base sm:text-lg lg:text-2xl">
            {formatMonth(miniCalendarDate)}
          </div>

          <div className="flex items-center space-x-6">
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

        <div className="w-full px-2 mb-2">
          <ul className="grid grid-cols-7 gap-0 lg:gap-1">{miniCalendarDayComponents}</ul>
        </div>
      </div>

      <footer className="mt-4 lg:flex w-full space-x-2 hidden">
        <CalendarActionButtons handleOpenEntryForm={handleOpenEntryForm} />
      </footer>
    </div>
  );
}
