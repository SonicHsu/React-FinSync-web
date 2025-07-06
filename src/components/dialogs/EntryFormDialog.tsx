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

import toast from "react-hot-toast";

export default function EntryFormDialog() {
  // 取得對話框狀態與關閉表單的函式
  const { dialogState, closeForm } = useEntryDialog();

  const { isEditing } = useEntryContext();

  // 從自訂 Hook 取得表單相關狀態與操作函式
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
    resetForm,
  } = useEntryForm();

  if (!dialogState.entryForm) return null;



  // 根據收支類型取得對應分類清單
  const currentCategories: Category[] =
    type === "expense" ? EXPENSE_CATEGORIES : INCOME_CATEGORIES;

  // 確認提交函式，成功提交後關閉表單
  const handleConfirm = async () => {
    const { success, errorMsg } = await handleSubmit();
    if (success) {
      isEditing ? toast.success("編輯交易紀錄成功") : toast.success("新增交易紀錄成功") 

    } else {
      toast.error(errorMsg || "儲存失敗，請稍後再試！");
    }
  };

    const handleCancel = () => {
    if (!isEditing) {
      resetForm(); // 只在新增模式時重置表單
    }
    closeForm();
  };

  return (
    <div>
      {/* 背景遮罩，點擊可關閉表單 */}
      <div
        className="fixed inset-0 z-40 bg-slate-950/70 backdrop-blur-sm"
        onClick={handleCancel}
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


           {/* 收入/支出切換元件 */}
          <IncomeExpenseToggleForForm
            type={type}
            handleTypeChange={handleTypeChange}
          />

          <div className="dialog-entry-divider"></div>


          {/* 類別按鈕清單 */}
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

          {/* 輸入區段，金額、日期、備註 */}      
          <EntryInputSection
            amount={amount}
            setAmount={setAmount}
            date={date}
            setDate={setDate}
            note={note}
            setNote={setNote}
          />

          <div className="dialog-entry-divider"></div>

          {/* 模式選擇器（例如單次/循環） */}      
          <ModeSelection mode={mode} setMode={setMode} />

          <div className="dialog-entry-divider"></div>
 
          <div className="mb-3 flex w-full justify-between space-x-4 px-6 lg:mb-5">
            <button
              className="flex w-full cursor-pointer items-center justify-center rounded-xl bg-gray-800 py-0.5 text-xl text-white/50 hover:bg-gray-600 lg:py-1 lg:text-2xl"
              onClick={handleCancel}
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
