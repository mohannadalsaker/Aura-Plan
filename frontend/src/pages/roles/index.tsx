import {RolesPageContent} from "@/features/roles/features/RolesPageContent";
import { Box } from "@mui/material";

const RolesPage = () => {
  return (
    <Box
      sx={{
        backgroundColor: "#fff",
        height: "100%",
        p: 2,
        borderRadius: "4px",
      }}
    >
      <RolesPageContent />
    </Box>
  );
};

export default RolesPage;
