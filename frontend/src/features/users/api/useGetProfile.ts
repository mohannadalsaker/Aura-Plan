import { fetcher } from "@/api/fetcher";
import type { UserResponseData } from "@/features/navbar/types";
import type { ApiResponseById } from "@/shared/types";
import { useQuery } from "@tanstack/react-query";

export const useGetProfile = () => {
  const query = useQuery<
    ApiResponseById<UserResponseData>,
    Error,
    Omit<UserResponseData, "projects" | "tasks"> & {
      projects: { id: string; name: string }[];
      tasks: { id: string; name: string }[];
    }
  >({
    queryKey: ["user"],
    queryFn: () => fetcher("/users/me"),
    select: (res) => {
      return {
        ...res?.data,
        projects: res?.data?.projects?.map((pro) => ({
          ...pro,
          name: pro.title,
        })),
        tasks: res?.data?.tasks?.map((task) => ({ ...task, name: task.title })),
      };
    },
  });
  return query;
};
