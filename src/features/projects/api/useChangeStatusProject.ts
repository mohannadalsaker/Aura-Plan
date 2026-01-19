import { post } from "@/api/mutator";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import type { ProjectStatus } from "../types";
import { successRequestSnackbar } from "@/shared/utils/requestSnackbar";
import type { AxiosError } from "axios";

export const useChangeStatusProject = () => {
  const { id } = useParams<{ id: string }>();
  const queryClient = useQueryClient();
  const mutation = useMutation<
    { data: string },
    AxiosError,
    { id: string; status: ProjectStatus }
  >({
    mutationFn: ({ id, status }: { id: string; status: ProjectStatus }) =>
      post(`projects/changeStatus/${id}`, { status }),
    onSuccess: (res) => {
      queryClient.invalidateQueries({
        queryKey: ["projects"],
      });
      queryClient.invalidateQueries({
        queryKey: ["projects", id],
      });
      successRequestSnackbar(res.data);
    },
  });

  return mutation;
};
