import { Line } from "react-chartjs-2";
import { getStatusStyles } from "@/shared/utils/getStatusStyles";
import { useGetTasksStatistics } from "../api/useGetTasksStatistics";
import type { TaskStatus } from "@/features/tasks/types";

const STATUSES = [
  "todo",
  "in_progress",
  "review",
  "completed",
  "cancelled",
] as const;

const TasksSection = () => {
  const { data, isLoading } = useGetTasksStatistics();

  if (isLoading) return null;

  const labels = data?.data?.map((d) => d.date);

  const datasets = STATUSES.map((status) => {
    const colors = getStatusStyles(status.toUpperCase() as TaskStatus);
    return {
      label: status.replace("_", " ").toUpperCase(),
      data: data?.data?.map((d) => d[status] ?? 0),
      borderColor: colors.color,
      backgroundColor: colors.backgroundColor,
      fill: false,
      tension: 0.3,
      pointRadius: 4,
    };
  });

  return (
    <Line
      key={"tasks_stats"}
      data={{ labels, datasets }}
      options={{
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { position: "bottom" },
          tooltip: { mode: "index", intersect: false },
        },
        scales: {
          x: { title: { display: true, text: "Date" } },
          y: {
            beginAtZero: true,
            title: { display: true, text: "Number of Tasks" },
            ticks: { stepSize: 1 },
          },
        },
      }}
    />
  );
};

export default TasksSection;
