import { post } from "@/api/mutator";
import type { TaskStatus } from "@/features/tasks/types";
import { successRequestSnackbar } from "@/shared/utils/requestSnackbar";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { useParams } from "react-router-dom";

export const useChangeStatusTask = () => {
  const { id } = useParams<{ id: string }>();
  const queryClient = useQueryClient();
  const mutation = useMutation<
    { data: string },
    AxiosError,
    { id: string; status: TaskStatus }
  >({
    mutationFn: ({ id, status }: { id: string; status: TaskStatus }) =>
      post(`tasks/changeStatus/${id}`, { status }),
    onSuccess: (res) => {
      queryClient.invalidateQueries({
        queryKey: ["tasks"],
      });
      queryClient.invalidateQueries({
        queryKey: ["task_project", id],
      });
      successRequestSnackbar(res.data);
    },
  });

  return mutation;
};
