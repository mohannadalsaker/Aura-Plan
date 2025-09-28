import { ProjectsPageContent } from "@/features/projects/features/ProjectsPageContent";
 
import { Box } from "@mui/material";

const ProjectsPage = () => {
  return (
    <Box
      sx={{
        backgroundColor: "#fff",
        height: "100%",
        p: 2,
        borderRadius: "4px",
      }}
    >
      <ProjectsPageContent />
    </Box>
  );
};

export default ProjectsPage;
