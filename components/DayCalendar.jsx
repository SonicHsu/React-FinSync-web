import DayCalendarSidebar from "./DayCalendarSidebar";
import DayEntryList from "./DayEntryList";

export default function DayCalendar({
  date,
  onDateChange,
  handleOpenEntryForm,
  handleOpenEntryDetail,
  entries,
  setSelectedEntry,
}) {
  return (
    <div className="flex flex-col items-center text-white flex-grow min-h-0">
      <div className="mx-auto mt-2 flex w-full max-w-[981px] flex-grow min-h-0 flex-col items-center justify-start lg:mt-8 lg:flex-row lg:items-start lg:justify-between">
        <DayCalendarSidebar
          date={date}
          onDateChange={onDateChange}
          handleOpenEntryForm={handleOpenEntryForm}
        />

        <DayEntryList
          selectedDate={date}
          entries={entries}
          handleOpenEntryDetail={handleOpenEntryDetail}
          handleOpenEntryForm={handleOpenEntryForm}
        />
      </div>
    </div>
  );
}
