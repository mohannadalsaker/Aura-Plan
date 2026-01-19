import { post } from "@/api/mutator";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import type { TaskFormFields } from "../validation/TaskFormSchema";
import { successRequestSnackbar } from "@/shared/utils/requestSnackbar";

export const useCreateTask = (projectId?: string) => {
  const queryClient = useQueryClient();

  const mutation = useMutation<
    { data: string },
    AxiosError<{ error: string }>,
    TaskFormFields
  >({
    mutationFn: (data: TaskFormFields) =>
      post(`/tasks`, data, {
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
