import type { MainTableProps } from "@/shared/components/MainTable";
import { useGetUsers } from "../api/useGetUsers";
import type { UserTableRow } from "../types";

export const useUsersTable = () => {
  const { data } = useGetUsers();

  const columns: MainTableProps<UserTableRow>["columns"] = [
    { key: "name", label: "Name" },
    { key: "email", label: "Email" },
    { key: "role", label: "Role" },
    { key: "lastLogin", label: "Last login" },
    { key: "createdAt", label: "Created at" },
    { key: "updatedAt", label: "Updated at" },
  ];

  return { rows: data, columns };
};
