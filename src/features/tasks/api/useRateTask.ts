import { post } from "@/api/mutator";
import { successRequestSnackbar } from "@/shared/utils/requestSnackbar";
import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";

export const useRateTask = () => {
  const mutation = useMutation<
    { data: string },
    AxiosError,
    { id: string; rating: number }
  >({
    mutationFn: ({ id, rating }: { id: string; rating: number }) =>
      post(`tasks/rate/${id}`, { rating }),
    onSuccess: (res) => {
      successRequestSnackbar(res.data);
    },
  });

  return mutation;
};
