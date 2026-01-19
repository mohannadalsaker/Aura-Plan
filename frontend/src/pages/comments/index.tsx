import { CommentsPageContent } from "@/features/comments/features/CommentsPageContent";
import { Box } from "@mui/material";

const CommentsPage = () => {
  return (
    <Box
      sx={{
        backgroundColor: "#fff",
        height: "100%",
        p: 2,
        borderRadius: "4px",
      }}
    >
      <CommentsPageContent />
    </Box>
  );
};

export default CommentsPage;

