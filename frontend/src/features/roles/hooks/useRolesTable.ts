import type { MainTableProps } from "@/shared/components/MainTable";
import { useGetRoles } from "../api/useGetRoles";
import type { RoleTableRow } from "../types";

export const useRolesTable = () => {
  const { data } = useGetRoles();
  const columns: MainTableProps<RoleTableRow>["columns"] = [
    { key: "name", label: "Role Name" },
    { key: "createdAt", label: "Created at" },
    { key: "updatedAt", label: "Updated at" },
  ];

  const rows = data?.data || [];

  return { rows, columns, total: data?.total };
};
