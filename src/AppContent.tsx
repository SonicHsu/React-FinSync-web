import React from 'react';
import { Routes, Route, Navigate } from "react-router-dom";
import AuthButtons from "./components/AuthButtons";
import CalendarPage from "./pages/CalendarPage";
import StatsPage from "./pages/StatsPage";
import LoginPage from "./pages/LoginPage";
import NotFoundPage from "./pages/NotFoundPage";
import { useAuth } from "./contexts/authContext";

// 保護路由組件
interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { user } = useAuth(); // 從 AuthContext 獲取 user

  // 如果 user 還在載入中 (例如 onAuthStateChanged 還沒有結果)，你可能希望顯示一個載入畫面
  // 這裡簡化為直接判斷 user 是否存在
  if (user === undefined) { // 如果你想區分載入狀態，可以在 useAuth 中提供 loading 狀態
    return <div>載入中...</div>; // 或者一個 Spinner
  }
  
  if (!user) {
    return <Navigate to="/login" />;
  }
  return children;
};

export default function AppContent() {
    const { user } = useAuth();

  return (
    <div className="flex h-screen flex-col bg-gradient-to-b from-slate-950 via-indigo-950 to-slate-950 font-sans text-white">
      <Routes>
        {/* 首頁：受保護 */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              {/* AuthButtons 和 CalendarPage 現在在 ProtectedRoute 內部，可以自行使用 useAuth 和 useEntryContext */}
              <AuthButtons /> 
              <CalendarPage /> 
            </ProtectedRoute>
          }
        />

        {/* 統計頁面：受保護 */}
        <Route
          path="/stats"
          element={
            <ProtectedRoute>
              <AuthButtons/>
              <StatsPage />
            </ProtectedRoute>
          }
        />

        {/* 登入頁面：如果已登入則重定向到首頁 */}
        <Route
          path="/login"
          element={
            !user ? (
              <LoginPage  />
            ) : (
              <Navigate to="/" />
            )
          }
        />

        {/* 404 頁面 */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}
