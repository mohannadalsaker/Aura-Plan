import {
  CircularProgress,
  Divider,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import dayjs from "dayjs";
import UserDataCard from "../components/UserDataCard";
import { useUserDetails } from "../hooks/useUserDetails";
import { ArrowLeftIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

const UserDetails = () => {
  const navigate = useNavigate();
  const {
    isLoadingProjects,
    isLoadingTasks,
    isLoadingUser,
    userData,
    userProjects,
    userTasks,
  } = useUserDetails();

  if (isLoadingProjects || isLoadingTasks || isLoadingUser)
    return <CircularProgress />;

  return (
    <Stack gap={4} p={2} height={"100%"} overflow={"auto"}>
      <Stack gap={3}>
        <Stack direction={"row"} gap={2} alignItems={"flex-end"}>
          <IconButton onClick={() => navigate("/users")}>
            <ArrowLeftIcon />
          </IconButton>
          <Typography
            sx={{ typography: "h4", fontWeight: 600, color: "text.primary" }}
          >
            {userData?.username}
          </Typography>
          <Typography
            sx={{
              typography: "subtitle2",
              fontWeight: 500,
              color: "secondary.light",
            }}
          >
            Last login: {dayjs(userData?.last_login).format("YYYY-MM-DD")}
          </Typography>
        </Stack>
        <Stack direction={"row"} gap={2} flexWrap={"wrap"}>
          <Stack direction={"row"} gap={1}>
            <Typography
              sx={{
                typography: "subtitle1",
                fontWeight: 600,
                color: "secondary.light",
              }}
            >
              Email:
            </Typography>
            <Typography
              sx={{
                typography: "subtitle1",
                color: "text.primary",
              }}
            >
              {userData?.email}
            </Typography>
          </Stack>
          <Stack direction={"row"} gap={1}>
            <Typography
              sx={{
                typography: "subtitle1",
                fontWeight: 600,
                color: "secondary.light",
              }}
            >
              Role:
            </Typography>
            <Typography
              sx={{
                typography: "subtitle1",
                color: "text.primary",
              }}
            >
              {userData?.role.name}
            </Typography>
          </Stack>
        </Stack>
      </Stack>
      <Divider />
      <Stack
        direction={"row"}
        gap={5}
        alignItems={"stretch"}
        flexGrow={1}
        sx={{
          flexWrap: {
            xs: "wrap",
            md: "nowrap",
          },
        }}
      >
        <UserDataCard
          title="Projects"
          pathPrefix="/projects/view"
          data={userProjects!}
        />
        <UserDataCard
          title="Tasks"
          pathPrefix="/tasks/view"
          data={userTasks!}
        />
      </Stack>
    </Stack>
  );
};

export default UserDetails;
