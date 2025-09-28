import { fetcher } from "@/api/fetcher";
import { useQuery } from "@tanstack/react-query";
import { type UserResponseData } from "../types";

export const useNavbarApi = () => {
  const query = useQuery<{ data: UserResponseData }>({
    queryKey: ["user"],
    queryFn: () => fetcher("/users/me"),
  });
  return query;
};
