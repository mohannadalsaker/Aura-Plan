import { create } from "zustand";

interface ProjectDetailsStore {
  taskId: string;
  changeTaskId: (taskId: string) => void;
}

export const useProjectDetailsStore = create<ProjectDetailsStore>((set) => ({
  taskId: "",
  changeTaskId: (taskId: string) => set(() => ({ taskId })),
}));
