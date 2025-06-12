import ReactDatePicker from "react-datepicker";

export default function DateBox({
  type,
  value,
  onClick,
  currentDate,
  mode,
  handleDateChange,
  setOpenMode,
}) {
  const isOpen = mode === type;

  const renderMonthContent = (monthIndex, shortMonth, longMonth, day) => {
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
          <ReactDatePicker
            selected={currentDate}
            onChange={handleDateChange}
            onClickOutside={() => setOpenMode(null)}
            showYearPicker={mode === "year"}
            showMonthYearPicker={mode === "month"}
            renderMonthContent={
              type === "month" ? renderMonthContent : undefined
            }
            open
            inline
          />
        </div>
      )}
    </div>
  );
}
