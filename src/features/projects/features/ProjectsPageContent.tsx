import CustomDialog from "@/shared/components/CustomDialog";
import MainButton from "@/shared/components/MainButton";
import MainTable from "@/shared/components/MainTable";
import { Box, Stack, Typography } from "@mui/material";
import { Plus } from "lucide-react";
import { useProjectsTable } from "../hooks/useProjectsTable";
import { useProjectsTableActions } from "../hooks/useProjectsTableActions";
import type { ProjectTableRow } from "../types";
import ProjectForm from "./ProjectForm";

export const ProjectsPageContent = () => {
  const { rows, columns } = useProjectsTable();
  const {
    confirmDelete,
    closeDialog,
    openDrawerAdd,
    isPending,
    openDeleteId,
    tableActions,
  } = useProjectsTableActions();

  return (
    <Stack gap={3} height={"100%"}>
      <ProjectForm />
      <CustomDialog
        open={Boolean(openDeleteId)}
        onClose={closeDialog}
        onConfirm={confirmDelete}
        loading={isPending}
        title="Confirm Delete"
        subtitle="Are you sure you want to delete this project?"
      />
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
        gap={2}
        flexWrap={"wrap"}
      >
        <Typography sx={{ typography: "h2", fontWeight: 600 }}>
          Projects
        </Typography>
        <MainButton onClick={openDrawerAdd}>
          Add project <Plus size={20} />
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
        <MainTable<ProjectTableRow>
          actions={tableActions}
          columns={columns}
          rows={rows}
        />
      </Box>
    </Stack>
  );
};
