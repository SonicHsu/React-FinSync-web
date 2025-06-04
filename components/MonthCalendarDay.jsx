import { today, isTheSameDay, isTheSameMonth } from "../utils/dateUtils";
import { getDayEntriesAndTotals } from "../utils/calculator";


export default function MonthCalendarDay({ day, currentDate, onDateChange, onViewChange, entries, }) {

  const {dayEntries, expenseTotal , incomeTotal} = getDayEntriesAndTotals(entries, day)

  const handelCalendarDayClick = () => {
    onDateChange(day)
    onViewChange("Day")
  }

  return (
    <li
      className={`h-[95px] w-[135px] ${isTheSameMonth(day, currentDate) ? "" : "opacity-25"}`}

    >
      <button
        className={`flex h-full w-full flex-col items-center rounded-[10px] hover:bg-white/20 cursor-pointer
          ${isTheSameDay(day, today()) ? "calendar-today" : "calendar-normal"}`}
        onClick={handelCalendarDayClick} 
      >
        <div className="top-0 flex h-[35px] w-full items-center justify-between rounded-t-[10px] bg-gray-800/50 px-2">
          <span className="text-3xl font-bold">
            {day.getDate()}
          </span>
          <span
            className="flex h-[24px] w-[24px] items-center justify-center rounded-full bg-white/70 text-sm font-bold text-gray-800"
          >
            {dayEntries.length}
          </span>
        </div>

        <div className="flex grow flex-col justify-evenly">
          {expenseTotal > 0 && <div className="flex h-[20px] w-[120px] items-center justify-center rounded-full bg-gray-400/50 pt-0.5 text-center text-xl">
            {expenseTotal}
          </div>}
          {incomeTotal > 0 && <div className="flex h-[20px] w-[120px] items-center justify-center rounded-full bg-sky-400/50 pt-0.5 text-center text-xl">
            {incomeTotal}
          </div>}
        </div>
      </button>
    </li>
  );
}
