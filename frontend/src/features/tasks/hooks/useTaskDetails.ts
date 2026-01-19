import { useParams } from "react-router-dom";
import { useGetTaskById } from "../api/useGetTaskById";
import { useRateTask } from "../api/useRateTask";
import { useQueryClient } from "@tanstack/react-query";

export const useTaskDetails = () => {
  const queryClient = useQueryClient();
  const { id } = useParams<{ id: string }>();
  const { data, isPending } = useGetTaskById({ id: id! });
  const { mutate: rateTask, isPending: isRating } = useRateTask();

  const rate = (value: number) => {
    rateTask(
      { id: id!, rating: value },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["tasks", id] });
        },
      }
    );
  };

  return { data, isPending, rate, isRating };
};
