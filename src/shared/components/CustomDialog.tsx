import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import MainButton from "./MainButton";

interface CustomDialogProps {
  open: boolean;
  title: string;
  subtitle: string;
  loading: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const CustomDialog = ({
  onConfirm,
  onClose,
  open,
  subtitle,
  title,
  loading,
}: CustomDialogProps) => {
  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle
        sx={{
          borderBottom: "1px solid",
          borderColor: "secondary.light",
          typography: "body1",
          fontWeight: 600,
          color: "text.primary",
        }}
      >
        {title}
      </DialogTitle>
      <DialogContent>
        <DialogContentText sx={{ py: 2, typography: "subtitle1" }}>
          {subtitle}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <MainButton
          onClick={onClose}
          sx={{
            backgroundColor: "secondary.light",
            color: "text.primary",
            backgroundImage: "",
          }}
        >
          Cancel
        </MainButton>
        <MainButton isLoading={loading} onClick={onConfirm}>
          Confirm
        </MainButton>
      </DialogActions>
    </Dialog>
  );
};

export default CustomDialog;
