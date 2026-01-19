import TaskDetailsPageContent from "@/features/tasks/features/TaskDetailsPageContent";
import { Box } from "@mui/material";

const TaskDetailsPage = () => {
  return (
    <Box
      sx={{
        backgroundColor: "#fff",
        height: "100%",
        p: 2,
        borderRadius: "4px",
      }}
    >
      <TaskDetailsPageContent />
    </Box>
  );
};

export default TaskDetailsPage;
