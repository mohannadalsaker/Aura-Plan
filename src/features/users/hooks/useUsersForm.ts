import { useDrawerStore } from "@/stores/form/drawer";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useCreateUser } from "../api/useCreateUser";
import { useGetRoles } from "../api/useGetRoles";
import { useUpdateUser } from "../api/useUpdateUser";
import {
  UserFormSchema,
  type UserFormFields,
} from "../validation/UserFormSchema";
import { useGetUserById } from "../api/useGetUserById";
import { useEffect } from "react";

export const useUsersForm = () => {
  const { data: roles, isFetching: isLoadingRoles } = useGetRoles();
  const { openEditId, closeDrawer } = useDrawerStore();
  const { data: userData, isFetching: isLoadingUser } = useGetUserById({
    id: openEditId!,
  });
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    control,
  } = useForm<UserFormFields>({
    resolver: zodResolver(UserFormSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      role_id: "",
    },
  });

  useEffect(() => {
    if (userData && openEditId)
      reset({
        username: userData?.username,
        email: userData?.email,
        role_id: userData?.role_id,
      });
    else if (!openEditId) {
      reset({
        username: "",
        email: "",
        password: "",
        role_id: "",
      });
    }
  }, [openEditId, userData, reset]);

  const { mutate: updateUser, isPending: isUpdating } =
    useUpdateUser(openEditId);
  const { mutate: createUser, isPending: isCreating } = useCreateUser();

  const onSubmit: SubmitHandler<UserFormFields> = (data) => {
    if (openEditId) {
      updateUser(data, {
        onSuccess: () => {
          closeDrawer();
          reset();
        },
      });
    } else
      createUser(data, {
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
    roles,
    userData,
    isLoadingRoles,
    isLoadingUser,
    control,
  };
};
