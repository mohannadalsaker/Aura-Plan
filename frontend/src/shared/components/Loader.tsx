import { CircularProgress, Stack } from "@mui/material";

const Loader = () => {
  return (
    <Stack
      justifyContent={"center"}
      alignItems={"center"}
      height={"100%"}
      width={"100%"}
    >
      <CircularProgress />
    </Stack>
  );
};

export default Loader;
