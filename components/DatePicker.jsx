import { useState } from "react";
import ArrowButton from "./ArrowButton";
import DateBox from "./DateBox";
import {
  addMonths,
  subtractMonths,
  addDays,
  subtractDays,
  today,
} from "../utils/dateUtils";

export default function DatePicker({ isStatsPage, currentView, currentDate, onDateChange }) {
  const [openMode, setOpenMode] = useState(null);

  const handleDateChange = (date) => {
    onDateChange(date);
    setOpenMode(null);
  };

  const handleLeftClick = () => {
    onDateChange((prevDate) =>
      currentView === "Day"
        ? subtractDays(prevDate, 1)
        : subtractMonths(prevDate, 1),
    );
  };

  const handleRightClick = () => {
    onDateChange((prevDate) =>
      currentView === "Day" ? addDays(prevDate, 1) : addMonths(prevDate, 1),
    );
  };

  return (
    <div className="flex items-center space-x-2">
      <div className="relative flex items-center space-x-1">
        {!isStatsPage &&<div className="hidden lg:flex">
          <DateBox
          type="today"
          value="Today"
          onClick={() => onDateChange(today)}
        />
        </div> }

        <DateBox
          type="year"
          value={currentDate.getFullYear()}
          onClick={() => setOpenMode("year")}
          currentDate={currentDate}
          mode={openMode}
          handleDateChange={handleDateChange}
          setOpenMode={setOpenMode}
        />

        {currentView !== "Year" && <DateBox
          type="month"
          value={String(currentDate.getMonth() + 1).padStart(2, "0")}
          onClick={() => setOpenMode("month")}
          currentDate={currentDate}
          mode={openMode}
          handleDateChange={handleDateChange}
          setOpenMode={setOpenMode}
        />}

        {currentView === "Day" && (
          <DateBox
            type="date"
            value={String(currentDate.getDate()).padStart(2, "0")}
            onClick={() => setOpenMode("date")}
            currentDate={currentDate}
            mode={openMode}
            handleDateChange={handleDateChange}
            setOpenMode={setOpenMode}
          />
        )}

        {currentView === "Day" && (
          <span className="hidden lg:flex w-12 text-center text-2xl font-medium text-white/50">
            {currentDate.toLocaleDateString("en-US", { weekday: "short" })}
          </span>
        )}
      </div>

      <ArrowButton direction="left" onClick={handleLeftClick} />
      <ArrowButton direction="right" onClick={handleRightClick} />
    </div>
  );
}
