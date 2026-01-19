import { fetcher } from "@/api/fetcher";
import { useQuery } from "@tanstack/react-query";
import { type SummaryStatsData } from "../types";
import type { ApiResponseById } from "@/shared/types";

export const useGetSummaryData = () => {
  const query = useQuery<ApiResponseById<SummaryStatsData>>({
    queryKey: ["summary"],
    queryFn: () => fetcher("analytics/statistics"),
    staleTime: 0,
  });

  return query;
};
