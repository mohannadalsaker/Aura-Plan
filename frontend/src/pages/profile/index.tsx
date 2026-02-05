import UserProfile from "@/features/users/features/UserProfile";
import { Box } from "@mui/material";

const ProfilePage = () => {
  return (
    <Box
      sx={{
        backgroundColor: "#fff",
        height: "100%",
        p: 2,
        borderRadius: "4px",
      }}
    >
      <UserProfile />
    </Box>
  );
};

export default ProfilePage;
