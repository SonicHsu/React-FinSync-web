import MonthStatChart from "./MonthStatChart";
import MonthlySummaryItem from "./MonthlySummaryItem";
import { calculateMonthStatsData } from "../utils/monthStatCalculator";
import { formatMonthZh } from "../utils/dateUtils";

export default function StatsDisplay({ entries, currentDate, statType }) {
  const { statsToUse, maxWithBuffer, monthTotals, monthBalance } =
    calculateMonthStatsData(entries, currentDate, statType);

  const monthStatsTitle = formatMonthZh(currentDate);

  return (
    <div className="mx-auto mt-8 flex w-[981px] flex-col items-center justify-between rounded-[10px] bg-gray-800/30">
      <h2 className="mt-5 text-4xl font-bold">{monthStatsTitle} 統計</h2>
      <div className="h-[480px] w-full px-5">
        <MonthStatChart statsToUse={statsToUse} maxWithBuffer={maxWithBuffer} />
      </div>

      <footer className="">
        <div className="mb-8 flex space-x-8">
          <MonthlySummaryItem
            label="總支出"
            value={monthTotals.expenseTotal}
            valueBgColor={statType=== "expense" ? "bg-blue-200/30" : "bg-white/10"}
            valueColor="text-gray-400"
          />
          <MonthlySummaryItem
            label="總收入"
            value={monthTotals.incomeTotal}
            valueBgColor={statType=== "income" ? "bg-blue-200/30" : "bg-white/10"}
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
