import { Pie } from "react-chartjs-2";
import { useGetProjectsStatistics } from "../api/useGetProjectsStatistics";
import { getStatusStyles } from "@/shared/utils/getStatusStyles";


const ProjectsSection = () => {
  const { data, isLoading } = useGetProjectsStatistics();

  if (isLoading) return null;

  const labels = data?.data?.map((item) => item.status);

  const counts = data?.data?.map((item) => item._count._all);

  const backgroundColors = labels?.map(
    (status) => getStatusStyles(status).backgroundColor || "#cbd5e1"
  );

  const chartData = {
    labels: labels,
    datasets: [
      {
        data: counts,
        backgroundColor: backgroundColors,
        borderColor: "#ffffff",
        borderWidth: 2,
      },
    ],
  };

  return (
    <Pie
    key={'projects_stats'}
      data={chartData}
      options={{
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: "bottom",
            labels: {
              usePointStyle: true,
              padding: 20,
            },
          },
          title: {
            display: true,
            text: "Project Status Distribution",
          },
        },
      }}
    />
  );
};

export default ProjectsSection;
