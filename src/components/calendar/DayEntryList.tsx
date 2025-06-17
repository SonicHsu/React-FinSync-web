import DayEntry from "./DayEntry";
import CalendarActionButtons from "./CalendarActionButtons";
import { getDayEntriesAndTotals } from "../../utils/calculator";
import { Entry } from "../../types";

import { useEntryContext } from "../../contexts/entryContext";

export default function DayEntryList() {
  const {entries, currentDate } = useEntryContext();

  const { dayEntries, expenseTotal, incomeTotal } = getDayEntriesAndTotals(
    entries,
    currentDate,
  );

  const entriesComponents = dayEntries.map((entry: Entry) => (
    <DayEntry
      key={entry.id}
      entryId={entry.id}
    />
  ));

  return (
    <>
      <div className="mt-3 flex h-[calc(100vh-10px)] sm:h-[calc(100vh-250px)]  min-h-0 w-[90%] max-w-sm flex-grow flex-col items-center rounded-[10px] bg-gray-800/30 sm:mt-0 sm:max-w-[90%] lg:max-w-[685px] sm:ml-2">
        <div className="mt-2 hidden h-auto w-full justify-between items-center sm:space-y-2 lg:space-x-2 sm:flex sm:flex-col lg:flex-row px-2">
          <div className="flex sm:w-full lg:w-full items-center justify-between rounded-[10px] bg-gray-400/50 px-3 py-1 lg:py-2 my-1">
            <span className="sm:text-xl lg:text-2xl font-semibold">當日支出</span>
            <span className="sm:text-2xl lg:text-4xl">{expenseTotal}</span>
          </div>
          <div className="flex sm:w-full lg:w-full items-center justify-between rounded-[10px] bg-blue-400/50 px-3 py-1 lg:py-2 my-1">
            <span className="sm:text-xl lg:text-2xl font-semibold">當日收入</span>
            <span className="sm:text-2xl lg:text-4xl">{incomeTotal}</span>
          </div>
        </div>

        <div className="custom-scrollbar mt-2 mb-3 min-h-0 w-full flex-grow overflow-y-auto lg:mt-3">
          <ul className="flex flex-col px-4">{entriesComponents}</ul>
        </div>
      </div>
      <footer className="mt-6 mb-6 flex w-full items-center justify-center space-x-2 sm:hidden lg:hidden">
        <CalendarActionButtons />
      </footer>
    </>
  );
}
