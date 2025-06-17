import { Category } from "../types";

export const EXPENSE_CATEGORIES: Category[] = [
  { category: "food", label: "飲食", color: "bg-orange-400", chartColor: "#fb923c" },
  { category: "transport", label: "交通", color: "bg-sky-400", chartColor: "#38bdf8" },
  { category: "housing", label: "住房", color: "bg-emerald-400", chartColor: "#34d399" },
  { category: "entertainment", label: "娛樂", color: "bg-pink-400", chartColor: "#f472b6" },
  { category: "life", label: "生活", color: "bg-purple-400", chartColor: "#c084fc" },
  { category: "expenseOther", label: "其他", color: "bg-gray-400", chartColor: "#9ca3af" },
];

export const INCOME_CATEGORIES: Category[] = [
  { category: "salary", label: "薪資", color: "bg-green-400", chartColor: "#4ade80" },
  { category: "bonus", label: "獎金", color: "bg-yellow-400", chartColor: "#facc15" },
  { category: "investment", label: "投資", color: "bg-indigo-400", chartColor: "#818cf8" },
  { category: "interest", label: "利息", color: "bg-teal-400", chartColor: "#2dd4bf" },
  { category: "gift", label: "贈與", color: "bg-pink-400", chartColor: "#f472b6" },
  { category: "incomeOther", label: "其他", color: "bg-gray-400", chartColor: "#9ca3af" },
];