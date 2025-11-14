import { CustomDrawer } from "@/shared/components/CustomDrawer";
import { DrawerHeader } from "@/shared/components/DrawerHeader";
import MainButton from "@/shared/components/MainButton";
import { MultiSelectFieldInput } from "@/shared/components/MultiSelectFieldInput";
import { SelectFieldInput } from "@/shared/components/SelectFieldInput";
import { TextFieldInput } from "@/shared/components/TextFieldInput";
import { useDrawerStore } from "@/stores/form/drawer";
import { Stack } from "@mui/material";
import { useTaskForm } from "../hooks/useTasksForm";

const TaskForm = () => {
  const { openAdd, openEditId, closeDrawer } = useDrawerStore();
  const {
    register,
    errors,
    isCreating,
    isUpdating,
    sendForm,
    control,
    projects,
    users,
    isLoadingProjects,
    isLoadingUsers,
    isLoadingTask,
  } = useTaskForm();

  return (
    <CustomDrawer
      open={openAdd || Boolean(openEditId)}
      loading={isLoadingProjects || isLoadingTask}
    >
      <Stack gap={3}>
        <DrawerHeader title={openEditId ? "Edit Task" : "Add Task"} />
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
                label="Project"
                name="project_id"
                control={control}
                error={errors.project_id?.message}
                isLoading={isLoadingProjects}
                isRequired={true}
                options={projects}
              />
              <MultiSelectFieldInput
                label="Users"
                name="users"
                control={control}
                error={errors.users?.message}
                isLoading={isLoadingUsers}
                isRequired={true}
                options={users}
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

export default TaskForm;
