import { fetcher } from "@/api/fetcher";
import type { ApiResponse } from "@/shared/types";
import { useQuery } from "@tanstack/react-query";
import { DateRange, type TasksStatsData } from "../types";

export const useGetTasksStatistics = ({ range }: { range: DateRange }) => {
  const query = useQuery<ApiResponse<TasksStatsData>>({
    queryKey: ["tasks_stats", range],
    queryFn: () => fetcher(`analytics/tasks/entries?range=${range}`),
    staleTime: 0,
  });

  return query;
};
