import { Box, Stack } from "@mui/material";
import "../charts";
import ProjectsSection from "./ProjectsSection";
import SummarySection from "./SummarySection";
import TasksSection from "./TasksSection";
import TopUsersSection from "./TopUsersSection";

const Dashboard = () => {
  return (
    <Stack gap={3} p={1} overflow={"auto"} height={"100%"}>
      <SummarySection />
      <Stack direction={"row"} gap={2} flexWrap={"wrap"}>
        <Box
          sx={{
            width: {
              xs: "100%",
              md: "calc(50% - 8px)",
            },
            height: "400px",
            backgroundColor: "background.paper",
            p: 1,
            borderRadius: "8px",
          }}
        >
          <TopUsersSection />
        </Box>
        <Box
          sx={{
            width: {
              xs: "100%",
              md: "calc(50% - 8px)",
            },
            height: "400px",
            backgroundColor: "background.paper",
            p: 1,
            borderRadius: "8px",
          }}
        >
          <ProjectsSection />
        </Box>
      </Stack>
      <Stack
        sx={{
          width: "100%",
          minHeight: "400px",
          height: "auto",
          backgroundColor: "background.paper",
          p: 1,
          borderRadius: "8px",
        }}
      >
        <TasksSection />
      </Stack>
    </Stack>
  );
};

export default Dashboard;
