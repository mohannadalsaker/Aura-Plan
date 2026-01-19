import { Drawer } from "@mui/material";
import { SideBar } from ".";
import { useSideBarStore } from "../store/useSideBarStore";

const SideBarDrawer = () => {
  const { isOpen, close } = useSideBarStore();
  return (
    <Drawer
      variant="temporary"
      anchor={"left"}
      open={isOpen}
      onClose={() => {
        close();
      }}
      sx={{
        "& .MuiDrawer-paper": {
          top: 0,
          height: "auto",
          maxHeight: "100%",
          backgroundColor: "background.paper",
          justifyContent: "center",
          overflowY: "auto",
          width: {
            xs: "80%",
            sm: "50%",
            md: "0%",
          },
        },
      }}
    >
      <SideBar />
    </Drawer>
  );
};

export default SideBarDrawer;
