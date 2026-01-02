import { fetcher } from "@/api/fetcher";
import type { ApiPagingatedResponse, PaginatedTableData } from "@/shared/types";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import { useSearchParams } from "react-router-dom";
import { type UsersData, type UserTableRow } from "../types";

export const useGetUsers = () => {
  const [searchParams] = useSearchParams();

  const paramsString = searchParams.toString();

  const query = useQuery<
    ApiPagingatedResponse<UsersData>,
    Error,
    PaginatedTableData<UserTableRow>
  >({
    queryKey: ["users", paramsString],
    queryFn: () => fetcher(`/users?${paramsString}`),
    select: (response) => {
      const users = response.data.data || [];
      return {
        data: users?.map((user) => ({
          id: user?.id,
          name: user?.username,
          email: user?.email,
          role: user?.role.name,
          lastLogin: user?.last_login
            ? dayjs(user?.last_login).format("YYYY-MM-DD")
            : "---------",
          createdAt: dayjs(user?.created_at).format("YYYY-MM-DD"),
          updatedAt: dayjs(user?.updated_at).format("YYYY-MM-DD"),
        })),
        total: response.data.total,
        pageNumber: Number(response.data.pageNumber) || 1,
        pageSize: Number(response.data.pageSize),
      };
    },
  });
  return query;
};
