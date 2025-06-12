export function getMonthChartOptions(maxWithBuffer, isMobile) {

  const fontSize = isMobile ? 14 : 24;
  const labelFontSize = isMobile ? 18 : 30;

  return {
    indexAxis: "y",
    responsive: true,
    maintainAspectRatio: false,
    aspectRatio: isMobile ? undefined : 2,
    plugins: {
      legend: { display: false },
      title: { display: false },
      tooltip: { enabled: false },
      datalabels: {
        anchor: "end",
        align: "end",
        color: "white",
        font: { weight: "500", size: labelFontSize },
        formatter: (value) => value === 0 ? "" : value,
      },
    },
    scales: {
      x: {
        beginAtZero: true,
        max: maxWithBuffer,
        ticks: { display: false },
        grid: { display: false },
        border: { display: false },
      },
      y: {
        ticks: {
          display: true,
          font: { size: fontSize },
          color: "white",
        },
        grid: { display: false },
      },
    },
  };
}
