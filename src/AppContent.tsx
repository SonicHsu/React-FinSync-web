import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AuthButtons from "./components/ui/AuthButtons";
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

  if (user === undefined) {
    return <div>載入中...</div>;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }
  return children;
};

export default function AppContent() {
  const { user } = useAuth();

  return (
    <div
      className="flex h-screen flex-col bg-gradient-to-b font-sans text-white"
      style={{
        background: `
    radial-gradient(circle at 15% 30%, rgba(79, 70, 229, 0.2) 0%, transparent 50%),
    radial-gradient(circle at 85% 70%, rgba(109, 73, 186, 0.15) 0%, transparent 50%),
    linear-gradient(135deg, rgb(2 6 23) 0%, rgb(15 23 42) 50%, rgb(2 6 23) 100%)
  `,
      }}
    >
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
              <AuthButtons />
              <StatsPage />
            </ProtectedRoute>
          }
        />

        {/* 登入頁面：如果已登入則重定向到首頁 */}
        <Route
          path="/login"
          element={!user ? <LoginPage /> : <Navigate to="/" />}
        />

        {/* 404 頁面 */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}
