import { Stack, Typography, type SxProps } from "@mui/material";

const UserCircle = ({
  name,
  size,
  sx,
}: {
  name: string;
  size?: string;
  sx?: SxProps;
}) => {
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
        ...sx,
      }}
    >
      <Typography sx={{ typography: "subtitle1" }}>
        {name?.substring(0, 1).toUpperCase()}
      </Typography>
    </Stack>
  );
};

export default UserCircle;
