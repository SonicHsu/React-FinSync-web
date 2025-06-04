import DatePicker from "./DatePicker";
import ViewToggle from "./ViewToggle";
import { useNavigate } from "react-router-dom";


export default function Header({ currentView, onViewChange, currentDate, onDateChange }) {
const navigate = useNavigate();

const handleHomeButton = () => {
    navigate("/");
  };
  return (
    <header className="mx-auto mt-1 flex h-[62px] w-[981px] items-center justify-between">
      <div>
        <h1 className="text-5xl font-bold cursor-pointer" onClick={handleHomeButton}>FinSync</h1>
      </div>

      <nav className="flex items-center space-x-10">
        <DatePicker currentView={currentView} currentDate={currentDate} onDateChange={onDateChange}/>
        <ViewToggle currentView={currentView} onViewChange={onViewChange} />
      </nav>
    </header>
  );
}
