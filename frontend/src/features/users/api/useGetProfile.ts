import { fetcher } from "@/api/fetcher";
import type { UserResponseData } from "@/features/navbar/types";
import { useQuery } from "@tanstack/react-query";

export const useGetProfile = () => {
  const query = useQuery<{ data: UserResponseData }>({
    queryKey: ["user"],
    queryFn: () => fetcher("/users/me"),
  });
  return query;
};
