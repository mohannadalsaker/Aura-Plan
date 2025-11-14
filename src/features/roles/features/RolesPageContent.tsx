import MainButton from "@/shared/components/MainButton";
import MainTable from "@/shared/components/MainTable";
import { Box, Stack, Typography } from "@mui/material";
import { Plus } from "lucide-react";
import { useRolesTable } from "../hooks/useRolesTable";
import type { RoleTableRow } from "../types";
import RoleForm from "./RoleForm";
import CustomDialog from "@/shared/components/CustomDialog";
import { useRolesTableActions } from "../hooks/useRolesTableActions";

export const RolesPageContent = () => {
  const { rows, columns } = useRolesTable();
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
        <MainButton onClick={openDrawerAdd}>
          Add role <Plus size={20} />
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
        <MainTable<RoleTableRow>
          actions={tableActions}
          columns={columns}
          rows={rows}
        />
      </Box>
    </Stack>
  );
};
