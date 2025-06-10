import DayEntry from "./DayEntry";
import CalendarActionButtons from "./CalendarActionButtons";
import { getDayEntriesAndTotals } from "../utils/calculator";

export default function DayEntryList({
  selectedDate,
  entries,
  handleOpenEntryDetail,
  handleOpenEntryForm,
}) {
  const { dayEntries, expenseTotal, incomeTotal } = getDayEntriesAndTotals(
    entries,
    selectedDate,
  );

  const entriesComponents = dayEntries.map((entry) => (
    <DayEntry
      key={entry.id}
      type={entry.type}
      category={entry.category}
      amount={entry.amount}
      note={entry.note}
      onClick={() => handleOpenEntryDetail(entry)}
    />
  ));

  return (
    <>
      <div className="mt-3 flex max-h-[calc(100vh-10px)] min-h-0 w-[90%] max-w-sm flex-grow flex-col items-center rounded-[10px] bg-gray-800/30 lg:mt-0 lg:max-w-[685px]">
        <div className="mt-5 hidden h-[50px] w-[90%] justify-between space-x-2 lg:flex">
          <div className="flex w-[310px] items-center justify-between rounded-[10px] bg-gray-400/50 px-3">
            <span className="text-2xl font-semibold">當日支出</span>
            <span className="text-4xl">{expenseTotal}</span>
          </div>
          <div className="flex w-[310px] items-center justify-between rounded-[10px] bg-blue-400/50 px-3">
            <span className="text-2xl font-semibold">當日收入</span>
            <span className="text-4xl">{incomeTotal}</span>
          </div>
        </div>

        <div className="custom-scrollbar mt-2 mb-3 min-h-0 w-full flex-grow overflow-y-auto lg:mt-3 lg:w-[90%]">
          <ul className="flex flex-col px-4">{entriesComponents}</ul>
        </div>
      </div>
      <footer className="mt-6 mb-6 flex w-full items-center justify-center space-x-2 lg:hidden">
        <CalendarActionButtons handleOpenEntryForm={handleOpenEntryForm} />
      </footer>
    </>
  );
}
