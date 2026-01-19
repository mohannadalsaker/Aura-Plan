import { fetcher } from "@/api/fetcher";
import type { ApiResponseById } from "@/shared/types";
import { useQuery } from "@tanstack/react-query";
import type { SingleTaskData } from "../types";

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
