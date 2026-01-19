import { fetcher } from "@/api/fetcher";
import type { ApiResponseById } from "@/shared/types";
import { useQuery } from "@tanstack/react-query";
import type { SingleRoleData } from "../types";

export const useGetRoleById = ({ id }: { id: string }) => {
  const query = useQuery<
    ApiResponseById<SingleRoleData>,
    Error,
    SingleRoleData
  >({
    queryKey: ["roles", id],
    queryFn: () => fetcher(`/roles/${id}`),
    select: (response) => {
      const data = response.data;
      return data;
    },
    enabled: Boolean(id),
  });

  return query;
};
