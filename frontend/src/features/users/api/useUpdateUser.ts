import { patch } from "@/api/mutator";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import type { UserFormFields } from "../validation/UserFormSchema";
import { successRequestSnackbar } from "@/shared/utils/requestSnackbar";

export const useUpdateUser = (id: string | null) => {
  const queryClient = useQueryClient();

  const mutation = useMutation<
    { data: string },
    AxiosError<{ error: string }>,
    UserFormFields
  >({
    mutationFn: (data: UserFormFields) =>
      patch(`/users/${id}`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      }),
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      successRequestSnackbar(res.data);
    },
  });
  return mutation;
};
