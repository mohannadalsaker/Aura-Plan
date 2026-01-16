import { post } from "@/api/mutator";
import type { TaskStatus } from "@/features/tasks/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useChangeStatusTask = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: TaskStatus }) =>
      post(`tasks/changeStatus/${id}`, { status }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["tasks"],
      });
    },
  });

  return mutation;
};
