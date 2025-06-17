import DayCalendarSidebar from "./DayCalendarSidebar";
import DayEntryList from "./DayEntryList";

export default function DayCalendar() {
  return (
    <div className="flex flex-col items-center text-white flex-grow min-h-0">
      <div className="mx-auto mt-2 flex w-full max-w-[981px] flex-grow min-h-0 flex-col items-center justify-start sm:mt-4 sm:flex-row sm:items-start sm:justify-between sm:w-[90%] lg:mt-8">
        <DayCalendarSidebar />
        <DayEntryList  />
      </div>
    </div>
  );
}
