import { patch } from "@/api/mutator";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import type { ProjectFormFields } from "../validation/projectFormSchema";

export const useUpdateProject = (id: string | null) => {
  const queryClient = useQueryClient();

  const mutation = useMutation<
    object,
    AxiosError<{ error: string }>,
    ProjectFormFields
  >({
    mutationFn: (data: ProjectFormFields) =>
      patch(`/projects/${id}`, data, {
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
