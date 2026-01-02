import type { MainTableProps } from "@/shared/components/MainTable";
import { useGetTasks } from "../api/useGetTasks";
import type { TaskTableRow } from "../types";

export const useTasksTable = () => {
  const { data } = useGetTasks();

  const columns: MainTableProps<TaskTableRow>["columns"] = [
    { key: "title", label: "Task Title" },
    { key: "projectName", label: "Project" },
    { key: "creatorName", label: "Created By" },
    { key: "status", label: "Status" },
    { key: "endDate", label: "End Date" },
  ];

  const rows = data?.data || [];

  return { rows, columns, total: data?.total };
};
