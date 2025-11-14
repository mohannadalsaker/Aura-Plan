import { fetcher } from "@/api/fetcher";
import { type ApiResponse } from "@/shared/types";
import { useQuery } from "@tanstack/react-query";
import type { TaskCommentsData } from "../types";

export const useGetCommentsByTaskId = ({ id }: { id: string }) => {
  const query = useQuery<
    ApiResponse<TaskCommentsData>,
    Error,
    TaskCommentsData[]
  >({
    queryKey: ["task-comments", id],
    queryFn: () => fetcher(`/comments/task/${id}`),
    select: (response) => {
      const data = response.data;
      return data;
    },
    enabled: Boolean(id),
  });
  return query;
};
