import { describe, it, expect, vi } from "vitest";
import {
  calculateDateTotals,
  getDayEntriesAndTotals,
  calculateCategoryStats,
} from "./calculator";

import { isTheSameDay, isTheSameMonth } from "./dateUtils";
import { mockEntries } from "../test/mockData";

import {
  EXPENSE_CATEGORIES,
  INCOME_CATEGORIES,
} from "../constants/entryCategories";

vi.mock("./dateUtils", async (importOriginal) => {
  const actual = await importOriginal<typeof import("./dateUtils")>();
  return {
    ...actual,
    isTheSameDay: vi.fn(
      (dateA, dateB) => dateA.toDateString() === dateB.toDateString(),
    ),
    isTheSameMonth: vi.fn(
      (dateA, dateB) =>
        dateA.getFullYear() === dateB.getFullYear() &&
        dateA.getMonth() === dateB.getMonth(),
    ),
  };
});

describe("calculateDateTotals 函式", () => {
  it("應該正確計算多個支出和收入條目的總和", () => {
    const testEntries = [
      mockEntries[0]!, // { id: "entry_20250601_001", type: "expense", amount: 120, ... }
      mockEntries[1]!, // { id: "entry_20250601_002", type: "income", amount: 50000, ... }
      mockEntries[2]!, // { id: "entry_20250615_001", type: "expense", amount: 80, ... }
      mockEntries[5]!, // { id: "entry_20250620_002", type: "income", amount: 8000, ... }
    ];

    const result = calculateDateTotals(testEntries);
    expect(result.expenseTotal).toBe(200);
    expect(result.incomeTotal).toBe(58000);
  });
});

describe("getDayEntriesAndTotals 函式", () => {
  it("應該要有指定日期所有的Entry以及 當日支出 當日收入", () => {
    const testEntries = [
      mockEntries[10]!,
      mockEntries[11]!,
      mockEntries[12]!,
      mockEntries[13]!,
      mockEntries[14]!,
      mockEntries[15]!,
    ];

    const targetDate20250622 = new Date("2025-06-22T12:00:00Z");

    const testEntriesFor20250622 = mockEntries.filter((entry) =>
      isTheSameDay(entry.date, targetDate20250622),
    );

    const expectedExpense20250622 = testEntriesFor20250622
      .filter((entry) => entry.type === "expense")
      .reduce((sum, entry) => sum + entry.amount, 0);

    const expectedIncome20250622 = testEntriesFor20250622
      .filter((entry) => entry.type === "income")
      .reduce((sum, entry) => sum + entry.amount, 0);

    const result = getDayEntriesAndTotals(testEntries, targetDate20250622);
    expect(result.dayEntries).toEqual(testEntriesFor20250622);
    expect(result.expenseTotal).toBe(expectedExpense20250622);
    expect(result.incomeTotal).toBe(expectedIncome20250622);
  });
});

describe("calculateCategoryStats 函式", () => {
  it("應該正確計算本月的類別金額", () => {
    const selectedDate = new Date("2025-06-22T10:00:00Z"); // 選取6月份的任意一天

    const juneEntries = mockEntries.filter((entry) =>
      isTheSameMonth(entry.date, selectedDate),
    );

    const expectedExpenseStats = EXPENSE_CATEGORIES.map((cat) => {
      const amount = juneEntries
        .filter(
          (entry) =>
            entry.type === "expense" && entry.category === cat.category,
        )
        .reduce((sum, entry) => sum + entry.amount, 0);
      return { category: cat.category, label: cat.label, amount };
    });

    // 收入
    const expectedIncomeStats = INCOME_CATEGORIES.map((cat) => {
      const amount = juneEntries
        .filter(
          (entry) => entry.type === "income" && entry.category === cat.category,
        )
        .reduce((sum, entry) => sum + entry.amount, 0);
      return { category: cat.category, label: cat.label, amount };
    });

    // 3. 調用 calculateCategoryStats 函式
    const result = calculateCategoryStats(
      mockEntries,
      selectedDate,
      isTheSameMonth,
    );

    // 4. 斷言結果
    expect(result.expenseStats).toEqual(expectedExpenseStats);
    expect(result.incomeStats).toEqual(expectedIncomeStats);
  });

  it("如果沒有該月份的條目，應該回傳所有類別金額為 0", () => {
    const selectedDate = new Date("2025-01-15T12:00:00Z"); // 選擇一個 mockEntries 中沒有條目的月份 (例如 2025 年 1 月)

    const result = calculateCategoryStats(
      mockEntries,
      selectedDate,
      isTheSameMonth,
    );

    // 預期所有類別的金額都為 0
    const expectedEmptyExpenseStats = EXPENSE_CATEGORIES.map((cat) => ({
      category: cat.category,
      label: cat.label,
      amount: 0,
    }));
    const expectedEmptyIncomeStats = INCOME_CATEGORIES.map((cat) => ({
      category: cat.category,
      label: cat.label,
      amount: 0,
    }));

    expect(result.expenseStats).toEqual(expectedEmptyExpenseStats);
    expect(result.incomeStats).toEqual(expectedEmptyIncomeStats);
  });
});
