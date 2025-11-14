import { post } from "@/api/mutator";
import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";

export const useAddCommentToTask = () => {
  const mutation = useMutation<
    object,
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
  });
  return mutation;
};
