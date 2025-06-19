import React from "react";
import { useState } from "react";
import ReactDatePicker from "react-datepicker";
import { formatDate } from "../../utils/dateUtils";
import { Entry } from "../../types";

interface EntryInputSectionProps {
  amount: string;
  setAmount: (amount: string) => void;
  date: Date;
  setDate: (date: Date) => void;
  note: Entry["note"];
  setNote: (note: Entry["note"]) => void;
}

export default function EntryInputSection({
  amount,
  setAmount,
  date,
  setDate,
  note,
  setNote,
}: EntryInputSectionProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  // 金額輸入欄位變動：只允許數字
  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value.replace(/[^0-9]/g, "");
    setAmount(input);
  };

  // 日期欄點擊切換日期選擇器顯示狀態
  const handleDatePicker = () => {
    setIsOpen(!isOpen);
  };

  // 選擇日期後更新 state 並關閉日期選擇器
  const handleEntryDateChange = (entryDate: Date | null) => {
    if (entryDate) {
      setDate(entryDate);
      setIsOpen(false);
    }
  };

  // 備註輸入欄變動：去除首尾空白，限制最多 15 字
  const handleNoteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawInput = e.target.value;
    const trimmedInput = rawInput.trim();

    if (trimmedInput.length <= 15) {
      setNote(trimmedInput);
    }
  };

  return (
    <>
      <div className="flex w-full flex-col justify-between space-y-2 px-6 lg:flex-row lg:space-x-2">
        {/* 金額輸入框 */}
        <div className="flex h-[30px] w-full items-center justify-between rounded-xl bg-gray-800 px-3">
          <span className="text-sm text-gray-400">金額</span>
          <input
            className="w-48 appearance-none border-none bg-transparent text-right text-xl font-medium text-white outline-none focus:ring-0 lg:w-26"
            type="text"
            inputMode="numeric"
            value={amount}
            onChange={handleAmountChange}
          />
        </div>

        {/* 日期顯示及日期選擇器 */}
        <div className="relative flex h-[30px] w-full items-center justify-between rounded-xl bg-gray-800 px-3">
          <span className="text-sm text-gray-400">日期</span>
          <span
            className="z-10 cursor-pointer text-lg font-medium lg:text-xl"
            onClick={handleDatePicker}
          >
            {formatDate(date)}
          </span>
          {isOpen && (
            <div className="absolute top-full left-0 z-50 mt-2 w-[150px]">
              <ReactDatePicker
                selected={date}
                onChange={handleEntryDateChange}
                onClickOutside={() => setIsOpen(false)}
                open
                inline
              />
            </div>
          )}
        </div>
      </div>

      {/* 備註輸入框 */}
      <div className="mt-2 w-full px-6">
        <div className="flex w-full items-center justify-between rounded-xl bg-gray-800 px-3">
          <span className="text-sm text-gray-400">備註</span>
          <input
            className="w-48 appearance-none border-none bg-transparent text-left text-xl font-medium text-white outline-none focus:ring-0 lg:w-[300px]"
            type="text"
            inputMode="numeric"
            value={note}
            onChange={handleNoteChange}
          />
        </div>
      </div>
    </>
  );
}
