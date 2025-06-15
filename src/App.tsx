import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import AuthButtons from "../components/AuthButtons";
import CalendarPage from "../Pages/CalendarPage";
import StatsPage from "../Pages/StatsPage";
import LoginPage from "../Pages/LoginPage";
import NotFoundPage from "../Pages/NotFoundPage";
import { firestoreService } from "./firestoreService";
import { today } from "../utils/dateUtils";
import "../utils/chartSetup";

import { Entry, DialogState } from "./types";


export default function App() {
  const { user, login, logout, loginAsGuest } = useAuth();

  const [currentDate, setCurrentDate] = useState<Date>(today);
  const [dialogState, setDialogState] = useState<DialogState>({
    entryForm: false,
    entryDetail: false,
    entryDelete: false,
    viewStats: false,
  });
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [selectedEntry, setSelectedEntry] = useState<Entry | null>(null);
  const [entries, setEntries] = useState<Entry[]>([]);



  const loadEntries = async () => {
    if (!user) return;

    try {
      const firestoreData = await firestoreService.getEntries(user.uid); // 這裡從 Firebase 撈資料
      const entries: Entry[] = firestoreData.map(({ firebaseId, ...entry }) => entry);
      setEntries(entries);
    } catch (error) {
      console.error("讀取失敗:", error);
    }
  };

  useEffect(() => {
    if (user) {
      loadEntries(); // 使用者登入後自動載入
    } else {
      setEntries([]);
      setSelectedEntry(null); // 登出時清空資料
    }
  }, [user]);

  return (
    <Router>
      <div className="flex h-screen flex-col bg-gradient-to-b from-slate-950 via-indigo-950 to-slate-950 font-sans text-white">
        <Routes>
          <Route
            path="/"
            element={
              user ? (
                <>
                  <AuthButtons user={user} login={login} logout={logout} />
                  <CalendarPage
                    user={user}
                    currentDate={currentDate}
                    setCurrentDate={setCurrentDate}
                    dialogState={dialogState}
                    setDialogState={setDialogState}
                    entries={entries}
                    setEntries={setEntries}
                    selectedEntry={selectedEntry}
                    setSelectedEntry={setSelectedEntry}
                    isEditing={isEditing}
                    setIsEditing={setIsEditing}
                    loadEntries={loadEntries}
                  />
                </>
              ) : (
                <Navigate to="/login" />
              )
            }
          />

          <Route
            path="/stats"
            element={
              user ? (
                <>
                  <AuthButtons user={user} login={login} logout={logout} />
                  <StatsPage
                    currentDate={currentDate}
                    setCurrentDate={setCurrentDate}
                    entries={entries}
                  />
                </>
              ) : (
                <Navigate to="/login" />
              )
            }
          />

          <Route
            path="/login"
            element={
              !user ? (
                <LoginPage login={login} loginAsGuest={loginAsGuest} />
              ) : (
                <Navigate to="/" />
              )
            }
          />

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </Router>
  );
}
