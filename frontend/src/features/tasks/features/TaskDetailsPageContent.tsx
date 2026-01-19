import { Divider, IconButton, Rating, Stack, Typography } from "@mui/material";
import { ArrowLeftIcon } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useTaskDetails } from "../hooks/useTaskDetails";
import StatusBadge from "@/shared/components/StatusBadge";
import MainButton from "@/shared/components/MainButton";
import { useDrawerStore } from "@/stores/form/drawer";
import TaskForm from "./TaskForm";
import DetailsCard from "../components/DetailsCard";
import UserCircle from "@/shared/components/UserCircle";
import dayjs from "dayjs";
import React from "react";

const TaskDetailsPageContent = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data, rate, isRating, isPending } = useTaskDetails();
  const { openDrawerEdit } = useDrawerStore();

  if (isPending) return null;

  return (
    <Stack gap={4} p={2} height={"100%"} overflow={"auto"}>
      <TaskForm />
      <Stack gap={3}>
        <Stack
          direction={"row"}
          gap={2}
          alignItems={"center"}
          justifyContent={"space-between"}
          flexWrap={"wrap"}
        >
          <Stack
            direction={"row"}
            rowGap={1}
            columnGap={10}
            alignItems={"center"}
            flexWrap={"wrap"}
          >
            <Stack direction={"row"} gap={1} alignItems={"center"}>
              <IconButton onClick={() => navigate("/tasks")}>
                <ArrowLeftIcon />
              </IconButton>
              <Typography
                sx={{
                  typography: "h4",
                  fontWeight: 600,
                  color: "text.primary",
                }}
              >
                {data?.title}
              </Typography>
              <StatusBadge status={data?.status!} />
            </Stack>
            <Rating
              size="large"
              name="rating"
              defaultValue={data?.rating || 0.5}
              precision={0.5}
              disabled={isRating}
              onChange={(_event, value) => {
                if (value) rate(value);
              }}
            />
          </Stack>
          <MainButton onClick={() => openDrawerEdit(id!)}>Edit</MainButton>
        </Stack>
      </Stack>
      <Divider />
      <Stack gap={2}>
        <Stack
          direction={"row"}
          gap={2}
          sx={{
            flexWrap: {
              xs: "wrap",
              lg: "nowrap",
            },
          }}
        >
          <DetailsCard title="Description">
            <Typography
              sx={{
                typography: "subtitle2",
                color: "text.secondary",
              }}
            >
              {data?.description || "No description provided."}
            </Typography>
          </DetailsCard>
          <DetailsCard title="Assigned To">
            <Stack direction={"column"} gap={1}>
              {data?.users.map((user) => (
                <React.Fragment key={user.user.id}>
                  <Link
                    to={`/users/view/${user.user.id}`}
                    style={{
                      textDecoration: "none",
                    }}
                  >
                    <Stack direction={"row"} alignItems={"center"} gap={1}>
                      <UserCircle
                        name={user.user.username}
                        sx={{
                          backgroundColor: "primary.main",
                          color: "background.paper",
                        }}
                      />

                      <Typography
                        sx={{
                          typography: "subtitle1",
                          color: "text.secondary",
                          fontWeight: 600,
                        }}
                      >
                        {user.user.username}
                      </Typography>
                    </Stack>
                  </Link>
                  <Divider />
                </React.Fragment>
              ))}
            </Stack>
          </DetailsCard>
        </Stack>
        <Stack
          direction={"row"}
          gap={2}
          sx={{
            flexWrap: {
              xs: "wrap",
              lg: "nowrap",
            },
          }}
        >
          <DetailsCard title="Time Line">
            <Stack direction={"row"} gap={3}>
              <Typography
                sx={{
                  typography: "subtitle2",
                  color: "text.secondary",
                }}
              >
                Start Date
              </Typography>
              <Typography
                sx={{
                  typography: "subtitle2",
                  color: "text.secondary",
                }}
              >
                {dayjs(data?.start_date).format("YYYY-MM-DD") || "------"}
              </Typography>
            </Stack>
            <Stack direction={"row"} gap={3}>
              <Typography
                sx={{
                  typography: "subtitle2",
                  color: "text.secondary",
                }}
              >
                End Date
              </Typography>
              <Typography
                sx={{
                  typography: "subtitle2",
                  color: "text.secondary",
                }}
              >
                {dayjs(data?.end_date).format("YYYY-MM-DD") || "------"}
              </Typography>
            </Stack>
          </DetailsCard>
          <DetailsCard title="Meta Data">
            <Stack direction={"row"} gap={3}>
              <Typography
                sx={{
                  typography: "subtitle2",
                  color: "text.secondary",
                }}
              >
                Created By
              </Typography>
              <Typography
                sx={{
                  typography: "subtitle2",
                  color: "text.secondary",
                }}
              >
                {data?.creator.username}
              </Typography>
            </Stack>
            <Stack direction={"row"} gap={3}>
              <Typography
                sx={{
                  typography: "subtitle2",
                  color: "text.secondary",
                }}
              >
                Created At
              </Typography>
              <Typography
                sx={{
                  typography: "subtitle2",
                  color: "text.secondary",
                }}
              >
                {dayjs(data?.created_at).format("MMM DD, YYYY")}
              </Typography>
            </Stack>
            <Stack direction={"row"} gap={3}>
              <Typography
                sx={{
                  typography: "subtitle2",
                  color: "text.secondary",
                }}
              >
                Last Update
              </Typography>
              <Typography
                sx={{
                  typography: "subtitle2",
                  color: "text.secondary",
                }}
              >
                {dayjs(data?.updated_at).format("MMM DD, YYYY")}
              </Typography>
            </Stack>
          </DetailsCard>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default TaskDetailsPageContent;
