import type { MainTableProps } from "@/shared/components/MainTable";
import { useGetComments } from "../api/useGetComments";
import type { CommentTableRow } from "../types";

export const useCommentsTable = () => {
  const { data } = useGetComments();

  const columns: MainTableProps<CommentTableRow>["columns"] = [
    { key: "text", label: "Comment Text" },
    { key: "userName", label: "User" },
    { key: "taskTitle", label: "On Task" },
    { key: "createdAt", label: "Created At" },
  ];

  const rows = data?.data || [];

  return { rows, columns, total: data?.total };
};
