import { fetcher } from "@/api/fetcher";
import { useQuery } from "@tanstack/react-query";
import { type UsersStatsdata } from "../types";
import type { ApiResponse } from "@/shared/types";

export const useGetTopUsers = () => {
  const query = useQuery<ApiResponse<UsersStatsdata>>({
    queryKey: ["top_users"],
    queryFn: () => fetcher("analytics/users"),
    staleTime: 0,
  });

  return query;
};
