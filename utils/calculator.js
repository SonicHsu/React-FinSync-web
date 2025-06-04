import { isTheSameDay } from "./dateUtils";
import { EXPENSE_CATEGORIES, INCOME_CATEGORIES } from "../constants/entryCategories";

export function calculateDateTotals(entries) {
  return entries.reduce(
    (acc, entry) => {
      if (entry.type === "expense") {
        acc.expenseTotal += entry.amount;
      } else if (entry.type === "income") {
        acc.incomeTotal += entry.amount;
      }
      return acc;
    },
    { expenseTotal: 0, incomeTotal: 0 },
  );
}

export function getDayEntriesAndTotals(entries, day) {
  const dayEntries = entries.filter((entry) => isTheSameDay(entry.date, day));

  const { expenseTotal, incomeTotal } = calculateDateTotals(dayEntries);
  return { dayEntries, expenseTotal, incomeTotal };
}

export function calculateCategoryStats(entries, selectedDate, isSamePeriod) {
  const monthEntries = entries.filter((entry) =>
    isSamePeriod(entry.date, selectedDate),
  );

  

  const categoryTotals = monthEntries.reduce((acc, entry) => {
    if (!acc[entry.type]) {
      acc[entry.type] = {};
    }

    acc[entry.type][entry.category] =
      (acc[entry.type][entry.category] || 0) + entry.amount;
    return acc;
  }, {});

 

  const addAmountToCategories = (categories, type) => {
    return categories.map((category) => ({
      ...category,
      amount: categoryTotals[type]?.[category.category] || 0,
    }));
  };

  return {
    expenseStats: addAmountToCategories(EXPENSE_CATEGORIES, "expense"),
    incomeStats: addAmountToCategories(INCOME_CATEGORIES, "income"),
  };
}
