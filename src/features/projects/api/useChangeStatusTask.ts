import { post } from "@/api/mutator";
import type { TaskStatus } from "@/features/tasks/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

export const useChangeStatusTask = () => {
  const { id } = useParams<{ id: string }>();
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: TaskStatus }) =>
      post(`tasks/changeStatus/${id}`, { status }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["tasks"],
      });
      queryClient.invalidateQueries({
        queryKey: ["task_project", id],
      });
    },
  });

  return mutation;
};
