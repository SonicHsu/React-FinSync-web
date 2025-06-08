import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import AuthButtons from "../components/AuthButtons";
import CalendarPage from "../Pages/CalendarPage";
import StatsPage from "../Pages/StatsPage";
import LoginPage from "../Pages/LoginPage";
import { firestoreService } from "./firestoreService";
import { today } from "../utils/dateUtils";
import "../utils/chartSetup";

export default function App() {
  const [user, setUser] = useState(null);
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

  const loadEntries = async () => {
    try {
      const data = await firestoreService.getEntries(user.uid); // 這裡從 Firebase 撈資料
      setEntries(data);
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
      <div className="flex min-h-screen flex-col bg-gradient-to-b from-slate-950 via-indigo-950 to-slate-950 font-sans text-white">
        <AuthButtons user={user} setUser={setUser} />

        <Routes>
          <Route
            path="/"
            element={user ?
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
              /> :
               <Navigate to="/login" />
            }
          />

          <Route
            path="/stats"
            element={
              user ?
              <StatsPage
                currentDate={currentDate}
                setCurrentDate={setCurrentDate}
                entries={entries}
              /> :
               <Navigate to="/login" />
            }
          />

          <Route path="/login" element={!user ? <LoginPage /> : <Navigate to="/" />}/>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}
