import { del } from "@/api/mutator";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";

export const useDeleteProject = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<object, AxiosError<{ error: string }>, string>({
    mutationFn: (id: string) =>
      del(`/projects/${id}`, {
        headers: {
          "Content-Type": "application/json",
        },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
  });
  return mutation;
};
