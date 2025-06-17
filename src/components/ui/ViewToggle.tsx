import { useEntryContext } from "../../contexts/entryContext";


export default function ViewToggle() {

  const { calendarView, setCalendarView } = useEntryContext();

  return (
    <div className="flex h-full w-[160px] lg:w-[250px] items-center justify-center rounded-full bg-gray-400/50 font-semibold">
      <button
        className={`${calendarView === "Day" ? "button-option-selected" : "button-option"}`}
        onClick={() =>  setCalendarView("Day")}
      >
        Day
      </button>
      <button
        className={`${calendarView === "Month" ? "button-option-selected" : "button-option"}`}
        onClick={() =>  setCalendarView("Month")}
      >
        Month
      </button>
    </div>
  );
}
