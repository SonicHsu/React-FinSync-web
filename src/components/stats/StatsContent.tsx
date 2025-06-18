import MonthStatChart from "./MonthStatChart";
import MonthlySummaryItem from "./MonthlySummaryItem";
import { calculateMonthStatsData } from "../../utils/monthStatCalculator";
import { formatMonthZh } from "../../utils/dateUtils";

import { useEntryContext } from "../../contexts/entryContext";

export default function StatsContent() {
  const { currentDate, entries, statType } = useEntryContext();

  const { statsToUse, maxWithBuffer, monthTotals, monthBalance } =
    calculateMonthStatsData(entries, currentDate, statType);

  const monthStatsTitle = formatMonthZh(currentDate);

  return (
    <div className="mx-auto mt-2 flex h-[calc(100vh-200px)] max-h-[500px] w-[90%] flex-col items-center justify-between rounded-[10px] bg-gray-800/30 sm:mt-8 sm:max-h-[650px] lg:w-[981px]">
      <h2 className="mt-2 text-2xl font-bold sm:mt-5 sm:text-3xl lg:text-4xl">
        {monthStatsTitle} 統計
      </h2>
      <div className="flex w-full flex-1 sm:h-[480px] sm:px-5">
        <MonthStatChart statsToUse={statsToUse} maxWithBuffer={maxWithBuffer} />
      </div>

      <footer className="w-full">
        <div className="mb-2 flex w-full flex-col space-y-2 px-2 sm:mb-8 sm:flex-row sm:items-center sm:justify-center sm:space-y-0 sm:space-x-8 sm:px-5">
          <MonthlySummaryItem
            label="總支出"
            value={monthTotals.expenseTotal}
            valueBgColor={
              statType === "expense" ? "bg-blue-200/30" : "bg-white/10"
            }
            valueColor="text-gray-400"
          />
          <MonthlySummaryItem
            label="總收入"
            value={monthTotals.incomeTotal}
            valueBgColor={
              statType === "income" ? "bg-blue-200/30" : "bg-white/10"
            }
            valueColor="text-blue-400"
          />
          <MonthlySummaryItem
            label="結餘"
            value={monthBalance}
            valueBgColor="bg-white/10"
            valueColor={monthBalance < 0 ? "text-gray-400" : "text-blue-400"}
          />
        </div>
      </footer>
    </div>
  );
}
