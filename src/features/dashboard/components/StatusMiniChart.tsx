import type { TaskStatus } from "@/features/tasks/types";
import { getStatusStyles } from "@/shared/utils/getStatusStyles";
import { useMemo } from "react";
import { Line } from "react-chartjs-2";

type Props = {
  labels: string[];
  data: number[];
  status: TaskStatus;
};

const StatusMiniChart = ({ labels, data, status }: Props) => {
  const colors = getStatusStyles(status);
  console.log(status, colors, data);
  const chartData = useMemo(
    () => ({
      labels,
      datasets: [
        {
          data,
          tension: 0.35,
          fill: data.length > 1,
          borderWidth: 2,
          pointRadius: data.length === 1 ? 4 : 0,
          borderColor: colors.color,
          backgroundColor: colors.backgroundColor,
        },
      ],
    }),
    [labels, data, colors],
  );

  const options = useMemo(
    () => ({
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          mode: "index" as const,
          intersect: false,
        },
      },
      scales: {
        x: {
          display: true,
        },
        y: {
          display: true,
          beginAtZero: true,
        },
      },
    }),
    [],
  );

  return (
    <div style={{ height: 60 }}>
      <Line data={chartData} options={options} />
    </div>
  );
};

export default StatusMiniChart;
