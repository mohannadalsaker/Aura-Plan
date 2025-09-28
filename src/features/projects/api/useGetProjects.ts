import { useQuery } from "@tanstack/react-query";
import { fetcher } from "@/api/fetcher";
import { type ProjectData, type ProjectTableRow } from "../types";
import dayjs from "dayjs";
import type { ApiResponse } from "@/shared/types";
export const useGetProjects = () => {
  const query = useQuery<ApiResponse<ProjectData>, Error, ProjectTableRow[]>({
    queryKey: ["projects"],
    queryFn: () => fetcher("/projects"),
    select: (response) => {
      const projects = response.data || [];
      return projects.map((project) => ({
        id: project.id,
        title: project.title,
        status: project.status,
        managerName: project.manager.username,
        startDate: dayjs(project.start_date).format("YYYY-MM-DD"),
        endDate: project.end_date
          ? dayjs(project.end_date).format("YYYY-MM-DD")
          : "---",
      }));
    },
  });

  return query;
};
