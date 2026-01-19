import { del } from "@/api/mutator";
import { successRequestSnackbar } from "@/shared/utils/requestSnackbar";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";

export const useDeleteComment = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<
    { data: string },
    AxiosError<{ error: string }>,
    string
  >({
    mutationFn: (id: string) =>
      del(`/comments/${id}`, {
        headers: {
          "Content-Type": "application/json",
        },
      }),
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ["comments"] });
      successRequestSnackbar(res.data);
    },
  });
  return mutation;
};
