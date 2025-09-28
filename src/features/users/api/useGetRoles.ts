import { fetcher } from "@/api/fetcher";
import type { ApiResponse } from "@/shared/types";
import { useQuery } from "@tanstack/react-query";

export const useGetRoles = () => {
  const query = useQuery<
    ApiResponse<{ id: string; name: string }>,
    Error,
    { label: string; value: string }[]
  >({
    queryKey: ["roles"],
    queryFn: () => fetcher("/roles"),
    select: (data) => {
      const roles = data.data || [];
      return roles.map((role) => ({
        label: role.name,
        value: role.id,
      }));
    },
  });

  return query;
};
