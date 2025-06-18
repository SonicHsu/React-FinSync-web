import { useEffect, useRef } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js";

import { getMonthChartOptions } from "../../utils/monthStatChartConfig";
import { useBreakpoint } from "../../hooks/useBreakpoint";
import { CategoryStat } from "../../types";
import type { ChartOptions } from "chart.js";

interface MonthStatChartProps {
  statsToUse: CategoryStat[];
  maxWithBuffer: number;
}

export default function MonthStatChart({
  statsToUse,
  maxWithBuffer,
}: MonthStatChartProps) {
  const chartRef = useRef<ChartJS<"bar"> | undefined>(undefined);

  const { isMobile } = useBreakpoint();
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
        barThickness: isMobile ? 20 : 40,
      },
    ],
  };

  const options: ChartOptions<"bar"> = getMonthChartOptions(maxWithBuffer, isMobile);

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
    <div className="h-[310px] w-full flex-1 px-5 sm:h-[480px]">
      <Bar
        ref={chartRef}
        key={isMobile ? "mobile" : "desktop"}
        data={data}
        options={options}
      />
    </div>
  );
}
