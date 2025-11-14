import { patch } from "@/api/mutator";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import type { TaskFormFields } from "../validation/TaskFormSchema";

export const useUpdateTask = (id: string | null, projectId?: string) => {
  const queryClient = useQueryClient();

  const mutation = useMutation<
    object,
    AxiosError<{ error: string }>,
    TaskFormFields
  >({
    mutationFn: (data: TaskFormFields) =>
      patch(`/tasks/${id}`, data, {
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
