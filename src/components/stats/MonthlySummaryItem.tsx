interface MonthlySummaryItemProps {
  label: string;
  value: number;
  valueBgColor: string;
  valueColor: string;
}

export default function MonthlySummaryItem({
  label,
  value,
  valueBgColor,
  valueColor,
}: MonthlySummaryItemProps) {
  return (
    <div
      className={`flex min-w-[100px] items-center justify-between rounded-[10px] border border-white/10 px-5 sm:w-full sm:min-w-[160px] sm:flex-col lg:min-w-[220px] lg:flex-row ${valueBgColor}`}
    >
      <span className="text-xl font-bold lg:text-2xl">{label}</span>
      <span
        className={`text-xl font-bold sm:text-2xl lg:text-3xl ${valueColor}`}
      >
        {value}
      </span>
    </div>
  );
}
