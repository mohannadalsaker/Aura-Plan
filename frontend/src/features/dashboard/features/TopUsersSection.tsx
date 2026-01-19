import { Bar } from "react-chartjs-2";
import { useGetTopUsers } from "../api/useGetTopUsers";

const TopUsersSection = () => {
  const { data, isLoading } = useGetTopUsers();

  if (isLoading) return null;

  const labels = data?.data?.map((user) => user.username);

  const taskCounts = data?.data?.map((user) => user._count.tasks);

  return (
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
          title: { display: true, text: "Top Productive Users" },
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
  );
};

export default TopUsersSection;
