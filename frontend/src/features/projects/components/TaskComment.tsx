import UserCircle from "@/shared/components/UserCircle";
import { Stack, Typography } from "@mui/material";

interface TaskCommentProps {
  comment: {
    username: string;
    text: string;
  };
}

const TaskComment = ({ comment }: TaskCommentProps) => {
  return (
    <Stack direction={"row"} gap={1} alignItems={"flex-start"}>
      <UserCircle name={comment?.username} size="35px" />
      <Typography
        sx={{
          p: 1,
          borderRadius: "12px",
          backgroundColor: "#e9e6e6ff",
          textWrap: "wrap",
          width: "100%",
          typography: "subtitle2",
        }}
      >
        {comment.text}
      </Typography>
    </Stack>
  );
};

export default TaskComment;
