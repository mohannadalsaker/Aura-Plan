import MainButton from "@/shared/components/MainButton";
import MainTable from "@/shared/components/MainTable";
import { Box, Stack } from "@mui/material";
import { Plus } from "lucide-react";
import { useUsersTable } from "../hooks/useUsersTable";
import type { UserTableRow } from "../types";
import UserForm from "./UserForm";
import CustomDialog from "@/shared/components/CustomDialog";
import { useUsersTableActions } from "../hooks/useUsersTableActions";

const UsersPageContent = () => {
  const { rows, columns } = useUsersTable();
  const {
    confirmDelete,
    closeDialog,
    openDrawerAdd,
    isPending,
    openDeleteId,
    tableActions,
  } = useUsersTableActions();
  return (
    <Stack gap={3} height={"100%"}>
      <UserForm />
      <CustomDialog
        open={Boolean(openDeleteId)}
        onClose={closeDialog}
        onConfirm={confirmDelete}
        loading={isPending}
        title="Confirm Delete"
        subtitle="Are you sure you want to delete this user?"
      />
      <Stack direction={"row"} justifyContent={"flex-end"}>
        <MainButton onClick={openDrawerAdd}>
          Add user <Plus size={20} />
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
        <MainTable<UserTableRow>
          actions={tableActions}
          columns={columns}
          rows={rows!}
        />
      </Box>
    </Stack>
  );
};
export default UsersPageContent;
