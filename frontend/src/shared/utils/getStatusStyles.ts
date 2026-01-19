import { ProjectStatus } from "@/features/projects/types";
import { TaskStatus } from "@/features/tasks/types";

interface StatusColor {
  backgroundColor: string;
  color: string;
}

const statusStyles: Record<ProjectStatus | TaskStatus, StatusColor> = {
  [ProjectStatus.COMPLETED]: { backgroundColor: "#dcfce7", color: "#166534" },
  [ProjectStatus.ACTIVE]: { backgroundColor: "#dbeafe", color: "#1e40af" },
  [ProjectStatus.REVIEW]: { backgroundColor: "#f3e8ff", color: "#6b21a8" },
  [ProjectStatus.PLANNING]: { backgroundColor: "#f3f4f6", color: "#374151" },
  [ProjectStatus.ON_HOLD]: { backgroundColor: "#fef3c7", color: "#92400e" },

  [TaskStatus.TODO]: { backgroundColor: "#f3f4f6", color: "#374151" },
  [TaskStatus.IN_PROGRESS]: { backgroundColor: "#dbeafe", color: "#1e40af" },
  [TaskStatus.CANCELLED]: { backgroundColor: "#fee2e2", color: "#991b1b" },
};

export const getStatusStyles = (
  status: TaskStatus | ProjectStatus
): StatusColor => {
  return statusStyles[status] || statusStyles[ProjectStatus.PLANNING];
};
