import { post } from "@/api/mutator";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import type { LoginResponse } from "../types";
import type { LoginFormFields } from "../validation/LoginFormSchema";
import { successRequestSnackbar } from "@/shared/utils/requestSnackbar";

export const useLoginApi = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<
    LoginResponse,
    AxiosError<{ error: string }>,
    LoginFormFields
  >({
    mutationFn: (data: LoginFormFields) =>
      post<LoginResponse>(`/auth/login`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      successRequestSnackbar("Login success.");
    },
  });
  return mutation;
};
