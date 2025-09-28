import { patch } from "@/api/mutator";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import type { UserFormFields } from "../validation/UserFormSchema";

export const useUpdateUser = (id: string | null) => {
  const queryClient = useQueryClient();

  const mutation = useMutation<
    {},
    AxiosError<{ error: string }>,
    UserFormFields
  >({
    mutationFn: (data: UserFormFields) =>
      patch(`/users/${id}`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
  return mutation;
};
