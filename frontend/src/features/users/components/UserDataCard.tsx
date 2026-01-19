import { IconButton, Stack, Typography } from "@mui/material";
import { SquareArrowOutUpRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface UserDataCardProps {
  title: string;
  data: { id: string; name: string }[];
  pathPrefix: string;
}

const UserDataCard = ({ data, pathPrefix, title }: UserDataCardProps) => {
  const navigate = useNavigate();
  return (
    <Stack
      sx={{
        p: 3,
        borderRadius: "8px",
        gap: 3,
        backgroundColor: "info.light",
        width: "100%",
      }}
    >
      <Typography sx={{ typography: "h5", fontWeight: 600 }}>
        {title}
      </Typography>
      <Stack gap={1} overflow={"auto"}>
        {data?.length > 0 ? (
          data?.map((ele) => (
            <Stack
              direction={"row"}
              justifyContent={"space-between"}
              alignItems={"center"}
              sx={{ backgroundColor: "#fff", borderRadius: "6px", p: 1 }}
            >
              <Typography
                sx={{
                  typography: "subtitle1",
                }}
              >
                {ele.name}
              </Typography>
              <IconButton onClick={() => navigate(`${pathPrefix}/${ele.id}`)}>
                <SquareArrowOutUpRight />
              </IconButton>
            </Stack>
          ))
        ) : (
          <Typography sx={{ typography: "subtitle1", color: "text.primary" }}>
            There is no data
          </Typography>
        )}
      </Stack>
    </Stack>
  );
};

export default UserDataCard;
