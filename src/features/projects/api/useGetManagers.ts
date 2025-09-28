import { useQuery } from "@tanstack/react-query";
import { fetcher } from "@/api/fetcher";
import type { ApiResponse } from "@/shared/types";
import type { MemberData } from "../types";

export const useGetManagers = () => {
  const query = useQuery<
    ApiResponse<MemberData>,
    Error,
    { label: string; value: string }[]
  >({
    queryKey: ["managers"],
    queryFn: () => fetcher("/users/managers"),
    select: (response) => {
      const data = response.data;
      return data.map((ele) => ({
        label: ele.username,
        value: ele.id,
      }));
    },
  });
  return query;
};
