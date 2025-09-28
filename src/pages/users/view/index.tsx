import UserDetails from "@/features/users/features/UserDetails";
import { Box } from "@mui/material";

const UserDetailsPage = () => {
  return (
    <Box
      sx={{
        backgroundColor: "#fff",
        height: "100%",
        p: 2,
        borderRadius: "4px",
      }}
    >
      <UserDetails />
    </Box>
  );
};

export default UserDetailsPage;
