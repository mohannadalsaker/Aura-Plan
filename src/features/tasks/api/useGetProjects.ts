import { useQuery } from "@tanstack/react-query";
import { fetcher } from "@/api/fetcher";
import type { ApiPagingatedResponse } from "@/shared/types";
export const useGetProjects = () => {
  const query = useQuery<
    ApiPagingatedResponse<{ id: string; title: string }>,
    Error,
    { label: string; value: string }[]
  >({
    queryKey: ["projects"],
    queryFn: () => fetcher("/projects"),
    select: (response) => {
      const data = response.data.data;
      return data.map((d) => ({
        value: d.id,
        label: d.title,
      }));
    },
  });
  return query;
};
