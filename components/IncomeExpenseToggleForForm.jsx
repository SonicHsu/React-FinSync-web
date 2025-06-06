export default function IncomeExpenseToggleForForm({ type, handleTypeChange }) {
  return (
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
  );
}
