import MainTable from "@/shared/components/MainTable";
import { useCommentsTable } from "../hooks/useCommentsTable";
import { Box } from "@mui/material";
import type { CommentTableRow } from "../types";
import { useCommentsTableActions } from "../hooks/useCommentsTableActions";
import CustomDialog from "@/shared/components/CustomDialog";

export const CommentsPageContent = () => {
  const { rows, columns } = useCommentsTable();
  const { confirmDelete, closeDialog, isPending, openDeleteId, tableActions } =
    useCommentsTableActions();

  return (
    <Box
      sx={{
        backgroundColor: "#e1fdeeff",
        height: "100%",
        width: "100%",
        overflowY: "auto",
      }}
    >
      <CustomDialog
        open={Boolean(openDeleteId)}
        onClose={closeDialog}
        onConfirm={confirmDelete}
        loading={isPending}
        title="Confirm Delete"
        subtitle="Are you sure you want to delete this comment?"
      />
      <MainTable<CommentTableRow>
        actions={tableActions}
        columns={columns}
        rows={rows}
      />
    </Box>
  );
};
