import { Bar } from "react-chartjs-2";
import { useGetTopUsers } from "../api/useGetTopUsers";
import Loader from "@/shared/components/Loader";
import { Stack, Typography } from "@mui/material";

const TopUsersSection = () => {
  const { data, isLoading } = useGetTopUsers();

  if (isLoading) return <Loader />;

  const labels = data?.data?.map((user) => user.username);

  const taskCounts = data?.data?.map((user) => user._count.tasks);

  const isTasksEmpty = data?.data?.reduce((acc, curr) => {
    return acc + curr._count.tasks;
  }, 0);

  return isTasksEmpty !== 0 ? (
    <Bar
      key={"users_stats"}
      data={{
        labels: labels,
        datasets: [
          {
            label: "Tasks Completed",
            data: taskCounts,
            backgroundColor: "#0d9488",
            borderRadius: 4,
          },
        ],
      }}
      options={{
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
        },
        scales: {
          x: {
            grid: {
              display: false,
            },
            border: {
              display: true,
              color: "#cbd5e1",
            },
          },
          y: {
            beginAtZero: true,
            ticks: { stepSize: 1 },
            grid: {
              display: false,
            },
            border: {
              display: true,
              color: "#cbd5e1",
            },
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
        There are no user tasks yet
      </Typography>
    </Stack>
  );
};

export default TopUsersSection;
