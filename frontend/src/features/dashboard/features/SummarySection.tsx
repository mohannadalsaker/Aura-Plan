import { Box, Skeleton, Stack } from "@mui/material";
import { useGetSummaryData } from "../api/useGetSummaryData";
import SummaryCard from "../components/SummaryCard";

const SummarySection = () => {
  const { data, isLoading } = useGetSummaryData();

  return (
    <Stack direction={"row"} gap={2} flexWrap={"wrap"}>
      {isLoading ? (
        Array.from({ length: 4 }).map((ele) => (
          <Skeleton
            key={ele as number}
            sx={{
              height: "200px",
              width: {
                xs: "100%",
                sm: "calc(50% - 8px)",
                md: "calc((100% / 4 ) - 12px)",
              },
            }}
          />
        ))
      ) : (
        <>
          <Box
            sx={{
              width: {
                xs: "100%",
                sm: "calc(50% - 8px)",
                md: "calc((100% / 4 ) - 12px)",
              },
            }}
          >
            <SummaryCard title="Total Users" value={data?.data?.totalUsers!} />
          </Box>
          <Box
            sx={{
              width: {
                xs: "100%",
                sm: "calc(50% - 8px)",
                md: "calc((100% / 4 ) - 12px)",
              },
            }}
          >
            <SummaryCard
              title="Total Projects"
              value={data?.data?.totalProjects!}
            />
          </Box>

          <Box
            sx={{
              width: {
                xs: "100%",
                sm: "calc(50% - 8px)",
                md: "calc((100% / 4 ) - 12px)",
              },
            }}
          >
            <SummaryCard title="Total Tasks" value={data?.data?.totalTasks!} />
          </Box>
          <Box
            sx={{
              width: {
                xs: "100%",
                sm: "calc(50% - 8px)",
                md: "calc((100% / 4 ) - 12px)",
              },
            }}
          >
            <SummaryCard
              title="Average Rating"
              value={data?.data?.avgRating?._avg?.rating || 0}
            />
          </Box>
        </>
      )}
    </Stack>
  );
};

export default SummarySection;
