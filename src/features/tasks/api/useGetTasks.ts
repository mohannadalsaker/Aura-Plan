import { useQuery } from "@tanstack/react-query";
import { fetcher } from "@/api/fetcher";
import { type TaskData, type TaskTableRow } from "../types";
import dayjs from "dayjs";
import type { ApiResponse } from "@/shared/types";

export const useGetTasks = () => {
  const query = useQuery<ApiResponse<TaskData>, Error, TaskTableRow[]>({
    queryKey: ["tasks"],
    queryFn: () => fetcher("/tasks"),
    select: (response) => {
      const tasks = response.data || [];
      return tasks.map((task) => ({
        id: task.id,
        title: task.title,
        status: task.status,
        projectName: task.project.title,
        creatorName: task.creator.username,
        endDate: task.end_date
          ? dayjs(task.end_date).format("YYYY-MM-DD")
          : "---",
      }));
    },
  });
  return query;
};
