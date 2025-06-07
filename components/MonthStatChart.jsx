import { Bar } from "react-chartjs-2";
import { getMonthChartOptions } from "../utils/monthStatChartConfig";

export default function MonthStatChart ({ statsToUse, maxWithBuffer }) {
  const data = {
    labels: statsToUse.map((stat) => stat.label),
    datasets: [{
      data: statsToUse.map((stat) => stat.amount),
      backgroundColor: statsToUse.map((stat) => stat.chartColor),
      borderWidth: 1,
      barThickness: 40,
    }],
  };

  const options = getMonthChartOptions(maxWithBuffer);

  return (
    <div className="h-[480px] w-full px-5">
      <Bar data={data} options={options} />
    </div>
  );
}