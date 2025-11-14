import {
  Box,
  CircularProgress,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { useTaskView } from "../hooks/useTaskView";
import { X } from "lucide-react";
import TaskCommentsSection from "./TaskCommentsSection";

const TaskView = () => {
  const { taskData, isLoadingTask, closeView } = useTaskView();
  return isLoadingTask ? (
    <Box sx={{ textAlign: "center", padding: 2 }}>
      <CircularProgress />
    </Box>
  ) : (
    <Stack gap={2} height={"100%"} overflow={"auto"}>
      <Stack
        direction={"row"}
        gap={2}
        alignItems={"flex-start"}
        justifyContent={"space-between"}
        p={2}
        sx={{
          position: "sticky",
          top: 0,
          backgroundColor: "background.paper",
          zIndex: 1,
        }}
      >
        <Typography sx={{ typography: "h5", fontWeight: 500 }}>
          {taskData?.title} <strong>({taskData?.status})</strong>
        </Typography>
        <IconButton onClick={closeView}>
          <X />
        </IconButton>
      </Stack>
      <Stack
        gap={2}
        sx={{
          p: "0px 16px 16px 16px",
        }}
      >
        <Stack gap={1}>
          <Typography
            sx={{
              typography: "subtitle1",
              fontWeight: 500,
              color: "text.primary",
            }}
          >
            Description
          </Typography>
          <Typography
            sx={{ typography: "subtitle2", color: "secondary.light" }}
          >
            {taskData?.description || "There is no description"}
          </Typography>
        </Stack>
        <Stack gap={1}>
          <Typography
            sx={{
              typography: "subtitle1",
              fontWeight: 500,
              color: "text.primary",
            }}
          >
            Rating
          </Typography>
          <Typography
            sx={{ typography: "subtitle2", color: "secondary.light" }}
          >
            {taskData?.rating || "There is no rating yet"}
          </Typography>
        </Stack>
        <Stack gap={1}>
          <Typography
            sx={{
              typography: "subtitle1",
              fontWeight: 500,
              color: "text.primary",
            }}
          >
            Users
          </Typography>
          <Typography
            sx={{ typography: "subtitle2", color: "secondary.light" }}
          >
            {taskData?.users && taskData?.users?.length > 0
              ? taskData?.users.map((user) => user.user.username).join(", ")
              : "There is no users yet"}
          </Typography>
        </Stack>
        <TaskCommentsSection />
      </Stack>
    </Stack>
  );
};

export default TaskView;
