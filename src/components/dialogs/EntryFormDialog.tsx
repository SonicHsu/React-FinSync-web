import IncomeExpenseToggleForForm from "../forms/IncomeExpenseToggleForForm";
import EntryCategoryButton from "../forms/EntryCategoryButton";
import EntryInputSection from "../forms/EntryInputSection";
import ModeSelection from "../forms/ModeSelection";
import {
  EXPENSE_CATEGORIES,
  INCOME_CATEGORIES,
} from "../../constants/entryCategories";
import { useEntryContext } from "../../contexts/entryContext";
import { useEntryDialog } from "../../hooks/useEntryDialog";
import { useEntryForm } from "../../hooks/useEntryForm";
import { Category } from "../../types";

export default function EntryFormDialog() {
  const { dialogState, closeForm } = useEntryDialog();
  const { isEditing } = useEntryContext();

  const {
    type,
    category,
    amount,
    date,
    note,
    mode,
    setCategory,
    setAmount,
    setDate,
    setNote,
    setMode,
    handleTypeChange,
    handleSubmit,
  } = useEntryForm();

  if (!dialogState.entryForm) return null;

  const currentCategories: Category[] =
    type === "expense" ? EXPENSE_CATEGORIES : INCOME_CATEGORIES;

  const handleConfirm = async () => {
    const success = await handleSubmit();
    if (success) {
      closeForm();
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
              {currentCategories.map((cat) => (
                <EntryCategoryButton
                  key={cat.category}
                  category={cat.category}
                  label={cat.label}
                  color={cat.color}
                  selected={category === cat.category}
                  onClick={setCategory}
                />
              ))}
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

          <ModeSelection mode={mode} setMode={setMode} />

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
              onClick={handleConfirm}
            >
              確認
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
