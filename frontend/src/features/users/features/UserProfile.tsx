import { Divider, IconButton, Stack, Typography } from "@mui/material";
import dayjs from "dayjs";
import { ArrowLeftIcon } from "lucide-react";
import UserDataCard from "../components/UserDataCard";
import { useGetProfile } from "../api/useGetProfile";
import Loader from "@/shared/components/Loader";
import { useNavigate } from "react-router-dom";

const UserProfile = () => {
  const navigate = useNavigate();
  const { data, isLoading } = useGetProfile();

  if (isLoading) return <Loader />;
  return (
    <Stack gap={4} p={2} height={"100%"} overflow={"auto"}>
      <Stack gap={3}>
        <Stack
          direction={"row"}
          gap={2}
          alignItems={"flex-end"}
          flexWrap={"wrap"}
        >
          <IconButton onClick={() => navigate("/")}>
            <ArrowLeftIcon />
          </IconButton>
          <Typography
            sx={{ typography: "h4", fontWeight: 600, color: "text.primary" }}
          >
            {data?.user?.username}
          </Typography>
          <Typography
            sx={{
              typography: "subtitle2",
              fontWeight: 500,
              color: "secondary.light",
            }}
          >
            Last login: {dayjs(data?.user?.last_login).format("YYYY-MM-DD")}
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
              {data?.user?.email}
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
              {data?.user?.role.name}
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
          data={data?.projects!}
        />
        <UserDataCard
          title="Tasks"
          pathPrefix="/tasks/view"
          data={data?.tasks!}
        />
      </Stack>
    </Stack>
  );
};

export default UserProfile;
