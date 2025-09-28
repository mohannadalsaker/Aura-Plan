import { useParams } from "react-router-dom";
import { useGetUserTasks } from "../api/useGetUserTasks";
import { useGetUserProjects } from "../api/useGetUserProjects";
import { useGetUserById } from "../api/useGetUserById";

export const useUserDetails = () => {
  const { id } = useParams();
  const { data: userData, isLoading: isLoadingUser } = useGetUserById({
    id: id!,
  });
  const { data: userTasks, isLoading: isLoadingTasks } = useGetUserTasks(id!);
  const { data: userProjects, isLoading: isLoadingProjects } =
    useGetUserProjects(id!);

  return {
    userData,
    userTasks,
    userProjects,
    isLoadingProjects,
    isLoadingTasks,
    isLoadingUser,
  };
};
