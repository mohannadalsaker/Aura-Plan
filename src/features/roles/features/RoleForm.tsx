import { CustomDrawer } from "@/shared/components/CustomDrawer";
import { DrawerHeader } from "@/shared/components/DrawerHeader";
import MainButton from "@/shared/components/MainButton";
import { MultiSelectFieldInput } from "@/shared/components/MultiSelectFieldInput";
import { TextFieldInput } from "@/shared/components/TextFieldInput";
import { useDrawerStore } from "@/stores/form/drawer";
import { Stack } from "@mui/material";
import { useRoleForm } from "../hooks/useRoleForm";

const RoleForm = () => {
  const { openAdd, openEditId, closeDrawer } = useDrawerStore();
  const {
    register,
    errors,
    isCreating,
    isUpdating,
    sendForm,
    control,
    isLoadingPermissions,
    isLoadingRole,
    permissions,
  } = useRoleForm();

  return (
    <CustomDrawer
      open={openAdd || Boolean(openEditId)}
      loading={isLoadingRole || isLoadingPermissions}
    >
      <Stack gap={3}>
        <DrawerHeader title={openEditId ? "Edit Role" : "Add Role"} />
        <form onSubmit={sendForm}>
          <Stack gap={3}>
            <Stack gap={2}>
              <TextFieldInput
                label="Name"
                {...register("name")}
                error={Boolean(errors.name?.message)}
                helperText={errors.name?.message}
                isRequired={true}
              />
              <MultiSelectFieldInput
                label="Permissions"
                name="permissions"
                control={control}
                error={errors.permissions?.message}
                isLoading={isLoadingPermissions}
                isRequired={true}
                options={permissions}
              />
            </Stack>
            <Stack direction={"row"} gap={2} justifyContent={"flex-end"}>
              <MainButton
                onClick={closeDrawer}
                sx={{
                  backgroundColor: "secondary.light",
                  color: "text.primary",
                  backgroundImage: "",
                }}
              >
                Cancel
              </MainButton>
              <MainButton type="submit" isLoading={isCreating || isUpdating}>
                Save
              </MainButton>
            </Stack>
          </Stack>
        </form>
      </Stack>
    </CustomDrawer>
  );
};

export default RoleForm;
