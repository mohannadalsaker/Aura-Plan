import { Pie } from "react-chartjs-2";
import { useGetProjectsStatistics } from "../api/useGetProjectsStatistics";
import { getStatusStyles } from "@/shared/utils/getStatusStyles";
import Loader from "@/shared/components/Loader";
import { Stack, Typography } from "@mui/material";

const ProjectsSection = () => {
  const { data, isLoading } = useGetProjectsStatistics();

  if (isLoading) return <Loader />;

  const labels = data?.data?.map((item) => item.status);

  const counts = data?.data?.map((item) => item._count._all);

  const backgroundColors = labels?.map(
    (status) => getStatusStyles(status).backgroundColor || "#cbd5e1",
  );

  const chartData = {
    labels,
    datasets: [
      {
        data: counts,
        backgroundColor: backgroundColors,
        borderColor: "#ffffff",
        borderWidth: 2,
      },
    ],
  };

  return data && data?.data?.length ? (
    <Pie
      key={"projects_stats"}
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
        There are no projects yet
      </Typography>
    </Stack>
  );
};

export default ProjectsSection;
