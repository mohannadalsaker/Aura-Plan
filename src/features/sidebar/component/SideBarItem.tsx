import { Box, Stack, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";
import type { SideBarItemProps } from "../types/sideBarItemType";

const SideBarItem = ({ item, openedId }: SideBarItemProps) => {
  const isItemActive = (props: { isActive?: boolean; id?: number }) => {
    const { isActive, id } = props;
    return (
      openedId.split("-")[0] === `${id || item.id}` ||
      openedId.split("-")[1] === `${id || item.id}` ||
      isActive
    );
  };

  const getBackgroundColor = (props: { isActive?: boolean; id?: number }) => {
    const { isActive = false, id } = props;
    if (isItemActive({ isActive, id })) return "#007B8C";
    if (!isItemActive({ isActive, id })) return "#fff";
    return "#007B8C";
  };

  const getTextColor = (props: { isActive?: boolean; id?: number }) => {
    const { isActive = false, id } = props;
    if (isItemActive({ isActive, id })) return "#F1F1F1";
    if (!isItemActive({ isActive, id })) return "#353435ff";
    return "#fff";
  };

  const renderContent = (isActive?: boolean) => (
    <Stack direction="row" justifyContent="space-between" width={"100%"}>
      <Stack
        sx={{
          textOverflow: "ellipsis",
          textAlign: "start",
          width: {
            xs: "100%",
            lg: "175px",
          },
        }}
        direction="row"
        gap="10px"
        alignItems="center"
        justifyContent={"space-between"}
      >
        {/* {isItemActive({ isActive }) ? (
          <item.darkIcon
            color={isDarkMode ? "#fff" : "#70434A"}
            stroke="1.7"
            size={"30px"}
          />
        ) : (
          <item.lightIcon
            color={isDarkMode ? "#fff" : "#39383A"}
            stroke="1.7"
            size={"30px"}
          />
        )} */}
        <Typography
          sx={{
            typography: "body1",
            color: getTextColor({ isActive }),
            whiteSpace: "nowrap",
            width: "100%",
            fontWeight: "600",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {item.name}
        </Typography>
        {/* {hasChildren && (
          <icons.IconChevronDown
            style={{
              transform: isItemActive({ isActive }) ? "rotate(180deg)" : "",
              color: mode === "dark" ? "white" : "black",
              transition: "all .3s",
            }}
          />
        )} */}
      </Stack>
    </Stack>
  );

  return (
    <Box component="li" sx={{ width: "100%" }}>
      <NavLink
        to={item.route!}
        style={({ isActive }) => ({
          textDecoration: "none",
          display: "flex",
          alignItems: "center",
          transition: "0.3s",
          backgroundColor: getBackgroundColor({ isActive }),
          width: "100%",
          padding: "9px 14px",
          borderRadius: "4px",
        })}
      >
        {({ isActive }) => renderContent(isActive)}
      </NavLink>
    </Box>
  );
};

export default SideBarItem;
