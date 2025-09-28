import { create } from "zustand";

export const useSideBarStore = create<{
  isOpen: boolean;
  toggleOpen: () => void;
  close: () => void;
}>((set, get) => ({
  isOpen: true,
  toggleOpen: () => set(() => ({ isOpen: !get().isOpen })),
  close: () => set(() => ({ isOpen: false })),
}));
