export default function MonthlySummaryItem({label}) {
    const monthBalance = 50000000

  return (
    <div className="flex h-full items-center justify-between space-x-6 rounded-[10px] border border-white/10 bg-white/10 px-5">
      <span className="text-2xl font-bold">{label}</span>
      <span
        className={`text-3xl font-bold ${monthBalance < 0 ? "text-gray-400" : "text-blue-400"}`}
      >
        {monthBalance}
      </span>
    </div>
  );
}
