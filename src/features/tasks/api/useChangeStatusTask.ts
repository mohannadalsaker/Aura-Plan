import { post } from "@/api/mutator";
import type { TaskStatus } from "@/features/tasks/types";
import { successRequestSnackbar } from "@/shared/utils/requestSnackbar";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";

export const useChangeStatusTask = () => {
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
      successRequestSnackbar(res.data);
    },
  });

  return mutation;
};
