import { useQuery } from "@tanstack/react-query";
import { fetcher } from "@/api/fetcher";
import type { ApiResponse } from "@/shared/types";

export const useGetPermissions = () => {
  const query = useQuery<
    ApiResponse<string>,
    Error,
    { label: string; value: string }[]
  >({
    queryKey: ["permissions"],
    queryFn: () => fetcher("/permissions"),
    select: (response) => {
      const data = response.data;
      return data.map((ele) => ({
        label: ele.replace("_", " "),
        value: ele,
      }));
    },
  });

  return query;
};
