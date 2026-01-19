import { del } from "@/api/mutator";
import { successRequestSnackbar } from "@/shared/utils/requestSnackbar";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";

export const useDeleteTask = (projectId?: string) => {
  const queryClient = useQueryClient();

  const mutation = useMutation<
    { data: string },
    AxiosError<{ error: string }>,
    string
  >({
    mutationFn: (id: string) =>
      del(`/tasks/${id}`, {
        headers: {
          "Content-Type": "application/json",
        },
      }),
    onSuccess: (res) => {
      queryClient.invalidateQueries({
        queryKey: projectId ? ["task-projects", projectId] : ["tasks"],
      });
      successRequestSnackbar(res.data);
    },
  });
  return mutation;
};
