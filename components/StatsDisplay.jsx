import { isTheSameMonth } from "../utils/dateUtils"
import { calculateCategoryStats } from "../utils/calculator"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);


export default function StatsDisplay({entries, currentDate}) {
    const { expenseStats, incomeStats } = calculateCategoryStats(entries, currentDate, isTheSameMonth)

    console.log(expenseStats)
    console.log(incomeStats)

    // 圖表選項配置
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: '月銷售數據統計',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  // 圖表數據
  const data = {
    labels: ['一月', '二月', '三月', '四月', '五月', '六月'],
    datasets: [
      {
        label: '銷售額 (萬元)',
        data: [12, 19, 8, 15, 22, 18],
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
        borderColor: 'rgba(53, 162, 235, 1)',
        borderWidth: 1,
      },
      {
        label: '利潤 (萬元)',
        data: [8, 12, 5, 9, 15, 11],
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
    ],}

    return(
        <div className="mx-auto mt-8 flex w-[981px] flex-col rounded-[10px] bg-gray-800/30 items-center justify-between">
             <Bar data={data} options={options} />
            <h1>{expenseStats[0].amount}</h1>
            <h1>{expenseStats[1].amount}</h1>
            <h1>{expenseStats[2].amount}</h1>
            <h1>{expenseStats[3].amount}</h1>
            <h1>{expenseStats[4].amount}</h1>
            <h1>{expenseStats[5].amount}</h1>
        </div>
    )
}