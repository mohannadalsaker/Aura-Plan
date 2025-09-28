import { del } from "@/api/mutator";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";

export const useDeleteComment = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<object, AxiosError<{ error: string }>, string>({
    mutationFn: (id: string) =>
      del(`/comments/${id}`, {
        headers: {
          "Content-Type": "application/json",
        },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments"] });
    },
  });
  return mutation;
};
