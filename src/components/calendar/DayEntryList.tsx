import DayEntry from "./DayEntry";
import CalendarActionButtons from "./CalendarActionButtons";
import { getDayEntriesAndTotals } from "../../utils/calculator";
import { Entry } from "../../types";

import { useEntryContext } from "../../contexts/entryContext";

export default function DayEntryList() {
  const { entries, currentDate } = useEntryContext();



  // 取出當日交易、當日支出總額、當日收入總額
  const { dayEntries, expenseTotal, incomeTotal } = getDayEntriesAndTotals(
    entries,
    currentDate,
  );

  // 產生當日每筆交易對應的元件
  const entriesComponents = dayEntries.map((entry: Entry) => (
    <DayEntry key={entry.id} entryId={entry.id} />
  ));

  return (
    <>
      <div className="mt-3 flex h-[calc(100vh-10px)] min-h-0 w-[90%] max-w-sm flex-grow flex-col items-center rounded-[10px] bg-gray-800/30 sm:mt-0 sm:ml-2 sm:h-[calc(100vh-250px)] sm:max-w-[90%] lg:max-w-[685px]">
        {/* 僅在桌機與平板顯示當日收支總額卡片 */}
        <div className="mt-2 hidden h-auto w-full items-center justify-between px-2 sm:flex sm:flex-col sm:space-y-2 lg:flex-row lg:space-x-2">
          <div className="my-1 flex items-center justify-between rounded-[10px] bg-gray-400/50 px-3 py-1 sm:w-full lg:w-full lg:py-2 cursor-pointer" >
            <span className="font-semibold sm:text-xl lg:text-2xl">
              當日支出
            </span>
            <span className="sm:text-2xl lg:text-4xl">{expenseTotal}</span>
          </div>
          <div className="my-1 flex items-center justify-between rounded-[10px] bg-blue-400/50 px-3 py-1 sm:w-full lg:w-full lg:py-2 cursor-pointer" >
            <span className="font-semibold sm:text-xl lg:text-2xl">
              當日收入
            </span>
            <span className="sm:text-2xl lg:text-4xl">{incomeTotal}</span>
          </div>
        </div>

        {/* 當日交易列表，內容可捲動 */}
        <div className="custom-scrollbar mt-2 mb-3 min-h-0 w-full flex-grow overflow-y-auto lg:mt-3">
          <ul className="flex flex-col px-4">{entriesComponents}</ul>
        </div>
      </div>

      {/* 僅手機顯示底部操作按鈕群 */}
      <footer className="mt-6 mb-6 flex w-full items-center justify-center space-x-2 sm:hidden lg:hidden">
          <CalendarActionButtons />
      </footer>
    </>
  );
}
