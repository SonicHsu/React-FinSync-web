export default function IncomeExpenseToggleForStats({ statType, handleStatTypeChange}) {
  return (
    <div className="flex h-[30px] w-[250px] items-center justify-center rounded-[90px] bg-gray-400/50 font-semibold">
      <button
        className={`${statType === "expense" ? "button-option-selected" : "button-option"}`}
        onClick={() => handleStatTypeChange("expense")}
      >
        支出
      </button>
      <button
        className={`${statType === "income" ? "button-option-selected" : "button-option"}`}
        onClick={() => handleStatTypeChange("income")}
      >
        收入
      </button>
    </div>
  );
}
