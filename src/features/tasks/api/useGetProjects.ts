import { useQuery } from "@tanstack/react-query";
import { fetcher } from "@/api/fetcher";
import type { ApiResponse } from "@/shared/types";
export const useGetProjects = () => {
  const query = useQuery<
    ApiResponse<{ id: string; title: string }>,
    Error,
    { label: string; value: string }[]
  >({
    queryKey: ["projects"],
    queryFn: () => fetcher("/projects"),
    select: (response) => {
      const data = response.data;
      return data.map((d) => ({
        value: d.id,
        label: d.title,
      }));
    },
  });
  return query;
};
