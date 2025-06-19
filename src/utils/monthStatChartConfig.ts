import { useResponsiveValue } from "../hooks/useResponsiveValue";
import type { ChartOptions } from "chart.js";

// 取得針對當月統計的 Chart.js 橫條圖設定
export function getMonthChartOptions(maxWithBuffer: number, isMobile: boolean):
ChartOptions<"bar"> {

  const fontSize = useResponsiveValue({
  mobile: 18,
  tablet: 20,
  desktop: 24
});
  const labelFontSize = useResponsiveValue({
  mobile: 22,
  tablet: 26,
  desktop: 30
});

  return {
    indexAxis: "y", // 設定為橫向條形圖（Y軸為主要軸）
    responsive: true, // 啟用響應式設計
    maintainAspectRatio: false, // 不保持固定寬高比
    aspectRatio: isMobile ? undefined : 2, // 非行動裝置設定寬高比為2:1
    plugins: {
      legend: { display: false }, // 隱藏圖例
      title: { display: false },  // 隱藏標題
      tooltip: { enabled: false }, // 禁用工具提示
      datalabels: {
        anchor: "end", // 標籤定位在條形末端
        align: "end", // 標籤對齊條形末端
        color: "white", // 標籤文字顏色
        font: { weight: 500, size: labelFontSize }, // 字體粗細 字體大小
        formatter: (value) => value === 0 ? "" : value,
      },
    },
    scales: {
      x: { // X軸配置（水平條形圖的數值軸）
        beginAtZero: true, // 從零開始
        max: maxWithBuffer, // 設定最大值（含緩衝空間）
        ticks: { display: false }, // 隱藏刻度標籤
        grid: { display: false },  // 隱藏網格線
        border: { display: false }, // 隱藏軸線
      },
      y: { // Y軸配置（水平條形圖的類別軸）
        ticks: {
          display: true, // 顯示刻度標籤
          font: { size: fontSize }, // 字體大小
          color: "white", // 刻度文字顏色
        },
        grid: { display: false }, // 隱藏網格線
      },
    },
  };
}
