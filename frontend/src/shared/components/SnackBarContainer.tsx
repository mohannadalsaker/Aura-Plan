import { useSnackBarStore } from "@/stores/modules/snackbar/snackbar";
import { Snackbar, Box, Typography, IconButton } from "@mui/material";
import { X } from "lucide-react";

const TYPE_STYLES = {
  success: {
    borderColor: "#22c55e",
    background: "#0f172a",
  },
  error: {
    borderColor: "#ef4444",
    background: "#0f172a",
  },
  notification: {
    borderColor: "#3b82f6",
    background: "#0f172a",
  },
};

const SnackBarContainer = () => {
  const { message, type, open, closeSnackBar } = useSnackBarStore();

  return (
    <Snackbar
      open={open}
      onClose={closeSnackBar}
      anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      autoHideDuration={4000}
    >
      <Box
        sx={{
          minWidth: 320,
          maxWidth: 420,
          px: 2.5,
          py: 1.75,
          borderRadius: 2,
          backgroundColor: TYPE_STYLES[type].background,
          borderLeft: `6px solid ${TYPE_STYLES[type].borderColor}`,
          boxShadow:
            "0px 10px 25px rgba(0,0,0,0.35), 0px 4px 10px rgba(0,0,0,0.25)",
          display: "flex",
          alignItems: "center",
          gap: 2,
        }}
      >
        <Typography
          sx={{
            color: "info.light",
            fontSize: 14,
            lineHeight: 1.4,
            flexGrow: 1,
            typography: "subtitle1",
          }}
        >
          {message}
        </Typography>

        <IconButton
          onClick={closeSnackBar}
          size="small"
          sx={{
            color: "#9ca3af",
            "&:hover": {
              color: "#f9fafb",
            },
          }}
        >
          <X fontSize="small" />
        </IconButton>
      </Box>
    </Snackbar>
  );
};

export default SnackBarContainer;
