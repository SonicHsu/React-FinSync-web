import {
  EXPENSE_CATEGORIES,
  INCOME_CATEGORIES,
} from "../../constants/entryCategories";

import { useEntryContext } from "../../contexts/entryContext";
import { useEntryDialog } from "../../hooks/useEntryDialog";

import { FirestoreEntry } from "../../types";

export default function DayEntry({ entryId }: { entryId: FirestoreEntry["id"] }) {
  const { entries } = useEntryContext();
  const { openDetail } = useEntryDialog();

  const entry: FirestoreEntry | undefined = entries.find((e) => e.id === entryId);

  if (!entry) {
    return null;
  }

  const categories =
    entry.type === "expense" ? EXPENSE_CATEGORIES : INCOME_CATEGORIES;
  const categoryItem = categories.find(
    (item) => item.category === entry.category,
  );

  return (
    <li
      className="lg :pb-1 mt-1 flex cursor-pointer items-center justify-between border-b border-white/5 pb-0.5 lg:mt-2"
      onClick={() => openDetail(entry)}
    >
      <div className="flex items-center space-x-3 px-3">
        <span
          className={`inline-block h-[12px] w-[12px] rounded-full lg:h-[18px] lg:w-[18px] ${categoryItem?.color}`}
        ></span>
        <span className="text-base sm:text-xl lg:text-2xl">
          {categoryItem?.label}
        </span>
        <span className="hidden text-2xl text-white/50 lg:flex">
          {entry.note}
        </span>
      </div>
      <div
        className={`flex rounded-full px-4 text-base sm:text-xl lg:text-2xl ${entry.type === "expense" ? "bg-gray-400/50" : "bg-blue-400/50"}`}
      >
        {entry.amount}
      </div>
    </li>
  );
}
