import { create } from "zustand";

interface DialogStore {
  openDeleteId: string;
  openChangeStatusId: string;
  openChangeStatusDialog: (id: string) => void;
  openDeleteDialog: (id: string) => void;
  closeDeleteDialog: () => void;
  closeChangeStatusDialog: () => void;
}

export const useDialogStore = create<DialogStore>((set) => ({
  openDeleteId: "",
  openChangeStatusId: "",
  openDeleteDialog: (id: string) =>
    set(() => ({
      openDeleteId: id,
    })),
  closeDeleteDialog: () =>
    set(() => ({
      openDeleteId: "",
    })),
  openChangeStatusDialog: (id: string) =>
    set(() => ({
      openChangeStatusId: id,
    })),
  closeChangeStatusDialog: () =>
    set(() => ({
      openChangeStatusId: "",
    })),
}));
