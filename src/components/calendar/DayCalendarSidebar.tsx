import CalendarActionButtons from "./CalendarActionButtons";
import MiniCalendar from "./MiniCalendar";

export default function DayCalendarSidebar() {
  return (
    <div className="flex w-[90%] max-w-sm min-w-[250px] flex-col rounded-[10px] sm:w-[280px]">
      <MiniCalendar />

      <footer className="mt-4 hidden w-full space-x-2 sm:flex lg:flex">
        <CalendarActionButtons />
      </footer>
    </div>
  );
}
