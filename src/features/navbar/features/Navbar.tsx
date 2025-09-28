import { useSideBarStore } from "@/features/sidebar/store/useSideBarStore";
import { IconButton, Stack, Typography } from "@mui/material";
import { Menu } from "lucide-react";
import { useNavbarApi } from "../api/useNavbarApi";

const Navbar = () => {
  const { toggleOpen } = useSideBarStore();
  const { data } = useNavbarApi();
  return (
    <Stack
      direction={"row"}
      alignItems={"center"}
      justifyContent={"space-between"}
      p={2}
    >
      <IconButton onClick={toggleOpen}>
        <Menu size={25} fontWeight={"700"} />
      </IconButton>

      <Stack
        width={"fit-content"}
        direction={"column"}
        sx={{ marginLeft: "auto" }}
      >
        <Typography
          sx={{
            typography: "subtitle1",
            fontWeight: 500,
            color: "primary.main",
          }}
        >
          {data?.data?.email}
        </Typography>
        <Typography
          sx={{
            typography: "subtitle2",
            fontWeight: 600,
            color: "text.primary",
          }}
        >
          {data?.data?.role.name}
        </Typography>
      </Stack>
      <Stack
        justifyContent={"center"}
        alignItems={"center"}
        p={2}
        sx={{
          borderRadius: "50%",
          backgroundColor: "#ccc",
          width: "50px",
          height: "50px",
          marginLeft: "10px",
        }}
      >
        <Typography sx={{ typography: "subtitle1" }}>
          {data?.data?.username.substring(0, 1).toUpperCase()}
        </Typography>
      </Stack>
    </Stack>
  );
};

export default Navbar;
