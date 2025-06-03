import { useState, useEffect } from "react";
import AuthButtons from "../components/AuthButtons";
import Header from "../components/Header";
import MonthCalendar from "../components/MonthCalendar";
import DayCalendar from "../components/DayCalendar";
import EntryFormDialog from "../components/EntryFormDialog";
import EntryDetailDialog from "../components/EntryDetailDialog";
import EntryDeleteDialog from "../components/EntryDeleteDialog";
import { firestoreService } from "./firestoreService";
import { today } from "../utils/dateUtils";

export default function App() {
  const [user, setUser] = useState(null);
  const [currentView, setCurrentView] = useState("Day");
  const [currentDate, setCurrentDate] = useState(today);
  const [dialogState, setDialogState] = useState({
    entryForm: false,
    entryDetail: false,
    entryDelete: false,
    viewStats: false,
  });
  const [isEditing, setIsEditing] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState(null);
  const [entries, setEntries] = useState([]);

  const handleCloseEntryForm = () => {
    setDialogState((prev) => ({ ...prev, entryForm: false }));
    setIsEditing(false);
  };

  const handleCloseEntryDetail = () => {
    setDialogState((prev) => ({ ...prev, entryDetail: false }));
  };

  const handleCloseEntryDelete = () => {
    setDialogState((prev) => ({ ...prev, entryDelete: false }));
  };

  const loadEntries = async () => {
    try {
      const data = await firestoreService.getEntries(user.uid); // 這裡從 Firebase 撈資料
      setEntries(data); // 設定到畫面上的 entries 狀態中
    } catch (error) {
      console.error("讀取失敗:", error);
    }
  };

  useEffect(() => {
  if (user) {
    loadEntries(); // 使用者登入後自動載入
  } else {
    setEntries([]);
    setSelectedEntry(null) // 登出時清空資料
  }
}, [user]);

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-slate-950 via-indigo-950 to-slate-950 font-sans text-white">
      <AuthButtons user={user} setUser={setUser} />
      <Header
        currentView={currentView}
        onViewChange={setCurrentView}
        currentDate={currentDate}
        onDateChange={setCurrentDate}
      />

      <main>
        {currentView === "Month" ? (
          <MonthCalendar
            date={currentDate}
            setDialogState={setDialogState}
            entries={entries}
            onViewChange={setCurrentView}
            onDateChange={setCurrentDate}
          />
        ) : (
          <DayCalendar
            date={currentDate}
            onDateChange={setCurrentDate}
            setDialogState={setDialogState}
            entries={entries}
            setSelectedEntry={setSelectedEntry}
          />
        )}
      </main>

      <EntryFormDialog
        open={dialogState.entryForm}
        onClose={handleCloseEntryForm}
        currentDate={currentDate}
        setEntries={setEntries}
        isEditing={isEditing}
        selectedEntry={selectedEntry}
        user={user}
        loadEntries={loadEntries}
      />

      <EntryDetailDialog
        open={dialogState.entryDetail}
        onClose={handleCloseEntryDetail}
        currentDate={currentDate}
        selectedEntry={selectedEntry}
        setSelectedEntry={setSelectedEntry}
        setDialogState={setDialogState}
        setIsEditing={setIsEditing}
      />

      <EntryDeleteDialog
        open={dialogState.entryDelete}
        onClose={handleCloseEntryDelete}
        selectedEntry={selectedEntry}
        setEntries={setEntries}
        user={user}
        loadEntries={loadEntries}
      />
    </div>
  );
}
