import { fetcher } from "@/api/fetcher";
import type { ApiPagingatedResponse } from "@/shared/types";
import { useQuery } from "@tanstack/react-query";

export const useGetUserProjects = (id: string) => {
  const query = useQuery<
    ApiPagingatedResponse<{ id: string; title: string }>,
    Error,
    { id: string; name: string }[]
  >({
    queryKey: ["user_projects"],
    queryFn: () => fetcher(`/projects/user/${id}`),
    select: (data) => {
      const projects = data.data.data || [];
      return projects.map((project) => ({
        name: project.title,
        id: project.id,
      }));
    },
  });

  return query;
};
