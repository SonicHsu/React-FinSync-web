import { useState } from "react";
import IncomeExpenseToggleForForm from "../forms/IncomeExpenseToggleForForm";
import EntryCategoryButton from "../forms/EntryCategoryButton";
import EntryInputSection from "../forms/EntryInputSection";
import {
  EXPENSE_CATEGORIES,
  INCOME_CATEGORIES,
} from "../../constants/entryCategories";
import { v4 as uuidv4 } from "uuid";
import { validAmount, validDate, validNote } from "../../utils/validation";
import { firestoreService } from "../../firestoreService";

import { useAuth } from "../../contexts/authContext";
import { useEntryContext } from "../../contexts/entryContext";
import { useEntryDialog } from "../../hooks/useEntryDialog";

import { Entry, Category } from "../../types";

export default function EntryFormDialog() {
  const { dialogState, closeForm } = useEntryDialog();
  const { user } = useAuth();
  const { currentDate, isEditing, selectedEntry, loadEntries } =
    useEntryContext();

  const [type, setType] = useState<Entry["type"]>(
    isEditing && selectedEntry ? selectedEntry.type : "expense",
  );
  const [category, setCategory] = useState<Entry["category"]>(
    isEditing && selectedEntry ? selectedEntry.category : "food",
  );
  const [amount, setAmount] = useState<string>(
    isEditing && selectedEntry ? selectedEntry.amount.toString() : "",
  );
  const [date, setDate] = useState<Entry["date"]>(
    isEditing && selectedEntry ? selectedEntry.date : currentDate,
  );
  const [note, setNote] = useState<Entry["note"]>(
    isEditing && selectedEntry ? selectedEntry.note : "",
  );
  const [mode, setMode] = useState<Entry["mode"]>(
    isEditing && selectedEntry ? selectedEntry.mode : "once",
  );

  if (!dialogState.entryForm) return null;

  const handleTypeChange = (newType: Entry["type"]) => {
    setType(newType);
    if (newType === "expense") {
      setCategory("food"); // 支出預設：飲食
    } else {
      setCategory("salary"); // 收入預設：薪資
    }
  };

  const currentCategories: Category[] =
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
      const data: Entry = {
        id: isEditing && selectedEntry ? selectedEntry.id : uuidv4(),
        type: type,
        category: category,
        amount: validAmount(amount),
        date: validDate(date),
        note: validNote(note),
        mode: mode,
      };

      if (isEditing && selectedEntry && user?.uid) {
        await firestoreService.editEntry(
          user.uid,
          selectedEntry.firebaseId,
          data,
        );
      } else if (user?.uid) {
        await firestoreService.addEntry(user?.uid, data);
      }

      await loadEntries();
      closeForm();
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message); // ✅ 正確用法
      } else {
        alert("發生未知錯誤");
      }
    }
  };

  return (
    <div>
      <div
        className="fixed inset-0 z-40 bg-slate-950/70 backdrop-blur-sm"
        onClick={closeForm}
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
              onClick={closeForm}
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
