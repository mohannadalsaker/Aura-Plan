import { Line } from "react-chartjs-2";
import { getStatusStyles } from "@/shared/utils/getStatusStyles";
import { useGetTasksStatistics } from "../api/useGetTasksStatistics";
import type { TaskStatus } from "@/features/tasks/types";
import Loader from "@/shared/components/Loader";
import { Stack, Typography } from "@mui/material";

const STATUSES = [
  "todo",
  "in_progress",
  "review",
  "completed",
  "cancelled",
] as const;

const TasksSection = () => {
  const { data, isLoading } = useGetTasksStatistics();

  if (isLoading) return <Loader />;

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

  return data && data?.data?.length > 0 ? (
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
  ) : (
    <Stack
      justifyContent={"center"}
      alignItems={"center"}
      height={"100%"}
      px={1}
    >
      <Typography
        sx={{
          typography: "h6",
          fontWeight: 500,
          textAlign: "center",
        }}
      >
        There are no tasks yet
      </Typography>
    </Stack>
  );
};

export default TasksSection;
