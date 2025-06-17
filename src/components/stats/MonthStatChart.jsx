import { useEffect, useRef } from "react";
import { Bar } from "react-chartjs-2";
import { getMonthChartOptions } from "../../utils/monthStatChartConfig";
import { useBreakpoint } from "../../hooks/useBreakpoint";

export default function MonthStatChart({
  statsToUse,
  maxWithBuffer,
}) {
  const chartRef = useRef(null);

  const { isMobile } = useBreakpoint();
  const data = {
    labels: statsToUse.map((stat) => stat.label),
    datasets: [
      {
        data: statsToUse.map((stat) => stat.amount),
        backgroundColor: statsToUse.map((stat) => stat.chartColor),
        barPercentage: isMobile ? 0.5 : 0.7,
        categoryPercentage: isMobile ? 0.6 : 0.8,
        borderWidth: 1,
        barThickness: isMobile ? 20 : 40,
      },
    ],
  };

  const options = getMonthChartOptions(maxWithBuffer);

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
    <div className="w-full flex-1 px-5 h-[310px] sm:h-[480px]">
      <Bar
        ref={chartRef}
        key={isMobile ? "mobile" : "desktop"}
        data={data}
        options={options}
      />
    </div>
  );
}