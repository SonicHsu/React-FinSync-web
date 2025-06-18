import { Entry } from "../../types";

interface IncomeExpenseToggleForFormProps{
type: Entry["type"];
handleTypeChange: (type: Entry["type"]) => void;
}

export default function IncomeExpenseToggleForForm({ type, handleTypeChange }:IncomeExpenseToggleForFormProps) {
  return (
    <div className="lg:w-[250px] items-center flex h-full w-[200px] justify-center rounded-[90px] bg-gray-400/50 font-semibold">
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
