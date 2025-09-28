import type { MainTableProps } from "@/shared/components/MainTable";
import { useDialogStore } from "@/stores/form/dialog";
import { useDrawerStore } from "@/stores/form/drawer";
import { useDeleteRole } from "../api/useDeleteRole";
import type { RoleTableRow } from "../types";

export const useRolesTableActions = () => {
  const { mutate, isPending } = useDeleteRole();
  const { openDeleteId, openDeleteDialog, closeDialog } = useDialogStore();
  const { openDrawerEdit, openDrawerAdd } = useDrawerStore();

  const tableActions: MainTableProps<RoleTableRow>["actions"] = [
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
