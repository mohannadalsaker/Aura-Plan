import { useQuery } from "@tanstack/react-query";
import { fetcher } from "@/api/fetcher";
import { type CommentData, type CommentTableRow } from "../types";
import dayjs from "dayjs";
import type { ApiResponse } from "@/shared/types";

export const useGetComments = () => {
  const query = useQuery<ApiResponse<CommentData>, Error, CommentTableRow[]>({
    queryKey: ["comments"],
    queryFn: () => fetcher("/comments"),
    select: (response) => {
      const comments = response.data || [];
      return comments.map((comment) => ({
        id: comment.id,
        text: comment.text,
        userName: comment.user.username,
        taskTitle: comment.task.title,
        createdAt: dayjs(comment.created_at).format("YYYY-MM-DD"),
      }));
    },
  });

  return query;
};
