import type { MainTableProps } from "@/shared/components/MainTable";
import { useDialogStore } from "@/stores/form/dialog";
import { useDrawerStore } from "@/stores/form/drawer";
import { useDeleteProject } from "../api/useDeleteProject";
import { ProjectStatus, type ProjectTableRow } from "../types";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useChangeStatusProject } from "../api/useChangeStatusProject";

export const useProjectsTableActions = () => {
  const navigate = useNavigate();
  const { mutate: changeStatusProject, isPending: isChangingStatus } =
    useChangeStatusProject();
  const { mutate: deleteProject, isPending: isDeleting } = useDeleteProject();
  const {
    openDeleteId,
    openChangeStatusId,
    openDeleteDialog,
    closeDeleteDialog,
    closeChangeStatusDialog,
    openChangeStatusDialog,
  } = useDialogStore();
  const { openDrawerEdit, openDrawerAdd } = useDrawerStore();
  const [newStatus, setNewStatus] = useState<ProjectStatus | undefined>();

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
      label: "Mark as In Planning",
      action: (row) => {
        setNewStatus(ProjectStatus.PLANNING);
        openChangeStatusDialog(row.id);
      },
    },
    {
      label: "Mark as Active",
      action: (row) => {
        setNewStatus(ProjectStatus.ACTIVE);
        openChangeStatusDialog(row.id);
      },
    },
    {
      label: "Mark as On Hold",
      action: (row) => {
        setNewStatus(ProjectStatus.ON_HOLD);
        openChangeStatusDialog(row.id);
      },
    },
    {
      label: "Mark as Review",
      action: (row) => {
        setNewStatus(ProjectStatus.REVIEW);
        openChangeStatusDialog(row.id);
      },
    },
    {
      label: "Mark as Completed",
      action: (row) => {
        setNewStatus(ProjectStatus.COMPLETED);
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
    deleteProject(openDeleteId, {
      onSuccess: () => {
        closeDeleteDialog();
      },
    });
  };

  const confirmChangeStatus = () => {
    changeStatusProject(
      { id: openChangeStatusId, status: newStatus! },
      {
        onSuccess: () => {
          closeChangeStatusDialog();
        },
      },
    );
  };

  return {
    tableActions,
    isDeleting,
    openDeleteId,
    openChangeStatusId,
    isChangingStatus,
    newStatus,
    confirmChangeStatus,
    confirmDelete,
    closeChangeStatusDialog,
    closeDeleteDialog,
    openDrawerAdd,
  };
};
