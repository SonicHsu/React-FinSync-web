import MonthStatChart from "./MonthStatChart";
import MonthlySummaryItem from "./MonthlySummaryItem";
import { calculateMonthStatsData } from "../utils/monthStatCalculator";

export default function StatsDisplay({ entries, currentDate, statType }) {
  const { statsToUse, maxWithBuffer } = calculateMonthStatsData(
    entries,
    currentDate,
    statType,
  );

  return (
    <div className="mx-auto mt-8 flex w-[981px] flex-col items-center justify-between rounded-[10px] bg-gray-800/30">
      <h2 className="mt-5 text-4xl font-bold">月統計</h2>
      <div className="h-[480px] w-full px-5">
        <MonthStatChart statsToUse={statsToUse} maxWithBuffer={maxWithBuffer} />
      </div>

      <footer>
        <div className="mb-8 flex space-x-8">
          <MonthlySummaryItem label="總收入" />
          <MonthlySummaryItem label="總支出" />
          <MonthlySummaryItem label="結餘" />
        </div>
      </footer>
    </div>
  );
}
