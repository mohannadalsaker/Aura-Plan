import { useSideBarStore } from "@/features/sidebar/store/useSideBarStore";
import UserCircle from "@/shared/components/UserCircle";
import { useMenu } from "@/shared/hooks/useMenu";
import {
  IconButton,
  MenuItem,
  Menu as ProfileMenu,
  Stack,
  Typography,
} from "@mui/material";
import { ChevronDown, Menu } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useNavbarApi } from "../api/useNavbarApi";
import { useQueryClient } from "@tanstack/react-query";
import { removeLsValue } from "@/shared/utils";

const Navbar = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { toggleOpen } = useSideBarStore();
  const { data } = useNavbarApi();

  const logout = () => {
    queryClient.cancelQueries();
    queryClient.clear();
    removeLsValue("token");
    navigate("/auth/login");
  };

  const { anchorEl, handleMenuClose, handleMenuOpen } = useMenu();

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
            {data?.data?.user?.email}
          </Typography>
          <Typography
            sx={{
              typography: "subtitle2",
              fontWeight: 600,
              color: "text.primary",
            }}
          >
            {data?.data?.user?.role.name}
          </Typography>
        </Stack>
        <UserCircle name={data?.data?.user?.username!} />
        <IconButton size="small" onClick={handleMenuOpen}>
          <ChevronDown />
        </IconButton>
        <ProfileMenu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          onClick={(e) => e.stopPropagation()}
          sx={{
            "& .MuiPaper-root": {
              border: "1px solid",
              borderColor: "secondary.light",
              boxShadow: "none",
            },
          }}
        >
          <MenuItem
            onClick={(event) => {
              event.stopPropagation();
              navigate("/profile");
              handleMenuClose();
            }}
            sx={{
              m: 0.5,
              typography: "subtitle1",
              color: "text.primary",
            }}
          >
            Profile
          </MenuItem>
          <MenuItem
            onClick={(event) => {
              event.stopPropagation();
              logout();
              handleMenuClose();
            }}
            sx={{
              m: 0.5,
              typography: "subtitle1",
              color: "error.main",
            }}
          >
            Logout
          </MenuItem>
        </ProfileMenu>
      </Stack>
    </Stack>
  );
};

export default Navbar;
