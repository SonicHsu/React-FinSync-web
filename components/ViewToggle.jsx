import { useState } from "react";

export default function ViewToggle({ currentView, onViewChange }) {

  return (
    <div className="flex h-[30px] w-[250px] items-center justify-center rounded-[90px] bg-gray-400/50 font-semibold">
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
