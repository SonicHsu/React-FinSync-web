import { useState } from "react";
import AuthButtons from "../components/AuthButtons";
import Header from "../components/Header";
import MonthCalendar from "../components/MonthCalendar";
import DayCalendar from "../components/DayCalendar";
import EntryFormDialog from "../components/EntryFormDialog";
import { today } from "../utils/dateUtils";

export default function App() {
  const [currentView, setCurrentView] = useState("Month");
  const [currentDate, setCurrentDate] = useState(today);
  const [dialogState, setDialogState] = useState({
    entryForm: false,
    entryDetail: false,
    entryDelete: false,
    viewStats: false,
  });

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-slate-950 via-indigo-950 to-slate-950 font-sans text-white">
      <AuthButtons />
      <Header
        currentView={currentView}
        onViewChange={setCurrentView}
        currentDate={currentDate}
        onDateChange={setCurrentDate}
      />

      <main>
        {currentView === "Month" ? (
          <MonthCalendar date={currentDate} setDialogState={setDialogState} />
        ) : (
          <DayCalendar
            date={currentDate}
            onDateChange={setCurrentDate}
            setDialogState={setDialogState}
          />
        )}
      </main>

      <EntryFormDialog
        open={dialogState.entryForm}
        onClose={() =>
          setDialogState((prev) => ({ ...prev, entryForm: false }))
        }
      />
    </div>
  );
}
