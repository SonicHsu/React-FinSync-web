export default function MonthlySummaryItem({ label, value, valueBgColor, valueColor }) {
  return (
    <div className={`flex  min-w-[100px] sm:min-w-[220px] sm:w-full items-center justify-between rounded-[10px] border border-white/10  px-5 ${valueBgColor}`}>
      <span className="text-xl lg:text-2xl font-bold">{label}</span>
      <span className={`text-xl lg:text-3xl font-bold ${valueColor}`}>{value}</span>
    </div>
  );
}
