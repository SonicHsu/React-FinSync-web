import { EXPENSE_CATEGORIES, INCOME_CATEGORIES } from "../constants/entryCategories";

export default function DayEntry({type, category, amount, note, onClick}) {
  const categories = type === "expense" ? EXPENSE_CATEGORIES : INCOME_CATEGORIES;
  const categoryItem = categories.find(item => item.category === category)

  return (
    <li
      className="mt-1 lg:mt-2 flex cursor-pointer items-center justify-between border-b border-white/5 pb-0.5 lg
      :pb-1"
      onClick={onClick}
    >
      <div className="flex items-center space-x-3 px-3">
        <span
          className={`inline-block h-[12px] w-[12px] lg:h-[18px] lg:w-[18px] rounded-full ${categoryItem?.color}`}
        ></span>
        <span className="text-base sm:text-xl lg:text-2xl" >{categoryItem?.label}</span>
        <span className="text-2xl text-white/50 hidden lg:flex">{note}</span>
      </div>
      <div
        className={`flex rounded-full px-4 text-base sm:text-xl lg:text-2xl ${type === "expense" ? "bg-gray-400/50" : "bg-blue-400/50"}`}
      >{amount}</div>
    </li>
  );
}
