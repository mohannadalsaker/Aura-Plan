import ProjectDetails from "@/features/projects/features/ProjectDetails";
import { Box } from "@mui/material";

const ProjectDetailsPage = () => {
  return (
    <Box
      sx={{
        backgroundColor: "#fff",
        height: "100%",
        p: 2,
        borderRadius: "4px",
      }}
    >
      <ProjectDetails />
    </Box>
  );
};

export default ProjectDetailsPage;
