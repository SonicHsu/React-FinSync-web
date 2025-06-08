export default function MonthlySummaryItem({ label, value, valueBgColor, valueColor }) {
  return (
    <div className={`flex h-full min-w-[220px] items-center justify-between space-x-6 rounded-[10px] border border-white/10  px-5 ${valueBgColor}`}>
      <span className="text-2xl font-bold">{label}</span>
      <span className={`text-3xl font-bold ${valueColor}`}>{value}</span>
    </div>
  );
}
