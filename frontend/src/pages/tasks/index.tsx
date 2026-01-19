import { TasksPageContent } from "@/features/tasks/features/TaskPageContent";
import { Box } from "@mui/material";

const TasksPage = () => {
  return (
    <Box
      sx={{
        backgroundColor: "#fff",
        height: "100%",
        p: 2,
        borderRadius: "4px",
      }}
    >
      <TasksPageContent />
    </Box>
  );
};

export default TasksPage;

