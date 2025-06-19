import { today, isTheSameDay, isTheSameMonth } from "../../utils/dateUtils";
import { getDayEntriesAndTotals } from "../../utils/calculator";
import { useEntryContext } from "../../contexts/entryContext";

export default function MonthCalendarDay({ day }: { day: Date }) {
  const { currentDate, setCurrentDate, setCalendarView, entries } =
    useEntryContext();

  // 取得該日期的所有交易資料與收支總額  
  const { dayEntries, expenseTotal, incomeTotal } = getDayEntriesAndTotals(
    entries,
    day,
  );

  // 點擊日期格子：切換當前日期並切換到日曆日檢視
  const handelCalendarDayClick = () => {
    setCurrentDate(day);
    setCalendarView("Day");
  };

  return (
    <li
      className={`sm:h-[80px] lg:h-[95px] lg:w-[135px] ${isTheSameMonth(day, currentDate) ? "" : "opacity-25"}`}
      // 非當月的日期格會顯示透明度降低
    >
      <button
        className={`flex h-full w-full cursor-pointer flex-col items-center rounded-[10px] hover:bg-white/20 ${isTheSameDay(day, today()) ? "calendar-today" : "calendar-normal"}`}
        onClick={handelCalendarDayClick}
      >

        {/* 日期與筆數顯示 */}
        <div className="top-0 flex h-[35px] w-full items-center justify-between rounded-t-[10px] bg-gray-800/50 px-2">
          <span className="text-xl font-bold lg:text-3xl">{day.getDate()}</span>
          <span className="flex h-[24px] w-[24px] items-center justify-center rounded-full bg-white/70 text-sm font-bold text-gray-800">
            {dayEntries.length}
          </span>
        </div>


        {/* 收支統計顯示 */}
        <div className="flex w-full grow flex-col items-center justify-evenly">
          {expenseTotal > 0 && (
            <div className="flex h-[18px] w-full items-center justify-center rounded-full bg-gray-400/50 py-0.5 text-center text-base lg:h-[20px] lg:w-[120px] lg:text-xl">
              {expenseTotal}
            </div>
          )}
          {incomeTotal > 0 && (
            <div className="flex h-[18px] w-full items-center justify-center rounded-full bg-sky-400/50 py-0.5 text-center text-base lg:h-[20px] lg:w-[120px] lg:text-xl">
              {incomeTotal}
            </div>
          )}
        </div>
      </button>
    </li>
  );
}
