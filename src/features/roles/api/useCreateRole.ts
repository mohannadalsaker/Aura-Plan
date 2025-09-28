import { post } from "@/api/mutator";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import type { RoleFormFields } from "../validation/RoleFormSchema";

export const useCreateRole = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<
    {},
    AxiosError<{ error: string }>,
    RoleFormFields
  >({
    mutationFn: (data: RoleFormFields) =>
      post(`/roles`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["roles"] });
    },
  });
  return mutation;
};
