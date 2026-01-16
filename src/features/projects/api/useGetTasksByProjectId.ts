import { fetcher } from "@/api/fetcher";
import { type ApiPagingatedResponse } from "@/shared/types";
import { useQuery } from "@tanstack/react-query";
import type { ProjectTasksData, ProjectTasksTableRow } from "../types";

export const useGetTasksByProjectId = ({ id }: { id: string }) => {
  const query = useQuery<
    ApiPagingatedResponse<ProjectTasksData>,
    Error,
    ProjectTasksTableRow[]
  >({
    queryKey: ["task-projects", id],
    queryFn: () => fetcher(`/tasks/project/${id}`),
    select: (response) => {
      const data = response.data.data.map((task) => ({
        id: task.id,
        status: task.status,
        creatorName: task.creator.username,
        title: task.title,
      }));
      return data;
    },
    enabled: Boolean(id),
  });
  return query;
};
