export default function NotFoundPage() {
  return (
    <main className="mt-60 flex flex-col items-center justify-center text-gray-700">
      <h1 className="mb-4 text-6xl font-bold text-white">404</h1>
      <p className="mb-6 text-xl text-white">哎呀，找不到這個頁面。</p>
      <button
        className="flex cursor-pointer items-center justify-center gap-x-2 rounded-full bg-slate-700/20 px-15 py-3 text-xl text-gray-400 hover:bg-slate-700/50 hover:text-white "
        onClick={() => (window.location.href = "/")}
      >
        回到首頁
      </button>
    </main>
  );
}
