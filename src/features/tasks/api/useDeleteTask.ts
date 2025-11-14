import { del } from "@/api/mutator";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";

export const useDeleteTask = (projectId?: string) => {
  const queryClient = useQueryClient();

  const mutation = useMutation<object, AxiosError<{ error: string }>, string>({
    mutationFn: (id: string) =>
      del(`/tasks/${id}`, {
        headers: {
          "Content-Type": "application/json",
        },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: projectId ? ["task-projects", projectId] : ["tasks"],
      });
    },
  });
  return mutation;
};
