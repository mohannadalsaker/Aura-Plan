import { useQuery } from "@tanstack/react-query";
import { fetcher } from "@/api/fetcher";
import type { ApiResponse } from "@/shared/types";
export const useGetUsers = (id: string) => {
  const query = useQuery<
    ApiResponse<{ id: string; username: string }>,
    Error,
    { label: string; value: string }[]
  >({
    queryKey: ["project_users", id],
    queryFn: () => fetcher(`/projects/${id}/users`),
    select: (response) => {
      const data = response.data;
      return data.map((d) => ({
        value: d.id,
        label: d.username,
      }));
    },
    enabled: Boolean(id),
  });
  return query;
};
