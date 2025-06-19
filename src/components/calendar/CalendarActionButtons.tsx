import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import MobileAuthButtons from "../ui/MobileAuthButtons";
import { useEntryDialog } from "../../hooks/useEntryDialog";
import { useAuth } from "../../contexts/authContext";
import { UserRound, ChartNoAxesColumn, CalendarDays, Plus } from "lucide-react";

export default function CalendarActionButtons() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const isStatsPage = location.pathname === "/stats";

  const { openForm } = useEntryDialog(); // 取得打開新增記帳表單的函式

  const [isOpenAuth, setIsOpenAuth] = useState<boolean>(false);

  const openAuth = () => setIsOpenAuth(true);
  const closeAuth = () => setIsOpenAuth(false);

  return (
    <div className="flex space-x-2">
      {/* 用戶登入/登出按鈕（僅在手機顯示） */}
      <div className="relative">
        <button
          className="group flex h-[62px] w-[62px] cursor-pointer items-center justify-center rounded-full bg-white/10 transition duration-150 ease-in-out hover:scale-105 sm:hidden lg:hidden"
          onClick={openAuth}
        >
          {user?.photoURL ? (
            <img
              src={user.photoURL}
              alt={user.displayName || "user avatar"}
              className="h-14 w-14 rounded-full object-cover"
            />
          ) : (
            <button className="flex h-[62px] w-[62px] cursor-pointer items-center justify-center rounded-full bg-white/10 transition duration-150 ease-in-out hover:bg-white/20">
              <UserRound
                size={40}
                strokeWidth={2}
                className="text-white"
              />
            </button>
          )}
        </button>

        {isOpenAuth && (
          <div className="absolute bottom-full left-1/2 z-50 mb-2 w-[120px] -translate-x-1/2">
            <MobileAuthButtons closeAuth={closeAuth} />
          </div>
        )}
      </div>

      {/* 新增記帳資料按鈕（桌機/平板主要按鈕） */}
      <button
        className="group cursor-pointer transition duration-150 ease-in-out hover:scale-105"
        onClick={openForm}
      >
        <button className="flex h-[62px] w-[62px] cursor-pointer items-center justify-center rounded-full bg-blue-600 transition duration-150 ease-in-out hover:bg-blue-400">
          <Plus size={50} strokeWidth={2} className="text-white" />
        </button>
      </button>

      {/* 導向統計頁的按鈕 */}
      <button
        className="group cursor-pointer transition duration-150 ease-in-out hover:scale-105"
        onClick={() => navigate(isStatsPage ? "/" : "/stats")}
      >
        {isStatsPage ? (
          <button className="flex h-[62px] w-[62px] cursor-pointer items-center justify-center rounded-full bg-white/10 transition duration-150 ease-in-out hover:bg-white/20">
            <CalendarDays size={40} strokeWidth={1.5} className="text-white" />
          </button>
        ) : (
          <button className="flex h-[62px] w-[62px] cursor-pointer items-center justify-center rounded-full bg-white/10 transition duration-150 ease-in-out hover:bg-white/20">
            <ChartNoAxesColumn
              size={45}
              strokeWidth={2}
              className="text-white"
            />
          </button>
        )}
      </button>
    </div>
  );
}
