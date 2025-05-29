import { useState } from "react";
import ReactDatePicker from "react-datepicker";
import { formatDate } from "../utils/dateUtils";

export default function EntryInputSection({
  amount,
  setAmount,
  date,
  setDate,
  note,
  setNote,
}) {
  const [isOpen, setIsOpen] = useState(false);

  const handleAmountChange = (e) => {
    const input = e.target.value.replace(/[^0-9]/g, "");
    setAmount(input);
  };

  const handleDatePicker = () => {
    setIsOpen(!isOpen);
  };

  const handleEntryDateChange = (entryDate) => {
    setDate(entryDate);
    setIsOpen(null);
  };

  const handleNoteChange = (e) => {
    const rawInput = e.target.value;
    const trimmedInput = rawInput.trim();

    if (trimmedInput.length <= 15) {
      setNote(trimmedInput);
    }
  };

  return (
    <div>
      <div className="flex w-[368px] justify-between">
        <div className="flex h-[30px] w-[174px] items-center justify-between rounded-xl bg-gray-800 px-3">
          <span className="text-sm text-gray-400">金額</span>
          <input
            className="w-24 appearance-none border-none bg-transparent text-right text-xl font-medium text-white outline-none focus:ring-0"
            type="text"
            inputMode="numeric"
            value={amount}
            onChange={handleAmountChange}
          />
        </div>

        <div className="relative flex h-[30px] w-[174px] items-center justify-between rounded-xl bg-gray-800 px-3">
          <span className="text-sm text-gray-400">日期</span>
          <span
            className="z-10 cursor-pointer text-xl font-medium"
            onClick={handleDatePicker}
          >
            {formatDate(date)}
          </span>
          {isOpen && (
            <div className="absolute top-full left-0 z-50 mt-2 w-[150px]">
              <ReactDatePicker
                onChange={handleEntryDateChange}
                onClickOutside={() => setIsOpen(null)}
                open
                inline
              />
            </div>
          )}
        </div>
      </div>

      <div className="mt-2">
        <div className="flex w-[368px] items-center justify-between rounded-xl bg-gray-800 px-3">
          <span className="text-sm text-gray-400">備註</span>
          <input
            className="w-[300px] appearance-none border-none bg-transparent text-left text-xl font-medium text-white outline-none focus:ring-0"
            type="text"
            inputMode="numeric"
            value={note}
            onChange={handleNoteChange}
          />
        </div>
      </div>
    </div>
  );
}
