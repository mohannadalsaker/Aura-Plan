import { useDrawerStore } from "@/stores/form/drawer";
import { Box, IconButton, Typography } from "@mui/material";
import { X } from "lucide-react";

interface DrawerHeaderProps {
  title: string;
  action?: () => void;
}

export const DrawerHeader = (props: DrawerHeaderProps) => {
  const { title, action } = props;
  const { closeDrawer } = useDrawerStore();
  return (
    <Box
      sx={{
        position: "sticky",
        top: 0,
        zIndex: 1000,
        pt: 1,
      }}
    >
      <Box
        sx={{
          backgroundColor: "background.paper",
          borderBottom: "1px solid #ddd",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            px: 2,
          }}
        >
          {/* Title with icon */}
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Box
              sx={{
                backgroundColor: "primary.main",
                width: 3,
                height: 24,
                mr: 1,
              }}
            />
            <Typography
              sx={{
                typography: "subtitle1",
                fontWeight: 600,
                textTransform: "uppercase",
                mr: 2,
              }}
            >
              {title}
            </Typography>
          </Box>

          {/* Close Button */}
          <IconButton
            onClick={() => {
              if (action) {
                action();
                return;
              }
              closeDrawer();
            }}
          >
            <X style={{ color: "#A0ABBB" }} />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};
