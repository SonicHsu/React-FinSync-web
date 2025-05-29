import { EXPENSE_CATEGORIES, INCOME_CATEGORIES } from "../constants/entryCategories";

export default function DayEntry({type, category, amount, note}) {
  const categories = type === "expense" ? EXPENSE_CATEGORIES : INCOME_CATEGORIES;
  const categoryItem = categories.find(item => item.category === category)

  return (
    <li
      className="mt-2 flex cursor-pointer items-center justify-between border-b border-white/20 pb-2"
      data-entry
    >
      <div className="flex items-center space-x-3 px-3">
        <span
          className={`inline-block h-[18px] w-[18px] rounded-full ${categoryItem?.color}`}
        ></span>
        <span className="text-2xl" >{categoryItem?.label}</span>
        <span className="text-2xl text-white/50">{note}</span>
      </div>
      <div
        className={`flex rounded-full px-4 text-2xl ${type === "expense" ? "bg-gray-400/50" : "bg-blue-400/50"}`}
      >{amount}</div>
    </li>
  );
}
