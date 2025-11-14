import { useDrawerStore } from "@/stores/form/drawer";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useCreateTask } from "../api/useCreateTask";
import { useUpdateTask } from "../api/useUpdateTask";
import {
  TaskFormSchema,
  type TaskFormFields,
} from "../validation/TaskFormSchema";
import { useGetTaskById } from "../api/useGetTaskById";
import { useEffect } from "react";

import dayjs from "dayjs";
import { useGetProjects } from "../api/useGetProjects";
import { useGetUsers } from "../api/useGetUsers";
import { useParams } from "react-router-dom";

export const useTaskForm = () => {
  const { id } = useParams();
  const { data: projects, isFetching: isLoadingProjects } = useGetProjects();
  const { openEditId, closeDrawer } = useDrawerStore();
  const { data: taskData, isFetching: isLoadingTask } = useGetTaskById({
    id: openEditId!,
  });
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    control,
    watch,
  } = useForm<TaskFormFields>({
    resolver: zodResolver(TaskFormSchema),
    defaultValues: {
      title: "",
      description: "",
      start_date: "",
      end_date: "",
      project_id: id || "",
      users: [],
    },
  });
  const { data: users, isFetching: isLoadingUsers } = useGetUsers(
    watch("project_id")
  );

  useEffect(() => {
    if (taskData && openEditId)
      reset({
        title: taskData?.title,
        description: taskData?.description || "",
        start_date: dayjs(taskData?.start_date).format("YYYY-MM-DD"),
        end_date: taskData?.end_date
          ? dayjs(taskData?.end_date).format("YYYY-MM-DD")
          : "",
        project_id: taskData?.project_id,
        users: taskData?.users.map((user) => user.user_id),
      });
    else if (!openEditId) {
      reset({
        title: "",
        description: "",
        start_date: "",
        end_date: "",
        project_id: id || "",
        users: [],
      });
    }
  }, [openEditId, taskData, reset]);

  const { mutate: updateProject, isPending: isUpdating } = useUpdateTask(
    openEditId,
    id
  );
  const { mutate: createProject, isPending: isCreating } = useCreateTask(id);

  const onSubmit: SubmitHandler<TaskFormFields> = (data) => {
    if (openEditId) {
      updateProject(data, {
        onSuccess: () => {
          closeDrawer();
          reset();
        },
      });
    } else
      createProject(data, {
        onSuccess: () => {
          closeDrawer();
          reset();
        },
      });
  };

  const sendForm = handleSubmit(onSubmit);

  return {
    register,
    sendForm,
    isCreating,
    isUpdating,
    errors,
    isLoadingTask,
    control,
    projects,
    isLoadingProjects,
    users,
    isLoadingUsers,
  };
};
