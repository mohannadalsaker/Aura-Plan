import { fetcher } from "@/api/fetcher";
import { type ApiResponse } from "@/shared/types";
import { useQuery } from "@tanstack/react-query";
import type { ProjectsStatsData } from "../types";

export const useGetProjectsStatistics = () => {
  const query = useQuery<ApiResponse<ProjectsStatsData>>({
    queryKey: ["project_stats"],
    queryFn: () => fetcher("analytics/projects"),
    staleTime: 0,
  });

  return query;
};
