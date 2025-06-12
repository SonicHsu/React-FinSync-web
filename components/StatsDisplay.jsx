import MonthStatChart from "./MonthStatChart";
import MonthlySummaryItem from "./MonthlySummaryItem";
import { calculateMonthStatsData } from "../utils/monthStatCalculator";
import { formatMonthZh } from "../utils/dateUtils";

export default function StatsDisplay({
  entries,
  currentDate,
  statType,
  isMobile,
}) {
  const { statsToUse, maxWithBuffer, monthTotals, monthBalance } =
    calculateMonthStatsData(entries, currentDate, statType);

  const monthStatsTitle = formatMonthZh(currentDate);

  return (
    <div className="mx-auto mt-2 flex h-[calc(100vh-200px)] w-[90%] flex-col items-center justify-between rounded-[10px] bg-gray-800/30 sm:mt-8 sm:h-[calc(100vh-250px)] lg:w-[981px]">
      <h2 className="mt-2 text-xl font-bold sm:mt-5 lg:text-4xl">
        {monthStatsTitle} 統計
      </h2>
      <div className="flex-1 flex w-full sm:h-[480px] sm:px-5">
        <MonthStatChart
          statsToUse={statsToUse}
          maxWithBuffer={maxWithBuffer}
          isMobile={isMobile}
        />
      </div>

      <footer className="w-full">
        <div className="flex w-full flex-col px-2 sm:items-center sm:justify-center mb-2 sm:mb-8 sm:flex-row sm:space-x-8 space-y-2">
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
