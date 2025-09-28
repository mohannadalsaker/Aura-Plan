import { fetcher } from "@/api/fetcher";
import type { ApiResponseById } from "@/shared/types";
import { useQuery } from "@tanstack/react-query";
import type { SingleUserData } from "../types";

export const useGetUserById = ({ id }: { id: string }) => {
  const query = useQuery<
    ApiResponseById<SingleUserData>,
    Error,
    SingleUserData
  >({
    queryKey: ["users", id],
    queryFn: () => fetcher(`/users/${id}`),
    select: (response) => {
      const data = response.data;
      return data;
    },
    enabled: Boolean(id),
  });

  return query;
};
