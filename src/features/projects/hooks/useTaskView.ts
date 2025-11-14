import { useProjectDetailsStore } from "@/stores/modules/projects/projectDetails";
import { useGetTaskById } from "../api/useGetTaskById";

export const useTaskView = () => {
  const { taskId, changeTaskId } = useProjectDetailsStore();
  const { data: taskData, isLoading: isLoadingTask } = useGetTaskById({
    id: taskId,
  });

  const closeView = () => {
    changeTaskId("");
  };

  return { taskData, isLoadingTask, closeView };
};
