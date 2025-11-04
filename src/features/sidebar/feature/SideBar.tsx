import * as images from "@/config/images";
import MainButton from "@/shared/components/MainButton";
import { Box, List, Stack } from "@mui/material";
import SideBarItem from "../component/SideBarItem";
import { useSideBarFields } from "../hooks/useSideBarFields";
import { useSideBarStore } from "../store/useSideBarStore";

const SideBarFeature = () => {
  const { sideBarData, openedId, handleToggleItemOpen, logout } =
    useSideBarFields();
  const { isOpen } = useSideBarStore();

  return (
    <Stack
      component="aside"
      sx={{
        height: "100vh",
        width: {
          md: isOpen ? "280px" : 0,
        },
        borderRight: "1px solid",
        textAlign: "center",
        py: "26px",
        backgroundColor: "background.paper",
        borderColor: "secondary.light",
        transition: "0.3s",
      }}
    >
      <Box
        sx={{
          position: "sticky",
          top: "0",
          zIndex: 1,
          mb: "24px",
          width: "100%",
          backgroundColor: "#fff",
        }}
      >
        <img
          src={images.Logo}
          alt="Logo"
          style={{
            width: "40%",
            margin: "0px auto",
            opacity: "1",
            transition: ".1s",
          }}
        />
      </Box>

      <List
        sx={{
          height: "100%",
          overflowY: "auto",
          width: "100%",
          p: "0px",
          display: "flex",
          flexDirection: "column",
          gap: "16px",
          listStyle: "none",
          scrollbarWidth: "none",
          "&::-webkit-scrollbar": {
            display: "none",
          },
        }}
      >
        <Box
          component="ul"
          sx={{ display: "flex", flexDirection: "column", gap: "4px", px: 1 }}
        >
          {sideBarData.map((item) => {
            return (
              <SideBarItem
                key={item.id}
                item={item}
                openedId={openedId}
                toggleOpen={handleToggleItemOpen}
              />
            );
          })}
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            mt: "auto",
          }}
        >
          <MainButton
            variant="contained"
            onClick={logout}
            sx={{
              px: 2,
              width: "80%",
              mx: "auto",
              backgroundImage: "",
              backgroundColor: "info.light",
              color: "text.primary",
              "&:hover": {
                backgroundColor: "info.light",
                color: "text.primary",
              },
              borderRadius: "4px",
              fontWeight: 500,
              typography: "subtitle1",
            }}
          >
            Logout
          </MainButton>
        </Box>
      </List>
    </Stack>
  );
};

export default SideBarFeature;
