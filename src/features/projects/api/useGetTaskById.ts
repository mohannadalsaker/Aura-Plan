import { fetcher } from "@/api/fetcher";
import type { SingleTaskData } from "@/features/tasks/types";
import type { ApiResponseById } from "@/shared/types";
import { useQuery } from "@tanstack/react-query";

export const useGetTaskById = ({ id }: { id: string }) => {
  const query = useQuery<
    ApiResponseById<SingleTaskData>,
    Error,
    SingleTaskData
  >({
    queryKey: ["tasks", id],
    queryFn: () => fetcher(`/tasks/${id}`),
    select: (response) => {
      const data = response.data;
      return data;
    },
    enabled: Boolean(id),
  });
  return query;
};
