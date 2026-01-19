import MainTable from "@/shared/components/MainTable";
import { useCommentsTable } from "../hooks/useCommentsTable";
import { Box, Stack, Typography } from "@mui/material";
import type { CommentTableRow } from "../types";
import { useCommentsTableActions } from "../hooks/useCommentsTableActions";
import CustomDialog from "@/shared/components/CustomDialog";
import { useQueryParams } from "@/shared/hooks/useQueryParams";
import TableFooter from "@/shared/components/TableFooter";
import { TextFieldInput } from "@/shared/components/TextFieldInput";

export const CommentsPageContent = () => {
  const {
    handleChangePageNumber,
    handleChangePageSize,
    handleChangeSearch,
    pageNumber,
    pageSize,
  } = useQueryParams();
  const { rows, columns, total } = useCommentsTable();
  const {
    confirmDelete,
    closeDeleteDialog,
    isPending,
    openDeleteId,
    tableActions,
  } = useCommentsTableActions();

  return (
    <Stack gap={3} height={"100%"}>
      <CustomDialog
        open={Boolean(openDeleteId)}
        onClose={closeDeleteDialog}
        onConfirm={confirmDelete}
        loading={isPending}
        title="Confirm Delete"
        subtitle="Are you sure you want to delete this comment?"
      />
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
        gap={2}
        flexWrap={"wrap"}
      >
        <Typography sx={{ typography: "h2", fontWeight: 600 }}>
          Comments
        </Typography>
        <Box>
          <TextFieldInput
            placeholder="Search in comments"
            height="42px"
            onChange={(event) => handleChangeSearch(event.target.value)}
          />
        </Box>
      </Stack>

      <Box
        sx={{
          backgroundColor: "#e1fdeeff",
          height: "100%",
          width: "100%",
          overflowY: "auto",
        }}
      >
        <MainTable<CommentTableRow>
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
