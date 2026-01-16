import type { MainTableProps } from "@/shared/components/MainTable";
import { useDialogStore } from "@/stores/form/dialog";
import { useDrawerStore } from "@/stores/form/drawer";
import { useDeleteTask } from "../api/useDeleteTask";
import { TaskStatus, type TaskTableRow } from "../types";
import { useState } from "react";
import { useChangeStatusTask } from "../api/useChangeStatusTask";
import { useNavigate } from "react-router-dom";

export const useTasksTableActions = () => {
  const navigate = useNavigate();
  const { mutate: deleteTask, isPending: isDeleting } = useDeleteTask();
  const { mutate: changeStatusTask, isPending: isChangingStatus } =
    useChangeStatusTask();
  const {
    openDeleteId,
    openDeleteDialog,
    closeDeleteDialog,
    openChangeStatusDialog,
    closeChangeStatusDialog,
    openChangeStatusId,
  } = useDialogStore();
  const { openDrawerEdit, openDrawerAdd } = useDrawerStore();
  const [newStatus, setNewStatus] = useState<TaskStatus>();

  const tableActions: MainTableProps<TaskTableRow>["actions"] = [
    {
      label: "View Details",
      action: (task) => navigate(`view/${task.id}`),
    },
    {
      label: "Edit",
      action: (row) => {
        openDrawerEdit(row.id);
      },
    },
    {
      label: "Mark as Todo",
      action: (row) => {
        setNewStatus(TaskStatus.TODO);
        openChangeStatusDialog(row.id);
      },
    },
    {
      label: "Mark as In Progress",
      action: (row) => {
        setNewStatus(TaskStatus.IN_PROGRESS);
        openChangeStatusDialog(row.id);
      },
    },
    {
      label: "Mark as Review",
      action: (row) => {
        setNewStatus(TaskStatus.REVIEW);
        openChangeStatusDialog(row.id);
      },
    },
    {
      label: "Mark as Completed",
      action: (row) => {
        setNewStatus(TaskStatus.COMPLETED);
        openChangeStatusDialog(row.id);
      },
    },
    {
      label: "Mark as Cancelled",
      action: (row) => {
        setNewStatus(TaskStatus.CANCELLED);
        openChangeStatusDialog(row.id);
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
        closeChangeStatusDialog();
      },
    });
  };
  const confirmChangeStatus = () => {
    changeStatusTask(
      { id: openChangeStatusId, status: newStatus! },
      {
        onSuccess: () => {
          closeChangeStatusDialog();
        },
      }
    );
  };

  return {
    tableActions,
    isDeleting,
    isChangingStatus,
    openDeleteId,
    openChangeStatusId,
    newStatus,
    confirmChangeStatus,
    confirmDelete,
    closeDeleteDialog,
    closeChangeStatusDialog,
    openDrawerAdd,
  };
};
