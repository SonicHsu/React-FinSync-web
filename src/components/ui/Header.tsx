import DatePicker from "./DatePicker";
import ViewToggle from "./ViewToggle";
import IncomeExpenseToggleForStats from "../stats/IncomeExpenseToggleForStats";
import { useNavigate, useLocation } from "react-router-dom";


export default function Header() {
  const location = useLocation();
  // 取得當前路徑，決定是否為統計頁面

  const isStatsPage:boolean = location.pathname === "/stats";
   // 判斷是否在統計頁（路由是 /stats）

  const navigate = useNavigate();
  // 取得導航函式，用於頁面跳轉

  const handleHomeButton = () => {
    navigate("/");
  };

  return (
    <header className="mx-auto mt-1 flex flex-col sm:flex-row h-auto w-full items-center justify-center sm:w-[90%] lg:h-[62px] lg:w-[90%] max-w-[981px] sm:justify-between">
      <div>
        <h1
          className="cursor-pointer text-2xl font-bold sm:text-4xl lg:text-5xl"
          onClick={handleHomeButton}
        >
          FinSync
        </h1>
      </div>

      <nav className={`${isStatsPage ? "" : "hidden"} items-center space-x-2  sm:space-x-3 flex sm:flex lg:space-x-10 mt-2 lg:mt-0`}>
        <DatePicker
          isStatsPage={isStatsPage}
          // 傳入是否為統計頁的狀態，控制 DatePicker 行為與顯示
        />
        {!isStatsPage ? (
          <ViewToggle />
        ) : (
          <IncomeExpenseToggleForStats
          />
        )}
      </nav>
    </header>
  );
}
