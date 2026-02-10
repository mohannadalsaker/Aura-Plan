import MainButton from "@/shared/components/MainButton";
import { TextFieldInput } from "@/shared/components/TextFieldInput";
import { Skeleton, Stack, Typography } from "@mui/material";
import { Send } from "lucide-react";
import TaskComment from "../components/TaskComment";
import { useTaskComments } from "../hooks/useTaskComments";

const TaskCommentsSection = () => {
  const { comments, isAdding, isLoadingComments, register, sendForm } =
    useTaskComments();
  return (
    <Stack gap={2} flexGrow={1}>
      <Typography sx={{ typography: "body1", fontWeight: 500 }}>
        Comments
      </Typography>
      <Stack
        gap={1}
        sx={{
          maxHeight: "300px",
          overflow: "auto",
        }}
      >
        {isLoadingComments &&
          Array.from({ length: 2 }).map((el) => (
            <Stack
              key={el as number}
              direction={"row"}
              gap={1}
              alignItems={"center"}
            >
              <Skeleton
                sx={{
                  borderRadius: "50%",
                  width: "35px",
                  height: "35px",
                }}
              />
              <Skeleton
                sx={{
                  height: "20px",
                  width: "100%",
                }}
              />
            </Stack>
          ))}

        {comments?.length === 0 && (
          <Typography
            sx={{
              typography: "subtitle1",
              textAlign: "center",
              fontWeight: 500,
            }}
          >
            There are no comments yet
          </Typography>
        )}
        {comments?.map((comment) => (
          <TaskComment
            comment={{ text: comment.text, username: comment.user.username }}
          />
        ))}
      </Stack>
      <Stack
        component={"form"}
        onSubmit={sendForm}
        direction={"row"}
        gap={1}
        alignItems={"center"}
        mt={"auto"}
      >
        <TextFieldInput {...register("text")} placeholder="Comment here" />
        <MainButton type="submit" isLoading={isAdding} sx={{ height: "52px" }}>
          <Send />
        </MainButton>
      </Stack>
    </Stack>
  );
};

export default TaskCommentsSection;
