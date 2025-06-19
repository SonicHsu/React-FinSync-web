import { useEffect, useRef } from "react";
import { useAuth } from "../../contexts/authContext";

interface MobileAuthButtonsProps {
  closeAuth: () => void;
}

export default function MobileAuthButtons({ closeAuth }: MobileAuthButtonsProps) {
  const { user, login, logout } = useAuth();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        closeAuth(); // 點外面 => 關閉
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [closeAuth]);

  if (!user) {
    return null; // 或者你可以返回一個空的 React.Fragment: <> </>
  }

  return (
    <div
      ref={ref}
      className="mt-2 flex items-center justify-center space-x-2 rounded-lg px-4 py-2"
    >
      {user.isAnonymous ? (
        <button
          className="cursor-pointer rounded-xl border border-white/20 bg-gray-800/60 px-5 py-1 text-lg font-semibold hover:bg-gray-700"
          onClick={login}
        >
          登入
        </button>
      ) : (
        <button
          className="cursor-pointer rounded-xl border border-white/20 bg-gray-800/60 px-5 py-1 text-lg font-semibold hover:bg-gray-700"
          onClick={logout}
        >
          登出
        </button>
      )}
    </div>
  );
}
