import type { MainTableProps } from "@/shared/components/MainTable";
import { useDialogStore } from "@/stores/form/dialog";
import { useDrawerStore } from "@/stores/form/drawer";
import { useDeleteComment } from "../api/useDeleteComment";
import type { CommentTableRow } from "../types";

export const useCommentsTableActions = () => {
  const { mutate, isPending } = useDeleteComment();
  const { openDeleteId, openDeleteDialog, closeDialog } = useDialogStore();
  const { openDrawerAdd } = useDrawerStore();

  const tableActions: MainTableProps<CommentTableRow>["actions"] = [
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
