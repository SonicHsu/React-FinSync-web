import { useNavigate } from "react-router-dom";

import { useEntryDialog } from "../hooks/useEntryDialog";

export default function CalendarActionButtons() {
  const navigate = useNavigate();
  const handleStatsButton = (): void  => {
    navigate("/stats");
  };

  const { openForm } = useEntryDialog();

  return (
    <div className="flex space-x-2">
      {/* 
      第一個按鈕（小圓形用戶圖示）：
      - 僅在小螢幕（sm以下）可見（因為 sm:hidden lg:hidden）
      - 點擊會觸發 openForm，通常是打開某個表單（可能是新增或編輯用戶資料）
    */}
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

      {/* 
      第二個按鈕（藍色大圓加號圖示）：
      - 點擊會觸發 openForm，功能通常是「新增項目」或「新增記錄」
      - 按鈕有 hover 放大和顏色變化的互動效果
    */}
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

      {/* 
      第三個按鈕（統計圖表圖示）：
      - 點擊會觸發 handleStatsButton，通常是開啟統計或報表頁面
      - 按鈕有 hover 放大和顏色變化的互動效果
    */}
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
