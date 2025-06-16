export default function ViewToggle({ currentView, onViewChange }) {

  return (
    <div className="flex h-full w-[160px] lg:w-[250px] items-center justify-center rounded-full bg-gray-400/50 font-semibold">
      <button
        className={`${currentView === "Day" ? "button-option-selected" : "button-option"}`}
        onClick={() =>  onViewChange("Day")}
      >
        Day
      </button>
      <button
        className={`${currentView === "Month" ? "button-option-selected" : "button-option"}`}
        onClick={() =>  onViewChange("Month")}
      >
        Month
      </button>
    </div>
  );
}
