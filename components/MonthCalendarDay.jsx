import { isTheSameDay } from "../utils/dateUtils";
import { useDayTotals } from "../hooks/useTotals";


export default function MonthCalendarDay({ day, currentDate, onDateChange, onViewChange, entries, }) {
  const currentMonth = currentDate.getMonth();
    const dayEntries = entries.filter((entry) =>
    isTheSameDay(entry.date, day),
  );

  const { dayExpenseTotal , dayIncomeTotal } = useDayTotals(dayEntries)

  const handelCalendarDayClick = () => {
    onDateChange(day)
    onViewChange("Day")
  }

  return (
    <li
      className={`h-[95px] w-[135px] ${day.getMonth() !== currentMonth ? "opacity-25" : ""}`}

    >
      <button
        className="flex h-full w-full flex-col items-center rounded-[10px] hover:bg-white/20 cursor-pointer"
        onClick={handelCalendarDayClick} 
      >
        <div className="top-0 flex h-[35px] w-full items-center justify-between rounded-t-[10px] bg-gray-800/50 px-2">
          <span className="text-3xl font-bold" data-day-number>
            {day.getDate()}
          </span>
          <span
            className="flex h-[24px] w-[24px] items-center justify-center rounded-full bg-white/70 text-sm font-bold text-gray-800"
            data-day-entry-count
          >
            {dayEntries.length}
          </span>
        </div>

        <div className="flex grow flex-col justify-evenly" data-day-summary>
          {dayExpenseTotal > 0 && <div className="flex h-[20px] w-[120px] items-center justify-center rounded-full bg-gray-400/50 pt-0.5 text-center text-xl">
            {dayExpenseTotal}
          </div>}
          {dayIncomeTotal > 0 && <div className="flex h-[20px] w-[120px] items-center justify-center rounded-full bg-sky-400/50 pt-0.5 text-center text-xl">
            {dayIncomeTotal}
          </div>}
        </div>
      </button>
    </li>
  );
}
