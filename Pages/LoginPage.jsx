export default function LoginPage({login, loginAsGuest}) {
  return (
    <main className="mx-auto mt-40 flex h-[280px] w-[420px] flex-col items-center rounded-[10px] border border-blue-400/50 bg-slate-950/80">
      <section className="mt-3">
        <header className="flex flex-col space-y-3 text-center">
          <h1 className="mt-3 text-5xl font-bold">FinSync</h1>
          <p className="text-lg font-light text-white/80">
            專為個人打造的輕量級記帳系統
          </p>
        </header>
      </section>

      <section className="mt-6 flex flex-col space-y-4">
        <button className="flex cursor-pointer items-center justify-center gap-x-2 rounded-full bg-slate-700/20 px-15 py-3 text-lg text-gray-400 hover:bg-slate-700/50 hover:text-white" onClick={login}>
          <img src="/public/google-icon.svg" alt="Google" className="h-6 w-6" />
          Log in with Google
        </button>

        <button className="flex cursor-pointer items-center justify-center gap-x-2 rounded-full bg-slate-700/20 px-15 py-3 text-lg text-gray-400 hover:bg-slate-700/50 hover:text-white" onClick={loginAsGuest}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-circle-user-round-icon lucide-circle-user-round"
          >
            <path d="M18 20a6 6 0 0 0-12 0" />
            <circle cx="12" cy="10" r="4" />
            <circle cx="12" cy="12" r="10" />
          </svg>
          Continue as Guest
        </button>
      </section>
    </main>
  );
}
