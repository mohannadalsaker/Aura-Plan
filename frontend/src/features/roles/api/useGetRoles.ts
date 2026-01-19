import { fetcher } from "@/api/fetcher";
import type { ApiPagingatedResponse, PaginatedTableData } from "@/shared/types";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import { useSearchParams } from "react-router-dom";
import { type RoleData, type RoleTableRow } from "../types";

export const useGetRoles = () => {
  const [searchParams] = useSearchParams();

  const paramsString = searchParams.toString();

  const query = useQuery<
    ApiPagingatedResponse<RoleData>,
    Error,
    PaginatedTableData<RoleTableRow>
  >({
    queryKey: ["roles", paramsString],
    queryFn: () => fetcher(`/roles?${paramsString}`),
    select: (response) => {
      const roles = response.data.data || [];
      return {
        data: roles.map((role) => ({
          id: role.id,
          name: role.name,
          createdAt: dayjs(role.created_at).format("YYYY-MM-DD"),
          updatedAt: dayjs(role.updated_at).format("YYYY-MM-DD"),
        })),
        total: response.data.total,
        pageNumber: Number(response.data.pageNumber) || 1,
        pageSize: Number(response.data.pageSize),
      };
    },
  });

  return query;
};
