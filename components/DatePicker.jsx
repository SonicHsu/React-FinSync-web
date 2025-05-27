import { useRef, useState } from "react";
import ArrowButton from "./ArrowButton";
import DateBox from "./DateBox";
import {
  addMonths,
  subtractMonths,
  addDays,
  subtractDays,
  today,
} from "../utils/dateUtils";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function DatePicker({ currentView, currentDate, onDateChange }) {
  const [openMode, setOpenMode] = useState(null);
  const datePickerRef = useRef(null);

  const handleDateChange = (date) => {
    onDateChange(date);
    setOpenMode(null); // 選完自動關閉
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
        <DateBox value="Today" onClick={() => onDateChange(today)} />

        <div className="relative">
          <DateBox
            value={currentDate.getFullYear()}
            onClick={() => setOpenMode("year")}
          />
          {openMode === "year" && (
            <div className="absolute top-full left-0 z-50 mt-2 w-[150px]">
              <ReactDatePicker
                selected={currentDate}
                onChange={handleDateChange}
                onClickOutside={() => setOpenMode(null)}
                showYearPicker={true}
                open
                inline
              />
            </div>
          )}
        </div>

        <div className="relative">
          <DateBox
            value={String(currentDate.getMonth() + 1).padStart(2, "0")}
            onClick={() => setOpenMode("month")}
          />
          {openMode === "month" && (
            <div className="absolute top-full left-0 z-50 mt-2 w-[150px]">
              <ReactDatePicker
                selected={currentDate}
                onChange={handleDateChange}
                onClickOutside={() => setOpenMode(null)}
                showMonthYearPicker={true}
                open
                inline
              />
            </div>
          )}
        </div>

        {currentView === "Day" && (
          <div className="relative">
            <DateBox
              value={String(currentDate.getDate()).padStart(2, "0")}
              onClick={() => setOpenMode("day")}
            />
            {openMode === "day" && (
              <div className="absolute top-full left-1/2 z-50 mt-2 -translate-x-1/2 transform">
                <ReactDatePicker
                  selected={currentDate}
                  onChange={handleDateChange}
                  onClickOutside={() => setOpenMode(null)}
                  open
                  inline
                />
              </div>
            )}
          </div>
        )}

        {currentView === "Day" && (
          <span className="w-12 text-center text-2xl font-medium text-white/50">
            {currentDate.toLocaleDateString("en-US", { weekday: "short" })}
          </span>
        )}
      </div>

      <ArrowButton
        direction="left"
        onClick={handleLeftClick}
      />
      <ArrowButton
        direction="right"
        onClick={handleRightClick}
      />
    </div>
  );
}
