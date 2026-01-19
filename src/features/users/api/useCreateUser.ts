import { post } from "@/api/mutator";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import type { UserFormFields } from "../validation/UserFormSchema";
import { successRequestSnackbar } from "@/shared/utils/requestSnackbar";

export const useCreateUser = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<
    { data: string },
    AxiosError<{ error: string }>,
    UserFormFields
  >({
    mutationFn: (data: UserFormFields) =>
      post(`/users`, data, {
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
