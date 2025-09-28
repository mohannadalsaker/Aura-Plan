import { useQuery } from "@tanstack/react-query";
import { fetcher } from "@/api/fetcher";
import { type RoleData, type RoleTableRow } from "../types";
import dayjs from "dayjs";
import type { ApiResponse } from "@/shared/types";

export const useGetRoles = () => {
  const query = useQuery<ApiResponse<RoleData>, Error, RoleTableRow[]>({
    queryKey: ["roles"],
    queryFn: () => fetcher("/roles"),
    select: (data) => {
      const roles = data.data || [];
      return roles.map((role) => ({
        id: role.id,
        name: role.name,
        createdAt: dayjs(role.created_at).format("YYYY-MM-DD"),
        updatedAt: dayjs(role.updated_at).format("YYYY-MM-DD"),
      }));
    },
  });

  return query;
};
