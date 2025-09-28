import {
  Menu as ActionsMenu,
  IconButton,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

import { Ellipsis } from "lucide-react";
import { useMenuAction } from "../hooks/useMenuActions";

export interface MainTableProps<T extends { id: string }> {
  columns: { key: keyof T; label: string }[];
  rows: T[];
  actions: { label: string; action: (row: T) => void }[];
}

const MainTable = <T extends { id: string }>({
  actions,
  columns,
  rows,
}: MainTableProps<T>) => {
  const { anchorEl, handleMenuClose, handleMenuOpen } = useMenuAction<T>({
    rows,
  });
  return (
    <TableContainer sx={{ overflowX: "auto", height: "100%", width: "100%" }}>
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            {columns.map((col) => (
              <TableCell
                component={"th"}
                key={col.key as string}
                sx={{
                  textWrap: "nowrap",
                  typography: "subtitle1",
                  fontWeight: "600",
                }}
              >
                {col.label}
              </TableCell>
            ))}
            {actions.length > 0 && (
              <TableCell
                component={"th"}
                sx={{
                  textWrap: "nowrap",
                  typography: "subtitle1",
                  fontWeight: "600",
                }}
              >
                Actions
              </TableCell>
            )}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows &&
            rows?.map((row, index) => (
              <TableRow key={row.id}>
                {columns.map((col) => (
                  <TableCell
                    component={"td"}
                    key={col.key as string}
                    sx={{ textWrap: "nowrap", typography: "subtitle1" }}
                  >
                    {row[col.key] as string}
                  </TableCell>
                ))}
                {actions.length > 0 && (
                  <TableCell>
                    <IconButton
                      aria-label="more options"
                      onClick={(event) => handleMenuOpen(event, index)}
                      sx={{
                        color: "text.primary",
                        transition: "color 0.3s ease, transform 0.3s ease",
                        "&:hover": {
                          backgroundColor: "background.paper",
                          color: "primary.main",
                          transform: "translateY(-2.5px)",
                        },
                      }}
                    >
                      <Ellipsis />
                    </IconButton>
                    <ActionsMenu
                      anchorEl={anchorEl[index]}
                      open={Boolean(anchorEl[index])}
                      onClose={() => handleMenuClose(index)}
                      onClick={(e) => e.stopPropagation()}
                      sx={{
                        "& .MuiPaper-root": {
                          border: "1px solid",
                          borderColor: "secondary.light",
                          boxShadow: "none",
                        },
                      }}
                    >
                      {actions?.map((action) => (
                        <MenuItem
                          key={action.label}
                          onClick={(event) => {
                            action.action(row);
                            event.stopPropagation();
                            handleMenuClose(index);
                          }}
                          sx={{
                            m: 0.5,
                            typography: "subtitle1",
                            color: "text.primary",
                          }}
                        >
                          {action.label}
                        </MenuItem>
                      ))}
                    </ActionsMenu>
                  </TableCell>
                )}
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default MainTable;
