import { useState } from "react";
import IncomeExpenseToggleForForm from "./IncomeExpenseToggleForForm";
import EntryCategoryButton from "./EntryCategoryButton";
import EntryInputSection from "./EntryInputSection";
import {
  EXPENSE_CATEGORIES,
  INCOME_CATEGORIES,
} from "../constants/entryCategories";
import { v4 as uuidv4 } from "uuid";
import { validAmount, validDate, validNote } from "../utils/validation";
import { firestoreService } from "../firestoreService";

export default function EntryFormDialog({
  open,
  onClose,
  currentDate,
  isEditing,
  selectedEntry,
  user,
  loadEntries,
}) {
  if (!open) return null; // TODO: 如果出現編輯狀態不同步問題，考慮加上 useEffect 來同步 props 到 state

  const [type, setType] = useState(
    isEditing && selectedEntry ? selectedEntry.type : "expense",
  );
  const [category, setCategory] = useState(
    isEditing && selectedEntry ? selectedEntry.category : "food",
  );
  const [amount, setAmount] = useState(
    isEditing && selectedEntry ? selectedEntry.amount.toString() : "",
  );
  const [date, setDate] = useState(
    isEditing && selectedEntry ? selectedEntry.date : currentDate,
  );
  const [note, setNote] = useState(
    isEditing && selectedEntry ? selectedEntry.note : "",
  );
  const [mode, setMode] = useState(
    isEditing && selectedEntry ? selectedEntry.mode : "once",
  );

  const handleTypeChange = (newType) => {
    setType(newType);
    if (newType === "expense") {
      setCategory("food"); // 支出預設：飲食
    } else {
      setCategory("salary"); // 收入預設：薪資
    }
  };

  const currentCategories =
    type === "expense" ? EXPENSE_CATEGORIES : INCOME_CATEGORIES;

  const currentCategoryComponents = currentCategories.map((cat) => (
    <EntryCategoryButton
      key={cat.category}
      category={cat.category}
      label={cat.label}
      color={cat.color}
      selected={category === cat.category}
      onClick={setCategory}
    />
  ));

  const handleSubmit = async () => {
    try {
      const data = {
        id: isEditing && selectedEntry ? selectedEntry.id : uuidv4(),
        type: type,
        category: category,
        amount: validAmount(amount),
        date: validDate(date),
        note: validNote(note),
        mode: mode,
      };

      if (isEditing && selectedEntry) {
        await firestoreService.editEntry(
          user?.uid,
          selectedEntry.firebaseId,
          data,
        );
      } else {
        await firestoreService.addEntry(user?.uid, data);
      }

      await loadEntries();
      onClose();
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div>
      <div
        className="fixed inset-0 z-40 bg-slate-950/70 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      <div
        className="fixed z-50 w-[300px] rounded-[10px] border border-blue-400/50 bg-slate-950/80 lg:w-[420px]"
        style={{ top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}
      >
        <div className="flex h-full w-full flex-col items-center text-white">
          <div className="mt-4 text-2xl font-bold lg:mt-7 lg:text-4xl">
            {isEditing ? "編輯交易紀錄" : "新增交易紀錄"}
          </div>

          <div className="dialog-entry-divider"></div>

          <IncomeExpenseToggleForForm
            type={type}
            handleTypeChange={handleTypeChange}
          />

          <div className="dialog-entry-divider"></div>

          <div className="w-full px-6">
            <ul className="grid grid-cols-4 gap-2 lg:gap-4">
              {currentCategoryComponents}
            </ul>
          </div>

          <div className="dialog-entry-divider"></div>

          <EntryInputSection
            amount={amount}
            setAmount={setAmount}
            date={date}
            setDate={setDate}
            note={note}
            setNote={setNote}
          />

          <div className="dialog-entry-divider"></div>

          <div className="w-full px-6">
            <ul className="grid grid-cols-4 gap-2 lg:gap-4">
              <li className="relative h-[30px] w-[60px] overflow-hidden rounded-full lg:w-[80px]">
                <div
                  className={`${mode === "once" ? "category-button-selected" : "category-button"}`}
                  onClick={() => setMode("once")}
                >
                  單次
                </div>
              </li>
              <li className="relative h-[30px] w-[60px] overflow-hidden rounded-full lg:w-[80px]">
                <div
                  className={`${mode === "recurring" ? "category-button-selected" : "category-button"}`}
                  onClick={() => setMode("recurring")}
                >
                  週期
                </div>
              </li>
            </ul>
          </div>

          <div className="dialog-entry-divider"></div>

          <div className="mb-3 flex w-full justify-between space-x-4 px-6 lg:mb-5">
            <button
              className="flex w-full cursor-pointer items-center justify-center rounded-xl bg-gray-800 py-0.5 text-xl text-white/50 hover:bg-gray-600 lg:py-1 lg:text-2xl"
              onClick={onClose}
            >
              取消
            </button>
            <button
              className="flex w-full cursor-pointer items-center justify-center rounded-xl bg-blue-600 py-0.5 text-xl text-white hover:bg-blue-400 lg:py-1 lg:text-2xl"
              onClick={handleSubmit}
            >
              確認
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
