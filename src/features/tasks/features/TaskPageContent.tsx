import MainButton from "@/shared/components/MainButton";
import MainTable from "@/shared/components/MainTable";
import { Box, Stack } from "@mui/material";
import { Plus } from "lucide-react";
import { useTasksTable } from "../hooks/useTaskTable";
import type { TaskTableRow } from "../types";
import TaskForm from "./TaskForm";
import { useTasksTableActions } from "../hooks/useTasksTableActions";
import CustomDialog from "@/shared/components/CustomDialog";

export const TasksPageContent = () => {
  const { rows, columns } = useTasksTable();
  const {
    confirmDelete,
    closeDialog,
    openDrawerAdd,
    isPending,
    openDeleteId,
    tableActions,
  } = useTasksTableActions();

  return (
    <Stack gap={3} height={"100%"}>
      <TaskForm />
      <CustomDialog
        open={Boolean(openDeleteId)}
        onClose={closeDialog}
        onConfirm={confirmDelete}
        loading={isPending}
        title="Confirm Delete"
        subtitle="Are you sure you want to delete this task?"
      />
      <Stack direction={"row"} justifyContent={"flex-end"}>
        <MainButton onClick={openDrawerAdd}>
          Add task <Plus size={20} />
        </MainButton>
      </Stack>
      <Box
        sx={{
          backgroundColor: "#e1fdeeff",
          height: "100%",
          width: "100%",
          overflowY: "auto",
        }}
      >
        <MainTable<TaskTableRow>
          actions={tableActions}
          columns={columns}
          rows={rows}
        />
      </Box>
    </Stack>
  );
};
