import DatePicker from "./DatePicker";
import ViewToggle from "./ViewToggle";
import IncomeExpenseToggleForStats from "./IncomeExpenseToggleForStats";
import { useNavigate, useLocation } from "react-router-dom";

export default function Header({
  currentView,
  onViewChange,
  currentDate,
  onDateChange,
  statType,
  setStatType,
}) {
  const location = useLocation();
  const isStatsPage = location.pathname === "/stats";

  const navigate = useNavigate();

  const handleHomeButton = () => {
    navigate("/");
  };

  const handleStatTypeChange = (newStatType) => {
    setStatType(newStatType);
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
          currentView={currentView}
          currentDate={currentDate}
          onDateChange={onDateChange}
        />
        {!isStatsPage ? (
          <ViewToggle currentView={currentView} onViewChange={onViewChange} />
        ) : (
          <IncomeExpenseToggleForStats
            statType={statType}
            handleStatTypeChange={handleStatTypeChange}
          />
        )}
      </nav>
    </header>
  );
}
