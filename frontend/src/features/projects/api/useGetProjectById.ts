import { fetcher } from "@/api/fetcher";
import type { ApiResponseById } from "@/shared/types";
import { useQuery } from "@tanstack/react-query";
import type { SingleProjectData } from "../types";

export const useGetProjectById = ({ id }: { id: string }) => {
  const query = useQuery<
    ApiResponseById<SingleProjectData>,
    Error,
    SingleProjectData
  >({
    queryKey: ["projects", id],
    queryFn: () => fetcher(`/projects/${id}`),
    select: (response) => {
      const data = response.data;
      return data;
    },
    enabled: Boolean(id),
  });
  return query;
};
