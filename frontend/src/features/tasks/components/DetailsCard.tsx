import { Stack, Typography } from "@mui/material";
import type { ReactNode } from "react";

const DetailsCard = ({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) => {
  return (
    <Stack
      p={2}
      sx={{
        borderRadius: "8px",
        backgroundColor: "info.light",
        width: "100%",
      }}
      gap={2}
    >
      <Typography
        sx={{
          typography: "body1",
          color: "text.primary",
          fontWeight: 600,
        }}
      >
        {title}
      </Typography>
      {children}
    </Stack>
  );
};

export default DetailsCard;
