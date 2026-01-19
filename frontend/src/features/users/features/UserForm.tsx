import { CustomDrawer } from "@/shared/components/CustomDrawer";
import { DrawerHeader } from "@/shared/components/DrawerHeader";
import MainButton from "@/shared/components/MainButton";
import { SelectFieldInput } from "@/shared/components/SelectFieldInput";
import { TextFieldInput } from "@/shared/components/TextFieldInput";
import { useDrawerStore } from "@/stores/form/drawer";
import { Stack } from "@mui/material";
import { useUsersForm } from "../hooks/useUsersForm";

const UserForm = () => {
  const { openAdd, openEditId, closeDrawer } = useDrawerStore();
  const {
    register,
    errors,
    isCreating,
    isUpdating,
    sendForm,
    roles,
    isLoadingRoles,
    control,
    isLoadingUser,
  } = useUsersForm();

  return (
    <CustomDrawer open={openAdd || Boolean(openEditId)} loading={isLoadingUser}>
      <Stack gap={3}>
        <DrawerHeader title={openEditId ? "Edit User" : "Add User"} />
        <form onSubmit={sendForm}>
          <Stack gap={3}>
            <Stack gap={2}>
              <TextFieldInput
                label="Username"
                {...register("username")}
                error={Boolean(errors.username?.message)}
                helperText={errors.username?.message}
                isRequired={true}
              />
              <TextFieldInput
                label="Email"
                {...register("email")}
                error={Boolean(errors.email?.message)}
                helperText={errors.email?.message}
                isRequired={true}
              />
              {openEditId ? null : (
                <TextFieldInput
                  label="Password"
                  {...register("password")}
                  type="password"
                  error={Boolean(errors.password?.message)}
                  isRequired={true}
                  helperText={errors.password?.message}
                />
              )}
              <SelectFieldInput
                label="Role"
                name="role_id"
                control={control}
                error={errors.role_id?.message}
                isLoading={isLoadingRoles}
                isRequired={true}
                options={roles}
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

export default UserForm;
