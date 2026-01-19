import { useQuery } from "@tanstack/react-query";
import { fetcher } from "@/api/fetcher";
import type { ApiResponse } from "@/shared/types";
import type { MemberData } from "../types";

export const useGetMembers = () => {
  const query = useQuery<
    ApiResponse<MemberData>,
    Error,
    { label: string; value: string }[]
  >({
    queryKey: ["members"],
    queryFn: () => fetcher("/users/members"),
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
