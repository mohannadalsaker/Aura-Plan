import { patch } from "@/api/mutator";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import type { ProjectFormFields } from "../validation/projectFormSchema";
import { successRequestSnackbar } from "@/shared/utils/requestSnackbar";

export const useUpdateProject = (id: string | null) => {
  const queryClient = useQueryClient();

  const mutation = useMutation<
    { data: string },
    AxiosError<{ error: string }>,
    ProjectFormFields
  >({
    mutationFn: (data: ProjectFormFields) =>
      patch(`/projects/${id}`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      }),
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      successRequestSnackbar(res.data);
    },
  });
  return mutation;
};
