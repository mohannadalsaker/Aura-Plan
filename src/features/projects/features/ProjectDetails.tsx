import {
  Box,
  CircularProgress,
  IconButton,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useProjectDetails } from "../hooks/useProjectDetails";
import MainButton from "@/shared/components/MainButton";
import TaskForm from "@/features/tasks/features/TaskForm";
import { useDrawerStore } from "@/stores/form/drawer";
import MainTable from "@/shared/components/MainTable";
import type { ProjectTasksTableRow } from "../types";
import CustomDialog from "@/shared/components/CustomDialog";
import { useDialogStore } from "@/stores/form/dialog";
import TaskView from "./TaskView";
import { ArrowLeft, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { CustomDrawer } from "@/shared/components/CustomDrawer";

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
  const { openDeleteId, closeDialog } = useDialogStore();
  const theme = useTheme();
  const isMediumUp = useMediaQuery(theme.breakpoints.up("md"));

  return (
    <Stack gap={4} sx={{ height: "100%", minHeight: 0 }}>
      <TaskForm />
      <CustomDialog
        open={Boolean(openDeleteId)}
        onClose={closeDialog}
        onConfirm={confirmDelete}
        loading={isDeleting}
        title="Confirm Delete"
        subtitle="Are you sure you want to delete this task?"
      />
      {isLoadingProject ? (
        <Box sx={{ textAlign: "center", padding: 2 }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          <Stack gap={2} sx={{ flexShrink: 0 }}>
            <Stack
              direction={"row"}
              gap={1}
              justifyContent={"space-between"}
              alignItems={"center"}
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
                <Box sx={{ textAlign: "center", padding: 2 }}>
                  <CircularProgress />
                </Box>
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
