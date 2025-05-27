import DatePicker from "./DatePicker";
import ViewToggle from "./ViewToggle";


export default function Header({ currentView, onViewChange, currentDate, onDateChange }) {
  return (
    <header className="mx-auto mt-1 flex h-[62px] w-[981px] items-center justify-between">
      <div>
        <h1 className="text-5xl font-bold">FinSync</h1>
      </div>

      <nav className="flex items-center space-x-10">
        <DatePicker currentView={currentView} currentDate={currentDate} onDateChange={onDateChange}/>
        <ViewToggle currentView={currentView} onViewChange={onViewChange} />
      </nav>
    </header>
  );
}
