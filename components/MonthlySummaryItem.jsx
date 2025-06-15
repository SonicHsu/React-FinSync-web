export default function MonthlySummaryItem({ label, value, valueBgColor, valueColor }) {
  return (
    <div className={`flex sm:flex-col lg:flex-row  min-w-[100px] lg:min-w-[220px]  sm:w-full sm:min-w-[160px] items-center justify-between rounded-[10px] border border-white/10  px-5 ${valueBgColor}`}>
      <span className="text-xl lg:text-2xl font-bold">{label}</span>
      <span className={`text-xl sm:text-2xl lg:text-3xl font-bold ${valueColor}`}>{value}</span>
    </div>
  );
}
