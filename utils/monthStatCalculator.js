import { isTheSameMonth } from "../utils/dateUtils";
import { calculateCategoryStats, getYearlyMonthlyTotals } from "../utils/calculator";
import { padChartData } from "./monthStatChartConfig";

export function calculateMonthStatsData(entries, currentDate, statType) {
  const yearlyTotals = getYearlyMonthlyTotals(entries, currentDate);
  const maxValue = Math.max(
    ...yearlyTotals.map((item) =>
      Math.max(item.expenseTotal, item.incomeTotal)
    )
  );
  const maxWithBuffer = Math.ceil(maxValue * 1.2);

  const { expenseStats, incomeStats } = calculateCategoryStats(
    entries,
    currentDate,
    isTheSameMonth
  );

  const maxCategoryCount = Math.max(expenseStats.length, incomeStats.length);
  const paddedExpenseStats = padChartData(expenseStats, maxCategoryCount);
  const paddedIncomeStats = padChartData(incomeStats, maxCategoryCount);
  const statsToUse = statType === "expense" ? paddedExpenseStats : paddedIncomeStats;

  return {
    statsToUse,
    maxWithBuffer,
  };
}