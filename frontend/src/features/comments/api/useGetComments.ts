import { fetcher } from "@/api/fetcher";
import type { ApiPagingatedResponse, PaginatedTableData } from "@/shared/types";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import { useSearchParams } from "react-router-dom";
import { type CommentData, type CommentTableRow } from "../types";

export const useGetComments = () => {
  const [searchParams] = useSearchParams();

  const paramsString = searchParams.toString();

  const query = useQuery<
    ApiPagingatedResponse<CommentData>,
    Error,
    PaginatedTableData<CommentTableRow>
  >({
    queryKey: ["comments", paramsString],
    queryFn: () => fetcher(`/comments?${paramsString}`),
    select: (response) => {
      const comments = response.data.data || [];
      return {
        data: comments.map((comment) => ({
          id: comment.id,
          text: comment.text,
          userName: comment.user.username,
          taskTitle: comment.task.title,
          createdAt: dayjs(comment.created_at).format("YYYY-MM-DD"),
        })),
        total: response.data.total,
        pageNumber: Number(response.data.pageNumber) || 1,
        pageSize: Number(response.data.pageSize),
      };
    },
  });

  return query;
};
