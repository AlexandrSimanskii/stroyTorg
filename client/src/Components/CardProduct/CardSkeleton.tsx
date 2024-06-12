import { Skeleton, Box, Stack } from "@mui/material";

const CardSkeleton = () => {
  return (
    <Stack spacing={1}>
      <Skeleton
        className="card"
        variant="rectangular"
        sx={{ width: "100%", height: "142px", borderRadius: "8px" }}
      />
      <Skeleton variant="text" sx={{ fontSize: "1rem", width: "70px" }} />
      <Skeleton variant="rounded" sx={{ width: "100%", height: "40px" }} />{" "}
      <Skeleton variant="text" sx={{ fontSize: "1rem", width: "100%" }} />
      <Box sx={{ display: "flex", columnGap: "40px" }}>
        <Skeleton variant="rounded" sx={{ width: "100%", height: "22px" }} />{" "}
        <Skeleton variant="text" sx={{ width: "70px", fontSize: "22px" }} />
      </Box>
    </Stack>
  );
};
export default CardSkeleton;
