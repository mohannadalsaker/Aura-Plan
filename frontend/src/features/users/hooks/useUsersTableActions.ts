import type { MainTableProps } from "@/shared/components/MainTable";
import { useDialogStore } from "@/stores/form/dialog";
import { useDrawerStore } from "@/stores/form/drawer";
import { useDeleteUser } from "../api/useDeleteUser";
import type { UserTableRow } from "../types";
import { useNavigate } from "react-router-dom";

export const useUsersTableActions = () => {
  const navigate = useNavigate();
  const { mutate, isPending } = useDeleteUser();
  const { openDeleteId, openDeleteDialog, closeDeleteDialog } =
    useDialogStore();
  const { openDrawerEdit, openDrawerAdd } = useDrawerStore();

  const tableActions: MainTableProps<UserTableRow>["actions"] = [
    {
      label: "View details",
      action: (row) => {
        navigate(`view/${row.id}`);
      },
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
        closeDeleteDialog();
      },
    });
  };

  return {
    tableActions,
    isPending,
    openDeleteId,
    confirmDelete,
    closeDeleteDialog,
    openDrawerAdd,
  };
};
