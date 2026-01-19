import { Pagination, Stack, Typography } from "@mui/material";
import { SelectFieldInput } from "./SelectFieldInput";

interface TableFooterProps {
  pageNumber: number;
  pageSize: number;
  total: number;
  onPageSizeChange: (value: number) => void;
  onPageNumberChange: (value: number) => void;
}

const TableFooter = ({
  pageNumber,
  pageSize,
  total,
  onPageNumberChange,
  onPageSizeChange,
}: TableFooterProps) => {
  const pageCount = Math.ceil(total / pageSize);

  return (
    <Stack
      direction={"row"}
      alignItems={"center"}
      justifyContent={"space-between"}
    >
      <Stack direction={"row"} alignItems={"center"} gap={2}>
        <Typography
          sx={{
            typography: "subtitle1",
            color: "text.primary",
            textWrap: "nowrap",
          }}
        >
          Rows per page:
        </Typography>
        <SelectFieldInput
          value={pageSize}
          onChange={(event) => onPageSizeChange(event.target.value as number)}
          options={[
            {
              label: "10",
              value: 10,
            },
            {
              label: "25",
              value: 25,
            },
            {
              label: "40",
              value: 40,
            },
            {
              label: "50",
              value: 50,
            },
          ]}
        />
      </Stack>
      <Pagination
        count={pageCount}
        page={pageNumber}
        onChange={(_event, value) => onPageNumberChange(value)}
        sx={{
          "& .MuiPaginationItem-root": {
            typography: "subtitle1",
          },
          "& .MuiPaginationItem-root.Mui-selected": {
            p: 2,
            color: "background.paper",
            backgroundColor: "primary.main",
            borderRadius: "8px",
          },
        }}
      />
    </Stack>
  );
};

export default TableFooter;
