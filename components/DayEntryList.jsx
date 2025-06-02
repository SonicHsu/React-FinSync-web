import DayEntry from "./DayEntry";
import { useDayEntriesAndTotals } from "../hooks/useDayEntriesAndTotals";

export default function DayEntryList({ selectedDate, entries }) {
  const {dayEntries, expenseTotal , incomeTotal} = useDayEntriesAndTotals(entries, selectedDate)

  const entriesComponents = dayEntries.map((entry) => (
    <DayEntry
      key={entry.id}
      type={entry.type}
      category={entry.category}
      amount={entry.amount}
      note={entry.note}
    />
  ));

  return (
    <div className="flex h-[668px] w-[685px] flex-col items-center rounded-[10px] bg-gray-800/30">
      <div className="mt-5 flex h-[50px] w-[645px] justify-between">
        <div className="flex w-[310px] items-center justify-between rounded-[10px] bg-gray-400/50 px-3">
          <span className="text-2xl font-semibold">當日支出</span>
          <span className="text-4xl" >
            {expenseTotal}
          </span>
        </div>
        <div className="flex w-[310px] items-center justify-between rounded-[10px] bg-blue-400/50 px-3">
          <span className="text-2xl font-semibold">當日收入</span>
          <span className="text-4xl" >
            {incomeTotal}
          </span>
        </div>
      </div>

      <div className="custom-scrollbar mt-3 h-[550px] w-[645px] overflow-y-auto">
        <ul className="flex flex-col px-4" data-entry-list>
          {entriesComponents}
        </ul>
      </div>
    </div>
  );
}
