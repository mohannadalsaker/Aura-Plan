import UsersPageContent from "@/features/users/features/UsersPageContent";
import { Box } from "@mui/material";

const UsersPage = () => {
  return (
    <Box
      sx={{
        backgroundColor: "#fff",
        height: "100%",
        p: 2,
        borderRadius: "4px",
      }}
    >
      <UsersPageContent />
    </Box>
  );
};

export default UsersPage;
