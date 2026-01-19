import { useSideBarStore } from "@/features/sidebar/store/useSideBarStore";
import { IconButton, Stack, Typography } from "@mui/material";
import { Menu } from "lucide-react";
import { useNavbarApi } from "../api/useNavbarApi";
import UserCircle from "@/shared/components/UserCircle";

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
      <Stack direction={"row"} alignItems={"center"} gap={1}>
        <Stack width={"fit-content"} direction={"column"}>
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
        <UserCircle name={data?.data?.username!} />
      </Stack>
    </Stack>
  );
};

export default Navbar;
