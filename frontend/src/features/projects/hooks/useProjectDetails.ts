import { useParams } from "react-router-dom";
import { useGetProjectById } from "../api/useGetProjectById";
import { useGetTasksByProjectId } from "../api/useGetTasksByProjectId";
import type { MainTableProps } from "@/shared/components/MainTable";
import type { ProjectTasksTableRow } from "../types";
import { useDeleteTask } from "@/features/tasks/api/useDeleteTask";
import { useDialogStore } from "@/stores/form/dialog";
import { useDrawerStore } from "@/stores/form/drawer";
import { useProjectDetailsStore } from "@/stores/modules/projects/projectDetails";

export const useProjectDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { changeTaskId, taskId } = useProjectDetailsStore();
  const { mutate: deleteTask, isPending: isDeleting } = useDeleteTask(id);
  const { openDeleteId, openDeleteDialog, closeDeleteDialog } =
    useDialogStore();
  const { openDrawerEdit } = useDrawerStore();

  const { data: projectData, isLoading: isLoadingProject } = useGetProjectById({
    id: id!,
  });
  const { data: tasksData, isLoading: isLoadingTasks } = useGetTasksByProjectId(
    { id: id! },
  );

  const columns: MainTableProps<ProjectTasksTableRow>["columns"] = [
    {
      label: "Title",
      key: "title",
    },
    {
      label: "Status",
      key: "status",
    },
    {
      label: "Creator",
      key: "creatorName",
    },
  ];
  const rows = tasksData || [];

  const tableActions: MainTableProps<ProjectTasksTableRow>["actions"] = [
    {
      label: "View Details",
      action: (task) => changeTaskId(task.id),
    },
    {
      label: "Edit",
      action: (row) => {
        openDrawerEdit(row.id);
      },
    },
    {
      label: "Delete",
      action: (row) => {
        openDeleteDialog(row.id);
      },
    },
  ];

  const confirmDelete = () => {
    deleteTask(openDeleteId, {
      onSuccess: () => {
        closeDeleteDialog();
      },
    });
  };

  return {
    confirmDelete,
    tableActions,
    projectData,
    tasksData,
    isLoadingProject,
    isLoadingTasks,
    rows,
    columns,
    isDeleting,
    taskId,
  };
};
