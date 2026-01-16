import { create } from "zustand";

interface DrawerStore {
  openAdd: boolean;
  openEditId: string | null;
  openDrawerAdd: () => void;
  openDrawerEdit: (id: string) => void;

  closeDrawer: () => void;
}

export const useDrawerStore = create<DrawerStore>((set) => ({
  openAdd: false,
  openEditId: null,
  openDrawerAdd: () =>
    set(() => ({
      openAdd: true,
    })),
  openDrawerEdit: (id: string) =>
    set(() => ({
      openAdd: false,
      openEditId: id,
    })),

  closeDrawer: () =>
    set(() => ({
      openAdd: false,
      openEditId: null,
    })),
}));
