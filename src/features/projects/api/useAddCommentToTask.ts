import { post } from "@/api/mutator";
import { successRequestSnackbar } from "@/shared/utils/requestSnackbar";
import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";

export const useAddCommentToTask = () => {
  const mutation = useMutation<
    {data: string},
    AxiosError<{ error: string }>,
    {
      data: { text: string };
      taskId: string;
    }
  >({
    mutationFn: ({
      data,
      taskId,
    }: {
      data: { text: string };
      taskId: string;
    }) =>
      post(`/comments/task/${taskId}`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      }),
    onSuccess: (res) => {
      successRequestSnackbar(res.data);
    },
  });
  return mutation;
};
