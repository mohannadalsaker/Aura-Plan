import { Stack, Typography } from "@mui/material";

interface SummaryCardProps {
  title: string;
  value: number;
}

const SummaryCard = ({ title, value }: SummaryCardProps) => {
  return (
    <Stack
      gap={2}
      p={3}
      sx={{
        borderRadius: "8px",
        backgroundColor: "info.light",
      }}
      alignItems={"center"}
    >
      <Typography sx={{ typography: "body2", fontWeight: 600 }}>
        {title}
      </Typography>
      <Typography sx={{ typography: "body2", fontWeight: 500 }}>
        {value}
      </Typography>
    </Stack>
  );
};

export default SummaryCard;
