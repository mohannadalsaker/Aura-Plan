import type { MainTableProps } from "@/shared/components/MainTable";
import { useDialogStore } from "@/stores/form/dialog";
import { useDrawerStore } from "@/stores/form/drawer";
import { useDeleteUser } from "../api/useDeleteUser";
import type { UserTableRow } from "../types";

export const useUsersTableActions = () => {
  const { mutate, isPending } = useDeleteUser();
  const { openDeleteId, openDeleteDialog, closeDialog } = useDialogStore();
  const { openDrawerEdit, openDrawerAdd } = useDrawerStore();

  const tableActions: MainTableProps<UserTableRow>["actions"] = [
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
