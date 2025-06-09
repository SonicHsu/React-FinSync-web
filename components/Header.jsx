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
  const isStatsPage = location.pathname === '/stats';

  const navigate = useNavigate();

  const handleHomeButton = () => {
    navigate("/");
  };

  const handleStatTypeChange = (newStatType) => {
      setStatType(newStatType)
  }
  return (
    <header className="mx-auto mt-1 flex h-auto lg:h-[62px] w-full px-4 sm:w-[90%] lg:w-[981px] items-center justify-center lg:justify-between">
      <div>
        <h1
          className="cursor-pointer text-2xl sm:text-4xl lg:text-5xl font-bold"
          onClick={handleHomeButton}
        >
          FinSync
        </h1>
      </div>

      <nav className="hidden lg:flex  items-center space-x-10">
        <DatePicker
          isStatsPage={isStatsPage}
          currentView={currentView}
          currentDate={currentDate}
          onDateChange={onDateChange}
        />
        {!isStatsPage ? <ViewToggle currentView={currentView} onViewChange={onViewChange} /> : <IncomeExpenseToggleForStats statType={statType} handleStatTypeChange={handleStatTypeChange}  />}
      </nav>
    </header>
  );
}
