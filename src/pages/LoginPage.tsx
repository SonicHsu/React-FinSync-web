import { useAuth } from "../contexts/authContext";
import { UserRound, Mail } from "lucide-react";

import toast from "react-hot-toast";

export default function LoginPage() {
  const { login, loginAsGuest } = useAuth();

  const handleLogin = async () => {
    const { success, errorMsg } = await login();
    if (success) {
      toast.success("登入成功");
    } else {
      toast.error(errorMsg || "登入失敗，請稍後再試！");
    }
  };

  const handleLoginAsGuest = async () => {
    const { success, errorMsg } = await loginAsGuest();
    if (success) {
      toast.success("訪客登入成功");
    } else {
      toast.error(errorMsg || "訪客登入失敗，請稍後再試！");
    }
  };

  return (
    <main className="mx-auto mt-30 flex w-[90%] max-w-sm flex-col items-center rounded-[10px] border border-blue-400/50 bg-slate-950/80 sm:mt-36 sm:max-w-md lg:mt-40">
      <section className="mt-3">
        <header className="flex flex-col space-y-3 text-center">
          <h1 className="mt-3 text-4xl font-bold lg:text-5xl">FinSync</h1>
          <p className="text-lg font-light text-white/80 lg:text-xl">
            專為個人打造的輕量級記帳系統
          </p>
        </header>
      </section>

      <section className="mt-4 mb-6 flex flex-col space-y-4 sm:mt-6">
        <button
          className="flex cursor-pointer items-center justify-center gap-x-2 rounded-full bg-slate-700/20 px-6 py-3 text-sm text-gray-400 hover:bg-slate-700/50 hover:text-white sm:px-15 lg:text-lg"
          onClick={handleLogin}
        >
          <Mail className="h-5 w-5" />
          Log in with Google
        </button>

        <button
          className="flex cursor-pointer items-center justify-center gap-x-2 rounded-full bg-slate-700/20 px-6 py-3 text-sm text-gray-400 hover:bg-slate-700/50 hover:text-white sm:px-15 lg:text-lg"
          onClick={handleLoginAsGuest}
        >
          <UserRound size={20} />
          Continue as Guest
        </button>
      </section>
    </main>
  );
}
