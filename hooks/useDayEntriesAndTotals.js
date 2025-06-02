import { useMemo } from "react";
import { isTheSameDay } from "../utils/dateUtils";
import { calculateDateTotals } from "../utils/calculator";

export const useDayEntriesAndTotals = (entries, day) => {
  return useMemo(() => {
    const dayEntries = entries.filter((entry) =>
      isTheSameDay(entry.date, day)
    );

    const { expenseTotal, incomeTotal } = calculateDateTotals(dayEntries)

    return  { dayEntries, expenseTotal, incomeTotal }
  }, [entries, day]);
};
