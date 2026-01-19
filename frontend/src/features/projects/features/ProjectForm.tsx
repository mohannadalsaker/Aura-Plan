import { CustomDrawer } from "@/shared/components/CustomDrawer";
import { DrawerHeader } from "@/shared/components/DrawerHeader";
import MainButton from "@/shared/components/MainButton";
import { MultiSelectFieldInput } from "@/shared/components/MultiSelectFieldInput";
import { SelectFieldInput } from "@/shared/components/SelectFieldInput";
import { TextFieldInput } from "@/shared/components/TextFieldInput";
import { useDrawerStore } from "@/stores/form/drawer";
import { Stack } from "@mui/material";
import { useProjectForm } from "../hooks/useProjectForm";

const ProjectForm = () => {
  const { openAdd, openEditId, closeDrawer } = useDrawerStore();
  const {
    register,
    errors,
    isCreating,
    isUpdating,
    control,
    isLoadingManagers,
    isLoadingMembers,
    members,
    isLoadingProject,
    managers,
    projectStatuses,
    sendForm,
  } = useProjectForm();

  return (
    <CustomDrawer
      open={openAdd || Boolean(openEditId)}
      loading={isLoadingManagers || isLoadingMembers || isLoadingProject}
    >
      <Stack gap={3}>
        <DrawerHeader title={openEditId ? "Edit Project" : "Add Project"} />
        <form onSubmit={sendForm}>
          <Stack gap={3}>
            <Stack gap={2}>
              <TextFieldInput
                label="Title"
                {...register("title")}
                error={Boolean(errors.title?.message)}
                helperText={errors.title?.message}
                isRequired={true}
              />
              <TextFieldInput
                label="Description"
                {...register("description")}
                error={Boolean(errors.description?.message)}
                helperText={errors.description?.message}
              />
              <TextFieldInput
                label="Start Date"
                {...register("start_date")}
                error={Boolean(errors.start_date?.message)}
                helperText={errors.start_date?.message}
                isRequired={true}
                type="date"
              />
              <TextFieldInput
                label="End Date"
                {...register("end_date")}
                error={Boolean(errors.end_date?.message)}
                helperText={errors.end_date?.message}
                type="date"
              />
              <SelectFieldInput
                label="Status"
                name="status"
                control={control}
                error={errors.status?.message}
                isLoading={false}
                isRequired={true}
                options={projectStatuses}
              />
              <SelectFieldInput
                label="Manager"
                name="manager_id"
                control={control}
                error={errors.manager_id?.message}
                isLoading={isLoadingManagers}
                isRequired={true}
                options={managers}
              />
              <MultiSelectFieldInput
                label="Members"
                name="members"
                control={control}
                error={errors.members?.message}
                isLoading={isLoadingMembers}
                isRequired={true}
                options={members}
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

export default ProjectForm;
