import MainButton from "@/shared/components/MainButton";
import MainTable from "@/shared/components/MainTable";
import { Box, Stack, Typography } from "@mui/material";
import { Plus } from "lucide-react";
import { useTasksTable } from "../hooks/useTaskTable";
import type { TaskTableRow } from "../types";
import TaskForm from "./TaskForm";
import { useTasksTableActions } from "../hooks/useTasksTableActions";
import CustomDialog from "@/shared/components/CustomDialog";
import { TextFieldInput } from "@/shared/components/TextFieldInput";
import { useQueryParams } from "@/shared/hooks/useQueryParams";
import TableFooter from "@/shared/components/TableFooter";

export const TasksPageContent = () => {
  const {
    handleChangePageNumber,
    handleChangePageSize,
    handleChangeSearch,
    pageNumber,
    pageSize,
  } = useQueryParams();
  const { rows, columns, total } = useTasksTable();
  const {
    confirmDelete,
    closeDeleteDialog,
    openDrawerAdd,
    confirmChangeStatus,
    closeChangeStatusDialog,
    isDeleting,
    openDeleteId,
    tableActions,
    isChangingStatus,
    openChangeStatusId,
    newStatus,
  } = useTasksTableActions();

  return (
    <Stack gap={3} height={"100%"}>
      <TaskForm />
      <CustomDialog
        open={Boolean(openDeleteId)}
        onClose={closeDeleteDialog}
        onConfirm={confirmDelete}
        loading={isDeleting}
        title="Confirm Delete"
        subtitle="Are you sure you want to delete this task?"
      />
      <CustomDialog
        open={Boolean(openChangeStatusId)}
        onClose={closeChangeStatusDialog}
        onConfirm={confirmChangeStatus}
        loading={isChangingStatus}
        title="Confirm Change Status"
        subtitle={`Are you sure you want to change the status of this task to ${newStatus}?`}
      />
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
        gap={2}
        flexWrap={"wrap"}
      >
        <Typography sx={{ typography: "h2", fontWeight: 600 }}>
          Tasks
        </Typography>
        <Stack direction={"row"} alignItems={"center"} gap={2}>
          <TextFieldInput
            placeholder="Search in tasks"
            height="42px"
            onChange={(event) => handleChangeSearch(event.target.value)}
          />
          <MainButton onClick={openDrawerAdd}>
            <Stack
              direction={"row"}
              gap={1}
              px={3}
              height={"100%"}
              alignItems={"center"}
            >
              <Typography sx={{ typography: "subtitle1", fontWeight: 600 }}>
                Add task
              </Typography>
              <Plus size={20} />
            </Stack>
          </MainButton>
        </Stack>
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
      <TableFooter
        pageNumber={+pageNumber}
        pageSize={+pageSize}
        total={total || 0}
        onPageNumberChange={handleChangePageNumber}
        onPageSizeChange={handleChangePageSize}
      />
    </Stack>
  );
};
