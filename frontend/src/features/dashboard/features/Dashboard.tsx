import { Box, Stack, Typography } from "@mui/material";
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
        <Stack
          gap={1}
          sx={{
            width: {
              xs: "100%",
              md: "calc(50% - 8px)",
            },
            backgroundColor: "background.paper",
            p: 2,
            borderRadius: "8px",
          }}
        >
          <Typography
            sx={{
              typography: "body1",
              color: "text.primary",
              fontWeight: 600,
            }}
          >
            Top Productive Users
          </Typography>
          <Box
            sx={{
              height: "400px",
            }}
          >
            <TopUsersSection />
          </Box>
        </Stack>
        <Stack
          gap={1}
          sx={{
            width: {
              xs: "100%",
              md: "calc(50% - 8px)",
            },
            backgroundColor: "background.paper",
            p: 2,
            borderRadius: "8px",
          }}
        >
          <Typography
            sx={{
              typography: "body1",
              color: "text.primary",
              fontWeight: 600,
            }}
          >
            Project Status Distribution
          </Typography>
          <Box
            sx={{
              height: "400px",
            }}
          >
            <ProjectsSection />
          </Box>
        </Stack>
      </Stack>
      <Stack
        gap={1}
        sx={{
          width: "100%",
          backgroundColor: "background.paper",
          p: 2,
          borderRadius: "8px",
        }}
      >
        <Typography
          sx={{
            typography: "body1",
            color: "text.primary",
            fontWeight: 600,
          }}
        >
          Tasks Statuses Entries
        </Typography>
        <Box
          sx={{
            width: "100%",
            minHeight: "400px",
          }}
        >
          <TasksSection />
        </Box>
      </Stack>
    </Stack>
  );
};

export default Dashboard;
