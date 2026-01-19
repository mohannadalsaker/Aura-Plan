import { fetcher } from "@/api/fetcher";
import type { ApiPagingatedResponse, PaginatedTableData } from "@/shared/types";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import { useSearchParams } from "react-router-dom";
import { type TaskData, type TaskTableRow } from "../types";

export const useGetTasks = () => {
  const [searchParams] = useSearchParams();

  const paramsString = searchParams.toString();

  const query = useQuery<
    ApiPagingatedResponse<TaskData>,
    Error,
    PaginatedTableData<TaskTableRow>
  >({
    queryKey: ["tasks", paramsString],
    queryFn: () => fetcher(`/tasks?${paramsString}`),
    select: (response) => {
      const tasks = response.data.data || [];
      return {
        data: tasks.map((task) => ({
          id: task.id,
          title: task.title,
          status: task.status,
          projectName: task.project.title,
          creatorName: task.creator.username,
          endDate: task.end_date
            ? dayjs(task.end_date).format("YYYY-MM-DD")
            : "---",
        })),
        total: response.data.total,
        pageNumber: Number(response.data.pageNumber) || 1,
        pageSize: Number(response.data.pageSize),
      };
    },
  });
  return query;
};
