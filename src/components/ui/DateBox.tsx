import React from "react";
import ReactDatePicker from "react-datepicker";

interface DateBoxProps {
  type: "date" | "month" | "year";
  onClick: () => void;
  currentDate: Date;
  mode: "date" | "month" | "year" | null;
  handleDateChange: (date: Date | null) => void;
  setOpenMode: (mode: "date" | "month" | "year" | null) => void;
}

export default function DateBox({
  type,
  onClick,
  currentDate,
  mode,
  setOpenMode,
  handleDateChange,
}: DateBoxProps) {
  const isOpen = mode === type;

  const getValue = (): string => {
    switch (type) {
      case "date":
        return String(currentDate.getDate()).padStart(2, "0");
      case "month":
        return String(currentDate.getMonth() + 1).padStart(2, "0");
      case "year":
        return String(currentDate.getFullYear());
      default:
        return "";
    }
  };

  const value = getValue();

  const renderMonthContent = (
    monthIndex: number,
    shortMonth: string,
    longMonth: string,
    day: Date,
  ): React.ReactNode => {
    // 將 套件月份英文 轉換為 1-12 的月份數字
    const numericMonth = monthIndex + 1;

    const fullYear = new Date(day).getFullYear();
    const tooltipText = `選擇: ${fullYear}年 ${longMonth}`; //

    return <span title={tooltipText}>{numericMonth}</span>;
  };

  return (
    <div className="relative">
      <div
        onClick={onClick}
        className="flex h-[38px] cursor-pointer items-center justify-center rounded-[10px] border border-blue-400/50 bg-white/10 px-2 text-xl hover:bg-blue-400/50 sm:text-2xl lg:text-3xl"
      >
        {value}
      </div>

      {isOpen && (
        <div className="absolute top-full left-0 z-50 mt-2 w-[150px]">
          {type === "month" && (
            <ReactDatePicker
              selected={currentDate}
              onChange={handleDateChange}
              onClickOutside={() => setOpenMode(null)}
              showMonthYearPicker
              renderMonthContent={renderMonthContent}
              open
              inline
            />
          )}

          {type !== "month" && (
            <ReactDatePicker
              selected={currentDate}
              onChange={handleDateChange}
              onClickOutside={() => setOpenMode(null)}
              showYearPicker={type === "year"}
              open
              inline
            />
          )}
        </div>
      )}
    </div>
  );
}
