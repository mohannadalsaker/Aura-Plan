import type { ProjectStatus } from "@/features/projects/types";
import type { TaskStatus } from "@/features/tasks/types";
import { Box } from "@mui/material";
import { getStatusStyles } from "../utils/getStatusStyles";

const StatusBadge = ({ status }: { status: TaskStatus | ProjectStatus }) => {
  const styles = getStatusStyles(status);

  return (
    <Box
      sx={{
        backgroundColor: styles.backgroundColor,
        color: styles.color,
        padding: "4px 10px",
        borderRadius: "4px",
        typography: "subtitle1",
        fontWeight: 600,
      }}
    >
      {status}
    </Box>
  );
};

export default StatusBadge;
