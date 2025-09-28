import Navbar from "@/features/navbar/features/Navbar";
import { SideBarDrawer } from "@/features/sidebar/feature";
import SideBar from "@/features/sidebar/feature/SideBar";
import { Box, Stack, useMediaQuery, useTheme } from "@mui/material";
import type { ReactNode } from "react";

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  const theme = useTheme();
  const isMediumUp = useMediaQuery(theme.breakpoints.up("md"));
  return (
    <Stack direction={"row"} height={"100vh"}>
      {isMediumUp ? <SideBar /> : <SideBarDrawer />}
      <Stack
        direction={"column"}
        sx={{
          width: "calc(100% - 280px)",
          flexGrow: 1,
          height: "100%",
        }}
      >
        <Navbar />
        <Box
          sx={{
            p: 3,
            backgroundColor: "background.default",
            height: "calc(100% - 82px)",
          }}
        >
          {children}
        </Box>
      </Stack>
    </Stack>
  );
};

export default DashboardLayout;
