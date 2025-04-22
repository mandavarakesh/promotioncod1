import React from "react";
import { Box, CircularProgress } from "@mui/material";

const PageLoader = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
      }}
    >
      <CircularProgress thickness={3} size={40} />
    </Box>
  );
};

export default PageLoader;
