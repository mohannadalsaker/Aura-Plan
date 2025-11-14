import { useProjectDetailsStore } from "@/stores/modules/projects/projectDetails";
import { useGetCommentsByTaskId } from "../api/useGetCommentsByTaskId";
import { useAddCommentToTask } from "../api/useAddCommentToTask";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useQueryClient } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";

export const useTaskComments = () => {
  const queryClient = useQueryClient();
  const { taskId } = useProjectDetailsStore();

  const { data: comments, isLoading: isLoadingComments } =
    useGetCommentsByTaskId({ id: taskId });

  const { mutate: addComment, isPending: isAdding } = useAddCommentToTask();

  const { register, handleSubmit, reset } = useForm<{ text: string }>({
    resolver: zodResolver(z.object({ text: z.string().min(1) })),
    defaultValues: {
      text: "",
    },
  });

  const onSubmit: SubmitHandler<{ text: string }> = (data) => {
    addComment(
      { data, taskId },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: ["task-comments", taskId],
          });
          reset();
        },
      }
    );
  };

  const sendForm = handleSubmit(onSubmit);

  return { comments, isLoadingComments, isAdding, register, sendForm };
};
