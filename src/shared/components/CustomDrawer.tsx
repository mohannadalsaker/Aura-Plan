import { CircularProgress, Drawer, Box } from "@mui/material";
import { type ReactNode } from "react";
interface DrawerLayoutProps {
  children: ReactNode;
  open: boolean;
  loading?: boolean;
}

export const CustomDrawer = ({
  children,
  open,
  loading = false,
}: DrawerLayoutProps) => {
  return (
    <Drawer
      anchor="right"
      open={open}
      sx={{
        "& .MuiDrawer-paper": {
          top: 0,
          height: "100vh",
          maxHeight: "100%",
          backgroundColor: "background.paper",
          justifyContent: "center",
          overflowY: "auto",
          width: {
            xs: "100%",
            sm: "85%",
            md: "60%",
            lg: "40%",
            xl: "35%",
          },
        },
      }}
    >
      {loading ? (
        <Box sx={{ textAlign: "center", padding: 2 }}>
          <CircularProgress />
        </Box>
      ) : (
        <Box
          sx={{
            height: "100vh",
            overflowY: "auto",
            backgroundColor: "background.paper",
            px: 3,
            pb: 3,
          }}
        >
          {children}
        </Box>
      )}
    </Drawer>
  );
};
