import {
  Menu as ActionsMenu,
  IconButton,
  MenuItem,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

import { Ellipsis } from "lucide-react";
import { useMenuAction } from "../hooks/useMenuActions";

export interface MainTableProps<T extends { id: string }> {
  columns: { key: keyof T; label: string }[];
  rows: T[];
  actions: { label: string; action: (row: T) => void }[];
  loading?: boolean;
}

const MainTable = <T extends { id: string }>({
  actions,
  columns,
  rows,
  loading = false,
}: MainTableProps<T>) => {
  const { anchorEl, handleMenuClose, handleMenuOpen } = useMenuAction<T>({
    rows,
  });

  const showEmptyState = !loading && rows?.length === 0;

  return (
    <TableContainer
      sx={{
        overflowX: "auto",
        height: "100%",
        width: "100%",
        backgroundColor: "#e1fdeeff",
      }}
    >
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
          {loading
            ? Array.from({ length: 5 }).map((ele) => (
                <TableRow key={ele as number}>
                  {columns.map((col) => (
                    <TableCell
                      component={"td"}
                      key={col.key as string}
                      sx={{
                        textWrap: "nowrap",
                        typography: "subtitle1",
                        maxWidth: "200px",
                        textOverflow: "ellipsis",
                        overflow: "hidden",
                      }}
                    >
                      <Skeleton sx={{ height: "100%", width: "100%" }} />
                    </TableCell>
                  ))}
                  <TableCell
                    component={"td"}
                    sx={{
                      textWrap: "nowrap",
                      typography: "subtitle1",
                      maxWidth: "200px",
                      textOverflow: "ellipsis",
                      overflow: "hidden",
                    }}
                  >
                    <Skeleton sx={{ height: "100%", width: "100%" }} />
                  </TableCell>
                </TableRow>
              ))
            : rows &&
              rows?.map((row, index) => (
                <TableRow key={row.id}>
                  {columns.map((col) => (
                    <TableCell
                      component={"td"}
                      key={col.key as string}
                      sx={{
                        textWrap: "nowrap",
                        typography: "subtitle1",
                        maxWidth: "200px",
                        textOverflow: "ellipsis",
                        overflow: "hidden",
                      }}
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
          {showEmptyState && (
            <TableRow>
              <TableCell
                colSpan={columns.length + (actions.length > 0 ? 1 : 0)}
                sx={{
                  height: "300px",
                  textAlign: "center",
                  verticalAlign: "middle",
                }}
              >
                <Typography variant="h6" color="text.secondary" sx={{ py: 8 }}>
                  There is no data
                </Typography>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default MainTable;
