import { useState } from "react";
import ArrowButton from "./ArrowButton";
import DateBox from "./DateBox";
import {
  addMonths,
  subtractMonths,
  addDays,
  subtractDays,
  today,
} from "../../utils/dateUtils";

import { useEntryContext } from "../../contexts/entryContext";

type DatePickerProps = {
  isStatsPage: boolean;
};

type DateMode = "year" | "month" | "date" | null;

export default function DatePicker({ isStatsPage }: DatePickerProps) {
  const { calendarView, currentDate, setCurrentDate } = useEntryContext();
  const [openMode, setOpenMode] = useState<DateMode>(null);

  const handleDateChange = (date: Date | null) => {
      if (!date) {
    return; 
  }

    setCurrentDate(date);
    setOpenMode(null);
  };

  const handleLeftClick = () => {
    setCurrentDate((prevDate) =>
      calendarView === "Day"
        ? subtractDays(prevDate, 1)
        : subtractMonths(prevDate, 1),
    );
  };

  const handleRightClick = () => {
    setCurrentDate((prevDate) =>
      calendarView === "Day" ? addDays(prevDate, 1) : addMonths(prevDate, 1),
    );
  };

  return (
    <div className="flex items-center space-x-1 lg:space-x-2">
      <div className="relative flex items-center space-x-0.5 sm:space-x-1">
        {!isStatsPage && (
          <div className="hidden lg:flex">
            <div className="relative">
              <div
                onClick={() => setCurrentDate(today)}
                className="flex h-[38px] cursor-pointer items-center justify-center rounded-[10px] border border-blue-400/50 bg-white/10 px-2 text-xl hover:bg-blue-400/50 sm:text-2xl lg:text-3xl"
              >
                Today
              </div>
            </div>
          </div>
        )}

        <DateBox
          type="year"
          onClick={() => setOpenMode("year")}
          currentDate={currentDate}
          mode={openMode}
          setOpenMode={setOpenMode}
          handleDateChange={handleDateChange}
        />

        {calendarView !== "Year" && (
          <DateBox
            type="month"
            onClick={() => setOpenMode("month")}
            currentDate={currentDate}
            mode={openMode}
            setOpenMode={setOpenMode}
            handleDateChange={handleDateChange}
          />
        )}

        {calendarView === "Day" && (
          <DateBox
            type="date"
            onClick={() => setOpenMode("date")}
            currentDate={currentDate}
            mode={openMode}
            setOpenMode={setOpenMode}
            handleDateChange={handleDateChange}
          />
        )}

        {calendarView === "Day" && (
          <span className="hidden w-12 text-center text-2xl font-medium text-white/50 lg:flex">
            {currentDate.toLocaleDateString("en-US", { weekday: "short" })}
          </span>
        )}
      </div>

      <ArrowButton direction="left" onClick={handleLeftClick} />
      <ArrowButton direction="right" onClick={handleRightClick} />
    </div>
  );
}
