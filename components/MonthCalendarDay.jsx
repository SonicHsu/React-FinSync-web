export default function MonthCalendarDay({ day, currentDate }) {
  const currentMonth = currentDate.getMonth();

  return (
    <li
      className={`h-[95px] w-[135px] ${day.getMonth() !== currentMonth ? "opacity-25" : ""}`}
      data-month-calendar-day
    >
      <button
        className="flex h-full w-full flex-col items-center rounded-[10px] hover:bg-white/20"
        data-month-calendar-day-label
      >
        <div className="top-0 flex h-[35px] w-full items-center justify-between rounded-t-[10px] bg-gray-800/50 px-2">
          <span className="text-3xl font-bold" data-day-number>
            {day.getDate()}
          </span>
          <span
            className="flex h-[24px] w-[24px] items-center justify-center rounded-full bg-white/70 text-sm font-bold text-gray-800"
            data-day-entry-count
          >
            13
          </span>
        </div>

        <div className="flex grow flex-col justify-evenly" data-day-summary>
          <div className="flex h-[20px] w-[120px] items-center justify-center rounded-full bg-gray-400/50 pt-0.5 text-center text-xl">
            500
          </div>
          <div className="flex h-[20px] w-[120px] items-center justify-center rounded-full bg-sky-400/50 pt-0.5 text-center text-xl">
            100
          </div>
        </div>
      </button>
    </li>
  );
}
