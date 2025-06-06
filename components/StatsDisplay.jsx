import { useState, useEffect } from "react";
import { isTheSameMonth } from "../utils/dateUtils";
import {
  calculateCategoryStats,
  getYearlyMonthlyTotals,
} from "../utils/calculator";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartDataLabels,
);

export default function StatsDisplay({ entries, currentDate }) {
  const yearlyTotals = getYearlyMonthlyTotals(entries, currentDate); //取得當年度每月最大支出或收入作為圖表基準
  const maxValue = Math.max(
    ...yearlyTotals.map((item) =>
      Math.max(item.expenseTotal, item.incomeTotal),
    ),
  );
  const maxWithBuffer = Math.ceil(maxValue * 1.2);
  const { expenseStats, incomeStats } = calculateCategoryStats(
    entries,
    currentDate,
    isTheSameMonth,
  );

  const expenseLabels = expenseStats.map((stat) => stat.label);
  const expenseAmounts = expenseStats.map((stat) => stat.amount);
  const expenseChartColors = expenseStats.map((stat) => stat.chartColor);

  const incomeLabels = incomeStats.map((stat) => stat.label);
  const incomeAmounts = incomeStats.map((stat) => stat.amount);
  const incomeChartColors = incomeStats.map((stat) => stat.chartColor);

  const [isExpense, setIsExpense] = useState(true);
  const labels = isExpense ? expenseLabels : incomeLabels;
  const amounts = isExpense ? expenseAmounts : incomeAmounts;
  const colors = isExpense ? expenseChartColors : incomeChartColors;

  // 圖表數據
  const data = {
    labels: labels,
    datasets: [
      {
        label: "支出金額",
        data: amounts,
        backgroundColor: colors,
        borderWidth: 1,
      },
    ],
  };

  // 圖表選項配置
  const options = {
    indexAxis: "y",
    responsive: true,

    plugins: {
      legend: {
        display: false, // 關掉圖例
      },
      title: {
        display: false, // 關掉標題
      },
      tooltip: {
        enabled: false, // 👈 這行關掉滑鼠提示
      },
      datalabels: {
        anchor: "end", // 文字在長條中間
        align: "end", // 文字對齊中間
        color: "white", // 文字顏色
        font: {
          weight: "500",
          size: 30,
        },
        formatter: (value) => {
          if (value === 0) return "";
          return value;
        }, // 顯示的值
      },
    },

    scales: {
      x: {
        beginAtZero: true,
        max: maxWithBuffer,
        ticks: {
          //關掉軸上的刻度文字
          display: false,
        },
        grid: {
          //關掉內部的網格線
          display: false,
        },
        border: {
          display: false, //關掉底線
        },
      },

      y: {
        ticks: {
          display: true,
          font: {
            size: 24, // 👈 想要多大就設多大（單位是 px）
          },
          color: "white",
        },
        grid: {
          //關掉內部的網格線
          display: false,
        },
      },
    },
  };

  return (
    <div className="mx-auto mt-8 flex w-[981px] flex-col items-center justify-between rounded-[10px] bg-gray-800/30">
      <h2 className="mt-5 text-4xl font-bold">月統計</h2>
      <div className="h-[480px] w-full px-5">
        <Bar data={data} options={options} />
      </div>

      <h1>{expenseStats[0].amount}</h1>
      <h1>{expenseStats[1].amount}</h1>
      <h1>{expenseStats[2].amount}</h1>
      <h1>{expenseStats[3].amount}</h1>
      <h1>{expenseStats[4].amount}</h1>
      <h1>{expenseStats[5].amount}</h1>
    </div>
  );
}
