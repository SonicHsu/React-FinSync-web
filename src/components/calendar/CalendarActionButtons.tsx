import { useNavigate } from "react-router-dom";

import { useEntryDialog } from "../../hooks/useEntryDialog";

export default function CalendarActionButtons() {
  const navigate = useNavigate();

  // 導向到統計頁面
  const handleStatsButton = (): void => {
    navigate("/stats");
  };

  const { openForm } = useEntryDialog(); // 取得打開新增記帳表單的函式

  return (
    <div className="flex space-x-2">
      {/* 用戶登入/登出按鈕（僅在手機顯示） */}
      <button
        className="group flex h-[62px] w-[62px] cursor-pointer items-center justify-center rounded-full bg-white/10 transition duration-150 ease-in-out hover:scale-105 sm:hidden lg:hidden"
        onClick={openForm}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="40"
          height="40"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-user-round-icon lucide-user-round"
        >
          <circle cx="12" cy="8" r="5" />
          <path d="M20 21a8 8 0 0 0-16 0" />
        </svg>
      </button>

      {/* 新增記帳資料按鈕（桌機/平板主要按鈕） */}
      <button
        className="group cursor-pointer transition duration-150 ease-in-out hover:scale-105"
        onClick={openForm}
      >
        <svg
          width="62"
          height="62"
          viewBox="0 0 62 62"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            cx="31"
            cy="31"
            r="31"
            className="fill-blue-600 transition duration-150 ease-in-out group-hover:fill-blue-700"
          />
          <path
            d="M31 17V45M17 31H45"
            stroke="white"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

    {/* 導向統計頁的按鈕 */}
      <button
        className="group cursor-pointer transition duration-150 ease-in-out hover:scale-105"
        onClick={handleStatsButton}
      >
        <svg
          width="62"
          height="62"
          viewBox="0 0 62 62"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            cx="31"
            cy="31"
            r="31"
            className="fill-white/10 transition duration-150 ease-in-out group-hover:fill-white/20"
          />
          <path
            d="M43 47V27M31 47V15M19 47V35"
            stroke="white"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </div>
  );
}
