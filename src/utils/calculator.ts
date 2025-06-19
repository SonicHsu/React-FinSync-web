import { isTheSameDay, isTheSameMonth } from "./dateUtils";
import {
  EXPENSE_CATEGORIES,
  INCOME_CATEGORIES,
} from "../constants/entryCategories";
import { FirestoreEntry, Category } from "../types";

export function calculateDateTotals(entries: FirestoreEntry[]) {
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

export function getDayEntriesAndTotals(entries: FirestoreEntry[], day: Date) {
  const dayEntries = entries.filter((entry) => isTheSameDay(entry.date, day));

  const { expenseTotal, incomeTotal } = calculateDateTotals(dayEntries);
  return { dayEntries, expenseTotal, incomeTotal };
}

export function calculateCategoryStats(
  entries: FirestoreEntry[],
  selectedDate: Date,
  isSamePeriod: (a: Date, b: Date) => boolean,
) {
  const monthEntries = entries.filter((entry) =>
    isSamePeriod(entry.date, selectedDate),
  );

  type CategoryTotals = Record<FirestoreEntry["type"], Record<string, number>>;

  const categoryTotals: CategoryTotals = monthEntries.reduce((acc, entry) => {
    if (!acc[entry.type]) {
      acc[entry.type] = {};
    }

    acc[entry.type]![entry.category] =
      (acc[entry.type]![entry.category] || 0) + entry.amount;

    return acc;
  }, {} as CategoryTotals);

  const addAmountToCategories = (categories:Category[], type:FirestoreEntry["type"]) => {
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

export function getYearlyMonthlyTotals(entries: FirestoreEntry[], selectedDate:Date) {
  const result = [];

  for (let month = 0; month < 12; month++) {
    const currentDate = new Date(selectedDate.getFullYear(), month, 1);

    const monthEntries = entries.filter((entry) =>
      isTheSameMonth(entry.date, currentDate),
    );

    const monthTotals = calculateDateTotals(monthEntries);
    result.push(monthTotals);
  }

  return result;
}
