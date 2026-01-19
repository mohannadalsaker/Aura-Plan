import { useDrawerStore } from "@/stores/form/drawer";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useCreateProject } from "../api/useCreateProject";
import { useUpdateProject } from "../api/useUpdateProject";
import {
  ProjectFormSchema,
  type ProjectFormFields,
} from "../validation/projectFormSchema";
import { useGetProjectById } from "../api/useGetProjectById";
import { useEffect } from "react";
import { useGetMembers } from "../api/useGetMembers";
import { useGetManagers } from "../api/useGetManagers";
import { ProjectStatus } from "../types";
import dayjs from "dayjs";

export const useProjectForm = () => {
  const { data: members, isFetching: isLoadingMembers } = useGetMembers();
  const { data: managers, isFetching: isLoadingManagers } = useGetManagers();
  const { openEditId, closeDrawer } = useDrawerStore();
  const { data: projectData, isFetching: isLoadingProject } = useGetProjectById(
    {
      id: openEditId!,
    },
  );
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    control,
  } = useForm<ProjectFormFields>({
    resolver: zodResolver(ProjectFormSchema),
    defaultValues: {
      title: "",
      description: "",
      start_date: "",
      end_date: "",
      status: ProjectStatus.ACTIVE,
      manager_id: "",
      members: [],
    },
  });

  useEffect(() => {
    if (projectData && openEditId)
      reset({
        title: projectData?.title,
        description: projectData?.description || "",
        start_date: dayjs(projectData?.start_date).format("YYYY-MM-DD"),
        end_date: projectData?.end_date
          ? dayjs(projectData?.end_date).format("YYYY-MM-DD")
          : "",
        status: projectData?.status,
        manager_id: projectData?.manager_id,
        members: projectData?.members.map((user) => user.id),
      });
    else if (!openEditId) {
      reset({
        title: "",
        description: "",
        start_date: "",
        end_date: "",
        status: ProjectStatus.ACTIVE,
        manager_id: "",
        members: [],
      });
    }
  }, [openEditId, projectData, reset]);

  const { mutate: updateProject, isPending: isUpdating } =
    useUpdateProject(openEditId);
  const { mutate: createProject, isPending: isCreating } = useCreateProject();

  const onSubmit: SubmitHandler<ProjectFormFields> = (data) => {
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

  const projectStatuses = [
    { label: "Active", value: ProjectStatus.ACTIVE },
    { label: "Completed", value: ProjectStatus.COMPLETED },
    { label: "On hold", value: ProjectStatus.ON_HOLD },
    { label: "Planning", value: ProjectStatus.PLANNING },
  ];

  return {
    register,
    sendForm,
    isCreating,
    isUpdating,
    errors,
    isLoadingProject,
    control,
    members,
    isLoadingMembers,
    managers,
    isLoadingManagers,
    projectStatuses,
  };
};
