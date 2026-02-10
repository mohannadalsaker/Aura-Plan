import TaskForm from "@/features/tasks/features/TaskForm";
import CustomDialog from "@/shared/components/CustomDialog";
import { CustomDrawer } from "@/shared/components/CustomDrawer";
import MainButton from "@/shared/components/MainButton";
import MainTable from "@/shared/components/MainTable";
import { useDialogStore } from "@/stores/form/dialog";
import { useDrawerStore } from "@/stores/form/drawer";
import {
  Box,
  IconButton,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { ArrowLeft, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useProjectDetails } from "../hooks/useProjectDetails";
import type { ProjectTasksTableRow } from "../types";
import TaskView from "./TaskView";
import Loader from "@/shared/components/Loader";

const ProjectDetails = () => {
  const navigate = useNavigate();
  const {
    projectData,
    rows,
    columns,
    confirmDelete,
    isDeleting,
    tableActions,
    taskId,
    isLoadingProject,
    isLoadingTasks,
  } = useProjectDetails();
  const { openDrawerAdd } = useDrawerStore();
  const { openDeleteId, closeDeleteDialog } = useDialogStore();
  const theme = useTheme();
  const isMediumUp = useMediaQuery(theme.breakpoints.up("md"));

  return (
    <Stack gap={4} sx={{ height: "100%", minHeight: 0 }}>
      <TaskForm />
      <CustomDialog
        open={Boolean(openDeleteId)}
        onClose={closeDeleteDialog}
        onConfirm={confirmDelete}
        loading={isDeleting}
        title="Confirm Delete"
        subtitle="Are you sure you want to delete this task?"
      />
      {isLoadingProject ? (
        <Loader />
      ) : (
        <>
          <Stack gap={2} sx={{ flexShrink: 0 }}>
            <Stack
              direction={"row"}
              gap={1}
              justifyContent={"space-between"}
              alignItems={"center"}
              flexWrap={"wrap"}
            >
              <Stack direction={"row"} gap={1} alignItems={"center"}>
                <IconButton onClick={() => navigate("/projects")}>
                  <ArrowLeft />
                </IconButton>
                <Typography sx={{ typography: "h3", fontWeight: 600 }}>
                  {projectData?.title} ({projectData?.status})
                </Typography>
              </Stack>
              <MainButton onClick={openDrawerAdd}>
                Add Task <Plus size={20} />
              </MainButton>
            </Stack>
            <Stack
              gap={4}
              flexDirection={"row"}
              alignItems={"center"}
              flexWrap={"wrap"}
            >
              <Stack direction={"row"} gap={1} alignItems={"center"}>
                <Typography sx={{ typography: "subtitle1", fontWeight: 500 }}>
                  Description:
                </Typography>
                <Typography
                  sx={{ typography: "subtitle1", color: "secondary.light" }}
                >
                  {projectData?.description || "--------"}
                </Typography>
              </Stack>
              <Stack direction={"row"} gap={1} alignItems={"center"}>
                <Typography sx={{ typography: "subtitle1", fontWeight: 500 }}>
                  Manager:
                </Typography>
                <Typography
                  sx={{ typography: "subtitle1", color: "secondary.light" }}
                >
                  {projectData?.manager?.username || "--------"}
                </Typography>
              </Stack>
              <Stack direction={"row"} gap={1} alignItems={"center"}>
                <Typography sx={{ typography: "subtitle1", fontWeight: 500 }}>
                  Members:
                </Typography>
                <Typography
                  sx={{ typography: "subtitle1", color: "secondary.light" }}
                >
                  {projectData?.members
                    ?.map((mem) => mem.username)
                    .join(", ") || "--------"}
                </Typography>
              </Stack>
            </Stack>
          </Stack>
          <Stack
            direction={"row"}
            sx={{ height: "100%", minHeight: 0, flexGrow: 1, gap: 2 }}
          >
            <Stack
              gap={2}
              sx={{ height: "100%", flexGrow: 1, minWidth: 0, minHeight: 0 }}
            >
              <Typography
                sx={{ typography: "h5", fontWeight: 600, flexShrink: 0 }}
              >
                Tasks
              </Typography>
              {isLoadingTasks ? (
                <Loader />
              ) : rows?.length > 0 ? (
                <Box
                  sx={{
                    backgroundColor: "#e1fdeeff",
                    height: "100%",
                    width: "100%",
                    overflow: "hidden",
                    display: "flex",
                    flexDirection: "column",
                    minHeight: 0,
                  }}
                >
                  <MainTable<ProjectTasksTableRow>
                    actions={tableActions}
                    columns={columns}
                    rows={rows}
                  />
                </Box>
              ) : (
                <Typography
                  sx={{
                    typography: "subtitle1",
                    fontWeight: 500,
                  }}
                >
                  There are no tasks yet
                </Typography>
              )}
            </Stack>
            {!isMediumUp ? (
              <CustomDrawer open={Boolean(taskId)}>
                <TaskView />
              </CustomDrawer>
            ) : (
              <Box
                sx={{
                  width: taskId ? "40%" : 0,
                  overflow: "hidden",
                  display: "flex",
                  flexDirection: "column",
                  boxShadow: "-1px 2px 8px #ccc",
                  height: "100%",
                  transition: "width 0.3s ease",
                  minHeight: 0,
                }}
              >
                <TaskView />
              </Box>
            )}
          </Stack>
        </>
      )}
    </Stack>
  );
};

export default ProjectDetails;
