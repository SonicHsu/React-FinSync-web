import { useState } from "react";
import EntryCategoryButton from "./EntryCategoryButton";
import EntryInputSection from "./EntryInputSection";
import {
  EXPENSE_CATEGORIES,
  INCOME_CATEGORIES,
} from "../constants/entryCategories";
import { v4 as uuidv4 } from "uuid";
import { validAmount, validDate, validNote } from "../utils/validation";

export default function EntryFormDialog({ open, onClose, currentDate, setEntries }) {
  if (!open) return null;

  const [type, setType] = useState("expense");
  const [category, setCategory] = useState("food");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState(currentDate);
  const [note, setNote] = useState("");
  const [mode, setMode] = useState("once");

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

  const handleSubmit = () => {
    try {
      const data = {
        id: uuidv4(),
        type: type,
        category: category,
        amount: validAmount(amount),
        date: validDate(date),
        note: validNote(note),
        mode: mode,
      };
      console.log("submit data!");
      setEntries(prevEntries => [data, ...prevEntries] )
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
        data-dialog-backdrop
      ></div>

      <div
        className="fixed z-50 w-[420px] rounded-[10px] border border-blue-400/50 bg-slate-950/80"
        style={{ top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}
        data-dialog="entry-form"
      >
        <div
          className="flex h-full w-full flex-col items-center text-white"
          data-entry-form
        >
          <div className="mt-7 text-4xl font-bold">新增交易紀錄</div>

          <div className="dialog-entry-divider"></div>

          <div className="flex h-[30px] w-[250px] items-center justify-center rounded-[90px] bg-gray-400/50 font-semibold">
            <button
              className={`${type === "expense" ? "button-option-selected" : "button-option"}`}
              onClick={() => handleTypeChange("expense")}
            >
              支出
            </button>
            <button
              className={`${type === "income" ? "button-option-selected" : "button-option"}`}
              onClick={() => handleTypeChange("income")}
            >
              收入
            </button>
          </div>

          <div className="dialog-entry-divider"></div>

          <div className="min-h-[80px]">
            <ul
              className="grid grid-cols-4 gap-4"
              data-entry-category-list-expense
            >
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

          <div>
            <ul className="grid grid-cols-4 gap-4" data-entry-mode-list>
              <li className="relative h-[30px] w-[80px] overflow-hidden rounded-full">
                <div
                  className={`${mode === "once" ? "category-button-selected" : "category-button"}`}
                  onClick={() => setMode("once")}
                >
                  單次
                </div>
              </li>
              <li className="relative h-[30px] w-[80px] overflow-hidden rounded-full">
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

          <div className="mb-5 flex w-[368px] justify-between">
            <button
              className="flex h-[40px] w-[174px] cursor-pointer items-center justify-center rounded-xl bg-gray-800 text-2xl text-white/50 hover:bg-gray-600"
              onClick={onClose}
            >
              取消
            </button>
            <button
              className="flex h-[40px] w-[174px] cursor-pointer items-center justify-center rounded-xl bg-blue-600 text-2xl text-white hover:bg-blue-400"
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
