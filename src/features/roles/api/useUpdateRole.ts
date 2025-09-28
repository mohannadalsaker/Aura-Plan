import { patch } from "@/api/mutator";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import type { RoleFormFields } from "../validation/RoleFormSchema";

export const useUpdateRole = (id: string | null) => {
  const queryClient = useQueryClient();

  const mutation = useMutation<
    {},
    AxiosError<{ error: string }>,
    RoleFormFields
  >({
    mutationFn: (data: RoleFormFields) =>
      patch(`/roles/${id}`, data, {
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
