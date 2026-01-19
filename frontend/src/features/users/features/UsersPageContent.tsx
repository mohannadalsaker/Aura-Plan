import MainButton from "@/shared/components/MainButton";
import MainTable from "@/shared/components/MainTable";
import { Box, Stack, Typography } from "@mui/material";
import { Plus } from "lucide-react";
import { useUsersTable } from "../hooks/useUsersTable";
import type { UserTableRow } from "../types";
import UserForm from "./UserForm";
import CustomDialog from "@/shared/components/CustomDialog";
import { useUsersTableActions } from "../hooks/useUsersTableActions";
import { TextFieldInput } from "@/shared/components/TextFieldInput";
import { useQueryParams } from "@/shared/hooks/useQueryParams";
import TableFooter from "@/shared/components/TableFooter";

const UsersPageContent = () => {
  const {
    handleChangePageNumber,
    handleChangePageSize,
    handleChangeSearch,
    pageNumber,
    pageSize,
  } = useQueryParams();
  const { rows, columns, total } = useUsersTable();
  const {
    confirmDelete,
    closeDeleteDialog,
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
        onClose={closeDeleteDialog}
        onConfirm={confirmDelete}
        loading={isPending}
        title="Confirm Delete"
        subtitle="Are you sure you want to delete this user?"
      />
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
        gap={2}
        flexWrap={"wrap"}
      >
        <Typography sx={{ typography: "h2", fontWeight: 600 }}>
          Users
        </Typography>
        <Stack direction={"row"} alignItems={"center"} gap={2}>
          <TextFieldInput
            placeholder="Search in users"
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
                Add user
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
        <MainTable<UserTableRow>
          actions={tableActions}
          columns={columns}
          rows={rows!}
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
export default UsersPageContent;
