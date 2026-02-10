import { fetcher } from "@/api/fetcher";
import { useQuery } from "@tanstack/react-query";
import { DateRange, type UsersStatsdata } from "../types";
import type { ApiResponse } from "@/shared/types";

export const useGetTopUsers = ({ range }: { range: DateRange }) => {
  const query = useQuery<ApiResponse<UsersStatsdata>>({
    queryKey: ["top_users", range],
    queryFn: () => fetcher(`analytics/users?range=${range}`),
    staleTime: 0,
  });

  return query;
};
