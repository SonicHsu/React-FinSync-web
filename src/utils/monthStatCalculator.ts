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
  const monthEntries = entries.filter((entry) =>
    isTheSameMonth(entry.date, currentDate),
  );

  const monthTotals = calculateDateTotals(monthEntries);
  const monthBalance = monthTotals.incomeTotal - monthTotals.expenseTotal;

  const yearlyTotals = getYearlyMonthlyTotals(entries, currentDate);
  const maxValue = Math.max(
    ...yearlyTotals.map((item) =>
      Math.max(item.expenseTotal, item.incomeTotal),
    ),
  );
  const maxWithBuffer = Math.ceil(maxValue * 1.2);

  const { expenseStats, incomeStats } = calculateCategoryStats(
    entries,
    currentDate,
    isTheSameMonth,
  );

  const statsToUse = statType === "expense" ? expenseStats : incomeStats;

  return {
    statsToUse,
    maxWithBuffer,
    monthTotals,
    monthBalance,
  };
}
