import { useEntryContext } from "../../contexts/entryContext";
import { statType } from "../../types";

export default function IncomeExpenseToggleForStats() {
  const { statType, setStatType } = useEntryContext();

  const handleStatTypeChange = (newStatType: statType) => {
    setStatType(newStatType);
  };

  return (
    <div className="flex w-[130px] items-center justify-center rounded-[90px] bg-gray-400/50 font-semibold sm:w-[160px] lg:w-[250px]">
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
