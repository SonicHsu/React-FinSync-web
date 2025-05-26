import { useRef } from "react";
import ArrowButton from "./ArrowButton";
import DateBox from "./DateBox";
import { addDays, subtractDays, today } from "../utils/dateUtils";

export default function DatePicker({ currentDate, onDateChange }) {
  const dateInputRef = useRef(null);
  console.log(dateInputRef);

  return (
    <div className="flex items-center space-x-2">
      <div className="relative flex items-center space-x-1">
        <DateBox value="Today" onClick={() => onDateChange(today)} />
        <DateBox
          value={currentDate.getFullYear()}
          onClick={() => dateInputRef.current?.click()}
        />
        <DateBox
          value={String(currentDate.getMonth() + 1).padStart(2, "0")}
          onClick={() => console.log(dateInputRef)}
        />
        <DateBox
          value={String(currentDate.getDate()).padStart(2, "0")}
          onClick={() => dateInputRef.current?.click()}
        />

        <input
          type="date"
          className="absolute opacity-0 inset-0 w-full h-full z-10 cursor-pointer"
          ref={dateInputRef}
          onClick={() => console.log('input clicked')}
        />

        <span className="w-12 text-center text-2xl font-medium text-white/50">
          Mon
        </span>
      </div>

      <ArrowButton
        direction="left"
        onClick={() => onDateChange((prevDate) => subtractDays(prevDate, 1))}
      />
      <ArrowButton
        direction="right"
        onClick={() => onDateChange((prevDate) => addDays(prevDate, 1))}
      />
    </div>
  );
}
