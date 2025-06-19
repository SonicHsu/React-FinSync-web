import MonthStatChart from "./MonthStatChart";
import MonthlySummaryItem from "./MonthlySummaryItem";
import CalendarActionButtons from "../calendar/CalendarActionButtons";
import { calculateMonthStatsData } from "../../utils/monthStatCalculator";
import { formatMonthZh } from "../../utils/dateUtils";

import { useEntryContext } from "../../contexts/entryContext";

export default function StatsContent() {
  // 從 Context 取得當前日期、所有記帳條目及統計類型（支出/收入）
  const { currentDate, entries, statType } = useEntryContext();

  // 計算本月統計數據，包括圖表資料、最大值緩衝、月總支出/收入與結餘
  const { statsToUse, maxWithBuffer, monthTotals, monthBalance } =
    calculateMonthStatsData(entries, currentDate, statType);

  // 格式化顯示月份（中文格式）
  const monthStatsTitle = formatMonthZh(currentDate);

  return (
    <>
      <div className="mx-auto mt-2 flex h-[calc(100vh-300px)] max-h-[500px] w-[90%] flex-col items-center justify-between rounded-[10px] bg-gray-800/30 sm:mt-8 sm:max-h-[650px] lg:w-[981px]">
        <h2 className="mt-2 text-2xl font-bold sm:mt-5 sm:text-3xl lg:text-4xl">
          {monthStatsTitle} 統計
        </h2>

        {/* 圖表區塊 */}
        <div className="flex w-full flex-1 sm:h-[400px] sm:px-5">
          <MonthStatChart
            statsToUse={statsToUse}
            maxWithBuffer={maxWithBuffer}
          />
        </div>

        {/* 底部統計摘要區 */}
        <div className="w-full">
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
        </div>
      </div>

      <footer className="mt-6 mb-6 flex w-full items-center justify-center space-x-2 ">
        <CalendarActionButtons />
      </footer>
    </>
  );
}
