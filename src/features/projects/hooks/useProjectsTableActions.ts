import type { MainTableProps } from "@/shared/components/MainTable";
import { useDialogStore } from "@/stores/form/dialog";
import { useDrawerStore } from "@/stores/form/drawer";
import { useDeleteProject } from "../api/useDeleteProject";
import type { ProjectTableRow } from "../types";

export const useProjectsTableActions = () => {
  const { mutate, isPending } = useDeleteProject();
  const { openDeleteId, openDeleteDialog, closeDialog } = useDialogStore();
  const { openDrawerEdit, openDrawerAdd } = useDrawerStore();

  const tableActions: MainTableProps<ProjectTableRow>["actions"] = [
    {
      label: "View Details",
      action: (project) => console.log("View", project.title),
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
