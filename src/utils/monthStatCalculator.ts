import { isTheSameMonth } from "./dateUtils";
import {
  calculateDateTotals,
  calculateCategoryStats,
  getYearlyMonthlyTotals,
} from "./calculator";
import { FirestoreEntry, statType, CategoryStat } from "../types";

interface MonthStatsData {
  statsToUse: CategoryStat[];
  maxWithBuffer: number;
  monthTotals: {
    expenseTotal: number;
    incomeTotal: number;
  };
  monthBalance: number;
}

export function calculateMonthStatsData(
  entries: FirestoreEntry[],
  currentDate: Date,
  statType: statType,
): MonthStatsData {
  // 篩選出該月份的所有帳目
  const monthEntries = entries.filter((entry) =>
    isTheSameMonth(entry.date, currentDate),
  );

  // 計算該月份的收入與支出總和
  const monthTotals = calculateDateTotals(monthEntries);

   // 計算淨額 = 收入總和 - 支出總和
  const monthBalance = monthTotals.incomeTotal - monthTotals.expenseTotal;

// 計算該年度每個月份的收入與支出總和陣列
  const yearlyTotals = getYearlyMonthlyTotals(entries, currentDate);

  // 找出年度中最大支出或收入，作為繪圖 Y 軸最大值基準
  const maxValue = Math.max(
    ...yearlyTotals.map((item) =>
      Math.max(item.expenseTotal, item.incomeTotal),
    ),
  );

  // 加上 20% 緩衝，避免圖表高度緊貼最高點
  const maxWithBuffer = Math.ceil(maxValue * 1.2);

  const { expenseStats, incomeStats } = calculateCategoryStats(
    entries,
    currentDate,
    isTheSameMonth,
  );

  // 根據統計類型選擇要呈現的分類統計資料
  const statsToUse = statType === "expense" ? expenseStats : incomeStats;

  return {
    statsToUse,
    maxWithBuffer,
    monthTotals,
    monthBalance,
  };
}
