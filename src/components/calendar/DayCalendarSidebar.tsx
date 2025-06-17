import CalendarActionButtons from "./CalendarActionButtons";
import MiniCalendar from "./MiniCalendar";

export default function DayCalendarSidebar() {
  
  return (
    <div className="flex  w-[90%] max-w-sm min-w-[250px] sm:w-[280px] flex-col rounded-[10px]">
       <MiniCalendar />

      <footer className="mt-4 lg:flex w-full space-x-2 hidden sm:flex">
        <CalendarActionButtons />
      </footer>
    </div>
  );
}
