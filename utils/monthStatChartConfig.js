export function padChartData(stats, maxCount) {
  const filledStats = [...stats];
  while (filledStats.length < maxCount) {
    filledStats.push({
      label: "",
      amount: 0,
      chartColor: "rgba(0,0,0,0)",
    });
  }
  return filledStats;
}

export function getMonthChartOptions(maxWithBuffer) {
  return {
    indexAxis: "y",
    responsive: true,
    plugins: {
      legend: { display: false },
      title: { display: false },
      tooltip: { enabled: false },
      datalabels: {
        anchor: "end",
        align: "end",
        color: "white",
        font: { weight: "500", size: 30 },
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
          font: { size: 24 },
          color: "white",
        },
        grid: { display: false },
      },
    },
  };
}
