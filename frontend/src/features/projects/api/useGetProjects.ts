import { fetcher } from "@/api/fetcher";
import type { ApiPagingatedResponse, PaginatedTableData } from "@/shared/types";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import { useSearchParams } from "react-router-dom";
import { type ProjectData, type ProjectTableRow } from "../types";

export const useGetProjects = () => {
  const [searchParams] = useSearchParams();

  const paramsString = searchParams.toString();

  const query = useQuery<
    ApiPagingatedResponse<ProjectData>,
    Error,
    PaginatedTableData<ProjectTableRow>
  >({
    queryKey: ["projects", paramsString],
    queryFn: () => fetcher(`/projects?${paramsString}`),
    select: (response) => {
      const projects = response.data.data || [];
      return {
        data: projects.map((project) => ({
          id: project.id,
          title: project.title,
          status: project.status,
          managerName: project.manager.username,
          startDate: dayjs(project.start_date).format("YYYY-MM-DD"),
          endDate: project.end_date
            ? dayjs(project.end_date).format("YYYY-MM-DD")
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
