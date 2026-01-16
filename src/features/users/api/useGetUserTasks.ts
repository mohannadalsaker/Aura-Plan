import { fetcher } from "@/api/fetcher";
import type { ApiPagingatedResponse } from "@/shared/types";
import { useQuery } from "@tanstack/react-query";

export const useGetUserTasks = (id: string) => {
  const query = useQuery<
    ApiPagingatedResponse<{ id: string; title: string }>,
    Error,
    { id: string; name: string }[]
  >({
    queryKey: ["user_tasks"],
    queryFn: () => fetcher(`/tasks/user/${id}`),
    select: (data) => {
      const tasks = data.data.data || [];
      return tasks.map((task) => ({
        name: task.title,
        id: task.id,
      }));
    },
  });

  return query;
};
