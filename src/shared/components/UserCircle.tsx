import { Stack, Typography } from "@mui/material";

const UserCircle = ({ name, size }: { name: string; size?: string }) => {
  return (
    <Stack
      justifyContent={"center"}
      alignItems={"center"}
      p={2}
      sx={{
        borderRadius: "50%",
        backgroundColor: "#ccc",
        width: size || "50px",
        height: size || "50px",
      }}
    >
      <Typography sx={{ typography: "subtitle1" }}>
        {name?.substring(0, 1).toUpperCase()}
      </Typography>
    </Stack>
  );
};

export default UserCircle;
