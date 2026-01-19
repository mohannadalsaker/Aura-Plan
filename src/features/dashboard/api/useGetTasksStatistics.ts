import { fetcher } from "@/api/fetcher";
import type { ApiResponse } from "@/shared/types";
import { useQuery } from "@tanstack/react-query";
import { type TasksStatsData } from "../types";

export const useGetTasksStatistics = () => {
  const query = useQuery<ApiResponse<TasksStatsData>>({
    queryKey: ["tasks_stats"],
    queryFn: () => fetcher("analytics/tasks/entries"),
    staleTime: 0,
  });

  return query;
};
