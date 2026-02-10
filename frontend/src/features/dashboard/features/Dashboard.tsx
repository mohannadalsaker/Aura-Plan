import Loader from "@/shared/components/Loader";
import { SelectFieldInput } from "@/shared/components/SelectFieldInput";
import { Box, Stack, Typography } from "@mui/material";
import { useState } from "react";
import { useGetTasksStatistics } from "../api/useGetTasksStatistics";
import { useGetTopUsers } from "../api/useGetTopUsers";
import "../charts";
import { dateRangeOptions } from "../constants";
import { DateRange } from "../types";
import ProjectsSection from "./ProjectsSection";
import SummarySection from "./SummarySection";
import TasksSection from "./TasksSection";
import TopUsersSection from "./TopUsersSection";

const Dashboard = () => {
  const [taskRange, setTaskRange] = useState<DateRange>(DateRange.ALL_TIME);
  const [userRange, setUserRange] = useState<DateRange>(DateRange.ALL_TIME);
  const { data: taskStatsData, isLoading: isLoadingTaskStats } =
    useGetTasksStatistics({ range: taskRange });
  const { data: userStatsData, isLoading: isLoadingUserStats } = useGetTopUsers(
    { range: userRange },
  );

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
          <Stack
            direction={"row"}
            alignItems={"center"}
            justifyContent={"space-between"}
            gap={1}
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
            <Box>
              <SelectFieldInput
                options={dateRangeOptions}
                value={userRange}
                onChange={(e) => {
                  setUserRange(e.target.value as DateRange);
                }}
              />
            </Box>
          </Stack>
          <Box
            sx={{
              height: "400px",
            }}
          >
            {isLoadingUserStats ? (
              <Loader />
            ) : (
              <TopUsersSection data={userStatsData?.data!} />
            )}
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
        <Stack
          direction={"row"}
          alignItems={"center"}
          justifyContent={"space-between"}
          gap={1}
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
          <Box>
            <SelectFieldInput
              value={taskRange}
              options={dateRangeOptions}
              onChange={(e) => {
                setTaskRange(e.target.value as DateRange);
              }}
            />
          </Box>
        </Stack>
        <Box
          sx={{
            width: "100%",
            minHeight: "400px",
          }}
        >
          {isLoadingTaskStats ? (
            <Loader />
          ) : (
            <TasksSection data={taskStatsData?.data!} />
          )}
        </Box>
      </Stack>
    </Stack>
  );
};

export default Dashboard;
