import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { 
  onAuthStateChanged, // 監聽使用者登入狀態變化
  signInWithPopup,   // 透過彈跳視窗登入（OAuth provider）
  signOut,           // 登出
  signInAnonymously,  // 訪客匿名登入
  User                // Firebase User 型別
} from "firebase/auth";
import { auth, provider } from "../firebase"; // firebase 初始化檔案，包含 auth 與 provider 物件

interface AuthContextType {
  user: User | null;
  login: () => Promise<void>;
  logout: () => Promise<void>;
  loginAsGuest: () => Promise<void>;
}

// 建立 Context，初始值為 undefined（會在 Provider 中提供）
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // 使用 Firebase 提供的監聽器，當登入狀態改變時自動更新 user 狀態
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
    });
    // 清除監聽器，避免記憶體洩漏
    return unsubscribe;
  }, []);

  // 使用 OAuth provider 透過彈跳視窗登入
  const login = async () => {
    try {
      await signInWithPopup(auth, provider);
    } catch (err) {
      console.error("登入失敗", err);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.error("登出失敗", err);
    }
  };

  // 訪客匿名登入
  const loginAsGuest = async () => {
    try {
      await signInAnonymously(auth);
    } catch (err) {
      console.error("訪客登入失敗", err);
    }
  };

  // 提供 context 值給子元件使用
  return (
    <AuthContext.Provider value={{ user, login, logout, loginAsGuest }}>
      {children}
    </AuthContext.Provider>
  );
};

// 自訂 hook，用來方便在其他元件取得 AuthContext，並做安全檢查
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth 必須在 AuthProvider 內使用");
  return context;
};