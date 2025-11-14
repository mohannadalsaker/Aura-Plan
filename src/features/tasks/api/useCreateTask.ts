import { post } from "@/api/mutator";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import type { TaskFormFields } from "../validation/TaskFormSchema";

export const useCreateTask = (projectId?: string) => {
  const queryClient = useQueryClient();

  const mutation = useMutation<
    object,
    AxiosError<{ error: string }>,
    TaskFormFields
  >({
    mutationFn: (data: TaskFormFields) =>
      post(`/tasks`, data, {
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
