import { create } from "zustand";

interface SnackBarStore {
  open: boolean;
  message: string;
  type: "success" | "error" | "notification";
  openSnackBar: ({
    message,
    type,
  }: {
    message: string;
    type: "success" | "error" | "notification";
  }) => void;
  closeSnackBar: () => void;
}

export const useSnackBarStore = create<SnackBarStore>((set) => ({
  open: false,
  message: "",
  type: "success",
  openSnackBar: ({ message, type }) =>
    set(() => ({ message, open: true, type })),
  closeSnackBar: () =>
    set(() => ({
      open: false,
    })),
}));
