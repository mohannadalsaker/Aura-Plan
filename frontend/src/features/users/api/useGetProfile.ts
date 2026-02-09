import { fetcher } from "@/api/fetcher";
import type { UserResponseData } from "@/features/navbar/types";
import type { ApiResponseById } from "@/shared/types";
import { useQuery } from "@tanstack/react-query";

export const useGetProfile = () => {
  const query = useQuery<ApiResponseById<UserResponseData>>({
    queryKey: ["user"],
    queryFn: () => fetcher("/users/me"),
  });
  return query;
};
