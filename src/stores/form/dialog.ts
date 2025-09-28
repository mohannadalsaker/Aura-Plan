import { create } from "zustand";

interface DialogStore {
  openDeleteId: string;
  openDeleteDialog: (id: string) => void;
  closeDialog: () => void;
}

export const useDialogStore = create<DialogStore>((set) => ({
  openDeleteId: "",
  openDeleteDialog: (id: string) =>
    set(() => ({
      openDeleteId: id,
    })),
  closeDialog: () =>
    set(() => ({
      openDeleteId: "",
    })),
}));
