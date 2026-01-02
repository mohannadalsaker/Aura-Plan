import MainButton from "@/shared/components/MainButton";
import MainTable from "@/shared/components/MainTable";
import { Box, Stack, Typography } from "@mui/material";
import { Plus } from "lucide-react";
import { useRolesTable } from "../hooks/useRolesTable";
import type { RoleTableRow } from "../types";
import RoleForm from "./RoleForm";
import CustomDialog from "@/shared/components/CustomDialog";
import { useRolesTableActions } from "../hooks/useRolesTableActions";
import { TextFieldInput } from "@/shared/components/TextFieldInput";
import { useQueryParams } from "@/shared/hooks/useQueryParams";
import TableFooter from "@/shared/components/TableFooter";

export const RolesPageContent = () => {
  const {
    handleChangePageNumber,
    handleChangePageSize,
    handleChangeSearch,
    pageNumber,
    pageSize,
  } = useQueryParams();
  const { rows, columns, total } = useRolesTable();
  const {
    confirmDelete,
    closeDialog,
    openDrawerAdd,
    isPending,
    openDeleteId,
    tableActions,
  } = useRolesTableActions();
  return (
    <Stack gap={3} height={"100%"}>
      <RoleForm />
      <CustomDialog
        open={Boolean(openDeleteId)}
        onClose={closeDialog}
        onConfirm={confirmDelete}
        loading={isPending}
        title="Confirm Delete"
        subtitle="Are you sure you want to delete this role?"
      />
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
        gap={2}
        flexWrap={"wrap"}
      >
        <Typography sx={{ typography: "h2", fontWeight: 600 }}>
          Roles
        </Typography>
        <Stack direction={"row"} alignItems={"center"} gap={2}>
          <TextFieldInput
            placeholder="Search in roles"
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
                Add role
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
        <MainTable<RoleTableRow>
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
