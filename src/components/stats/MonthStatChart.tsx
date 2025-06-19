import { useEffect, useRef } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js";
import { useResponsiveValue } from "../../hooks/useResponsiveValue";
import { getMonthChartOptions } from "../../utils/monthStatChartConfig";
import { useBreakpoint } from "../../hooks/useBreakpoint";
import { CategoryStat } from "../../types";
import type { ChartOptions } from "chart.js";

interface MonthStatChartProps {
  statsToUse: CategoryStat[]; // 傳入的圖表資料陣列（包含 label、amount、顏色等）
  maxWithBuffer: number; // y 軸最大值（含緩衝），用來調整圖表刻度
}

export default function MonthStatChart({
  statsToUse,
  maxWithBuffer,
}: MonthStatChartProps) {
  // 取得 Chart.js 實例的引用，以便操作
  const chartRef = useRef<ChartJS<"bar"> | undefined>(undefined);

  const { isMobile } = useBreakpoint();

    const barSize = useResponsiveValue({
    mobile: 22,
    tablet: 26,
    desktop: 30
  });

  // Chart.js 需要的資料格式
  const data = {
    labels: statsToUse.map((stat: CategoryStat) => stat.label),
    datasets: [
      {
        data: statsToUse.map((stat: CategoryStat) => stat.amount),
        backgroundColor: statsToUse.map(
          (stat: CategoryStat) => stat.chartColor,
        ),
        barPercentage: isMobile ? 0.5 : 0.7,
        categoryPercentage: isMobile ? 0.6 : 0.8,
        borderWidth: 1,
        barThickness: barSize,
      },
    ],
  };

  // 取得圖表設定（options），包含坐標軸、顯示細節等
  const options: ChartOptions<"bar"> = getMonthChartOptions(maxWithBuffer, isMobile);

  // 監聽視窗大小變化，並通知 Chart.js 重繪
  useEffect(() => {
    function handleResize() {
      if (chartRef.current) {
        chartRef.current.resize();
        chartRef.current.update();
      }
    }

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="h-[310px] w-full flex-1 px-5 sm:h-[400px]">
      <Bar
        ref={chartRef}
        key={isMobile ? "mobile" : "desktop"} // 依據裝置類型強制重繪，避免樣式錯亂
        data={data}
        options={options}
      />
    </div>
  );
}
