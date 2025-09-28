import { useDrawerStore } from "@/stores/form/drawer";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useCreateRole } from "../api/useCreateRole";
import { useUpdateRole } from "../api/useUpdateRole";
import {
  RoleFormSchema,
  type RoleFormFields,
} from "../validation/RoleFormSchema";
import { useGetRoleById } from "../api/useGetRoleById";
import { useEffect } from "react";
import { useGetPermissions } from "../api/useGetPermissions";

export const useRoleForm = () => {
  const { data: permissions, isFetching: isLoadingPermissions } =
    useGetPermissions();
  const { openEditId, closeDrawer } = useDrawerStore();
  const { data: roleData, isFetching: isLoadingRole } = useGetRoleById({
    id: openEditId!,
  });
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    control,
  } = useForm<RoleFormFields>({
    resolver: zodResolver(RoleFormSchema),
    defaultValues: {
      name: "",
      permissions: [],
    },
  });

  useEffect(() => {
    if (roleData && openEditId)
      reset({
        name: roleData?.name,
        permissions: roleData?.permissions,
      });
    else if (!openEditId) {
      reset({
        name: "",
        permissions: [],
      });
    }
  }, [openEditId, roleData, reset]);

  const { mutate: updateRole, isPending: isUpdating } =
    useUpdateRole(openEditId);
  const { mutate: createUser, isPending: isCreating } = useCreateRole();

  const onSubmit: SubmitHandler<RoleFormFields> = (data) => {
    if (openEditId) {
      updateRole(data, {
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
    isLoadingRole,
    control,
    permissions,
    isLoadingPermissions,
  };
};
