import type { MainTableProps } from "@/shared/components/MainTable";
import { useDialogStore } from "@/stores/form/dialog";
import { useDrawerStore } from "@/stores/form/drawer";
import { useDeleteProject } from "../api/useDeleteProject";
import type { ProjectTableRow } from "../types";
import { useNavigate } from "react-router-dom";

export const useProjectsTableActions = () => {
  const navigate = useNavigate();
  const { mutate, isPending } = useDeleteProject();
  const { openDeleteId, openDeleteDialog, closeDialog } = useDialogStore();
  const { openDrawerEdit, openDrawerAdd } = useDrawerStore();

  const tableActions: MainTableProps<ProjectTableRow>["actions"] = [
    {
      label: "View Details",
      action: (project) => navigate(`view/${project.id}`),
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
    mutate(openDeleteId, {
      onSuccess: () => {
        closeDialog();
      },
    });
  };

  return {
    tableActions,
    isPending,
    openDeleteId,
    confirmDelete,
    closeDialog,
    openDrawerAdd,
  };
};
