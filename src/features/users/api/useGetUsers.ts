import { fetcher } from "@/api/fetcher";
import { useQuery } from "@tanstack/react-query";
import { type UsersData, type UserTableRow } from "../types";
import dayjs from "dayjs";
import type { ApiResponse } from "@/shared/types";

export const useGetUsers = () => {
  const query = useQuery<ApiResponse<UsersData>, Error, UserTableRow[]>({
    queryKey: ["users"],
    queryFn: () => fetcher("/users"),
    select: (data): UserTableRow[] =>
      data?.data?.map((user) => ({
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
  });
  return query;
};
