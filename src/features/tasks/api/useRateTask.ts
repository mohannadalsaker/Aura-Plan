import { post } from "@/api/mutator";
import { useMutation } from "@tanstack/react-query";

export const useRateTask = () => {
  const mutation = useMutation({
    mutationFn: ({ id, rating }: { id: string; rating: number }) =>
      post(`tasks/rate/${id}`, { rating }),
  });

  return mutation;
};
