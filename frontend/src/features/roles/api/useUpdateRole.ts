import { patch } from "@/api/mutator";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import type { RoleFormFields } from "../validation/RoleFormSchema";
import { successRequestSnackbar } from "@/shared/utils/requestSnackbar";

export const useUpdateRole = (id: string | null) => {
  const queryClient = useQueryClient();

  const mutation = useMutation<
    { data: string },
    AxiosError<{ error: string }>,
    RoleFormFields
  >({
    mutationFn: (data: RoleFormFields) =>
      patch(`/roles/${id}`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      }),
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ["roles"] });
      successRequestSnackbar(res.data);
    },
  });
  return mutation;
};
