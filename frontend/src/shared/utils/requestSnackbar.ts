import { useSnackBarStore } from "@/stores/modules/snackbar/snackbar";

export const successRequestSnackbar = (message: string) => {
  const { openSnackBar } = useSnackBarStore.getState();
  openSnackBar({ message, type: "success" });
};

export const errorRequestSnackbar = (message: string) => {
  const { openSnackBar } = useSnackBarStore.getState();
  openSnackBar({ message, type: "error" });
};
