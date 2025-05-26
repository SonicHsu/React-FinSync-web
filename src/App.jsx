import { useState } from "react";
import AuthButtons from "../components/AuthButtons";
import Header from "../components/Header";
import { today } from "../utils/dateUtils";

export default function App() {
  const [currentView, setCurrentView] = useState("Month");
  const [currentDate, setCurrentDate] = useState(today);

  console.log(currentDate)

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-slate-950 via-indigo-950 to-slate-950 font-sans text-white">
      <AuthButtons />
      <Header 
      currentView={currentView} onViewChange={setCurrentView}
      currentDate={currentDate} onDateChange={setCurrentDate}
      
      />
      
    </div>
  );
}
